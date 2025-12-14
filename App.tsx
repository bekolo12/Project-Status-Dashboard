import React, { useMemo, useState } from 'react';
import { Layers, CheckCircle, AlertTriangle, Clock, CircleEllipsis, Terminal } from 'lucide-react';
import { DASHBOARD_DATA, COLOR_MAP } from './constants';
import { CalculatedTotals, ChartDataPoint } from './types';
import SummaryCard from './components/SummaryCard';
import StackedBarChart from './components/StackedBarChart';
import StatusDonutChart from './components/StatusDonutChart';
import DurationParetoChart from './components/DurationParetoChart';
import DataTable from './components/DataTable';
import ExtractionCodeModal from './components/ExtractionCodeModal';

const EXTRACTION_PROMPT = `I have a CSV file containing project delivery data. Please parse this CSV and output a single JSON object that strictly follows the structure below so I can update a React dashboard.

**Mapping Rules:**

1. **Metadata**: 
   - Set "title" to "FDT Status Distribution"
   - Set "chartType" to "bar"

2. **Categories**: Extract the "Ring" column values into a simple string array (preserve the order from the CSV).

3. **Series**: Create exactly 3 series objects based on these numeric columns:
   - Name: "Plan FDT" -> Map data from the "Plan FDT" column. (Color: #3B82F6)
   - Name: "Pending FDT" -> Map data from the "Pending FDT" column. (Color: #F59E0B)
   - Name: "No. of FDTs Delivered" -> Map data from the "No. of FDTs Delivered" column. (Color: #16A34A)

4. **Table Data**: Create an array of objects where each object represents a row in the CSV, mapped to these exact camelCase keys:
   - \`ring\` (from "Ring")
   - \`planFdt\` (from "Plan FDT", number)
   - \`pendingFdt\` (from "Pending FDT", number)
   - \`deliveredFdt\` (from "No. of FDTs Delivered", number)
   - \`plannedDelivery\` (from "Planned Delivery")
   - \`actualStart\` (from "Actual Start Date")
   - \`actualFinish\` (from "Actual Finish Date")
   - \`duration\` (from "Actual Duration (Days)", keep as string or number)
   - \`gap\` (from "Delivery Gap", keep as string or number)
   - \`status\` (from "Status")

**Required JSON Output Format:**

{
  "title": "FDT Status Distribution",
  "chartType": "bar",
  "categories": ["Ring 1", "Ring 2", ...],
  "series": [
    { "name": "Plan FDT", "color": "#3B82F6", "data": [15, 10, ...] },
    { "name": "Pending FDT", "color": "#F59E0B", "data": [0, 5, ...] },
    { "name": "No. of FDTs Delivered", "color": "#16A34A", "data": [15, 0, ...] }
  ],
  "tableData": [
    {
      "ring": "Ring 1",
      "planFdt": 15,
      "pendingFdt": 0,
      "deliveredFdt": 15,
      "plannedDelivery": "20-Oct-25",
      "actualStart": "5-Aug-25",
      "actualFinish": "24-Oct-25",
      "duration": 80,
      "gap": 4,
      "status": "Delivered"
    },
    ...
  ]
}`;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Process Data for Totals and Charts
  const { totals, chartData, donutData, paretoData } = useMemo(() => {
    // 1. Calculate Totals
    const currentTotals: CalculatedTotals = {
      atRisk: 0,
      delayed: 0,
      delivered: 0,
      pending: 0,
      total: 0
    };

    DASHBOARD_DATA.tableData.forEach(row => {
      if (row.status === "At Risk") currentTotals.atRisk++;
      if (row.status === "Delayed") currentTotals.delayed++;
      if (row.status === "Delivered") currentTotals.delivered++;
      if (row.status === "Pending") currentTotals.pending++;
    });

    currentTotals.total = DASHBOARD_DATA.tableData.length;

    // 2. Prepare Stacked Bar Chart Data
    const processedChartData: ChartDataPoint[] = DASHBOARD_DATA.categories.map((category, index) => {
      const point: ChartDataPoint = { name: category };
      DASHBOARD_DATA.series.forEach(s => {
        point[s.name] = s.data[index];
      });
      return point;
    });

    // 3. Prepare Donut Chart Data
    const processedDonutData = [
      { name: "Delivered", value: currentTotals.delivered, color: "#16A34A" },
      { name: "At Risk", value: currentTotals.atRisk, color: "#DC2626" },
      { name: "Delayed", value: currentTotals.delayed, color: "#EA580C" },
      { name: "Pending", value: currentTotals.pending, color: "#4B5563" }
    ].filter(item => item.value > 0);

    // 4. Prepare Pareto Chart Data (Duration)
    // Map all rows, treating string durations (e.g. "Not Finish") as 0
    const validDurations = DASHBOARD_DATA.tableData
      .map(row => ({ 
        name: row.ring, 
        duration: typeof row.duration === 'number' ? row.duration : 0 
      }));
    
    // Sort descending by duration
    validDurations.sort((a, b) => b.duration - a.duration);

    // Calculate Cumulative
    const totalDuration = validDurations.reduce((sum, item) => sum + item.duration, 0);
    let runningTotal = 0;
    const processedParetoData = validDurations.map(item => {
      runningTotal += item.duration;
      return {
        name: item.name,
        duration: item.duration,
        cumulativePercent: totalDuration > 0 ? Math.round((runningTotal / totalDuration) * 100) : 0
      };
    });

    return { 
      totals: currentTotals, 
      chartData: processedChartData,
      donutData: processedDonutData,
      paretoData: processedParetoData
    };
  }, []);

  const calculatePercent = (val: number) => {
    return totals.total > 0 ? ((val / totals.total) * 100).toFixed(1) + '%' : '0%';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Project Status Dashboard</h1>
            <p className="text-gray-500 mt-2 text-lg">Real-time overview of project statuses and FDT delivery metrics.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
            >
              <Terminal size={18} />
              Extraction Code
            </button>
            <div className="text-sm text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Summary Cards Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard 
            title="Total Projects" 
            count={totals.total} 
            type="Total Projects" 
            Icon={Layers} 
          />
          <SummaryCard 
            title="Delivered" 
            count={totals.delivered} 
            percent={calculatePercent(totals.delivered)}
            type="Delivered" 
            Icon={CheckCircle} 
          />
          <SummaryCard 
            title="At Risk" 
            count={totals.atRisk} 
            percent={calculatePercent(totals.atRisk)}
            type="At Risk" 
            Icon={AlertTriangle} 
          />
          <SummaryCard 
            title="Delayed" 
            count={totals.delayed} 
            percent={calculatePercent(totals.delayed)}
            type="Delayed" 
            Icon={Clock} 
          />
        </div>

        {/* Summary Cards Row 2 (Pending) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <SummaryCard 
            title="Pending" 
            count={totals.pending} 
            percent={calculatePercent(totals.pending)}
            type="Pending" 
            Icon={CircleEllipsis} 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stacked Bar Chart - Shows FDT Counts */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">FDT Distribution by Category</h2>
            </div>
            <StackedBarChart data={chartData} series={DASHBOARD_DATA.series} />
          </div>

          {/* Donut Chart - Shows Project Status Count */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Project Status Breakdown</h2>
            </div>
            <StatusDonutChart data={donutData} total={totals.total} />
          </div>
        </div>

        {/* Pareto Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Total Project Completion Duration per Ring (Days)</h2>
          </div>
          {paretoData.length > 0 ? (
            <DurationParetoChart data={paretoData} />
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-400">
              No duration data available
            </div>
          )}
        </div>

        {/* Data Table */}
        <DataTable data={DASHBOARD_DATA} />

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-8">
            <p>&copy; {new Date().getFullYear()} Project Management Systems. All rights reserved.</p>
        </footer>

        {/* Modal */}
        <ExtractionCodeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          code={EXTRACTION_PROMPT} 
        />

      </div>
    </div>
  );
};

export default App;