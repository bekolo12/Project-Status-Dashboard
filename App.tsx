import React, { useMemo } from 'react';
import { Layers, CheckCircle, AlertTriangle, Clock, CircleEllipsis } from 'lucide-react';
import { DASHBOARD_DATA } from './constants';
import { CalculatedTotals, ChartDataPoint } from './types';
import SummaryCard from './components/SummaryCard';
import StackedBarChart from './components/StackedBarChart';
import StatusDonutChart from './components/StatusDonutChart';
import DataTable from './components/DataTable';

const App: React.FC = () => {
  
  // Process Data for Totals and Charts
  const { totals, chartData, donutData } = useMemo(() => {
    // 1. Calculate Totals
    const currentTotals: CalculatedTotals = {
      atRisk: 0,
      delayed: 0,
      delivered: 0,
      pending: 0,
      total: 0
    };

    DASHBOARD_DATA.series.forEach(series => {
      const sum = series.data.reduce((a, b) => a + b, 0);
      if (series.name === "At Risk") currentTotals.atRisk = sum;
      if (series.name === "Delayed") currentTotals.delayed = sum;
      if (series.name === "Delivered") currentTotals.delivered = sum;
      if (series.name === "Pending") currentTotals.pending = sum;
    });

    currentTotals.total = currentTotals.atRisk + currentTotals.delayed + currentTotals.delivered + currentTotals.pending;

    // 2. Prepare Data for Stacked Bar Chart (Transform Array of Arrays to Array of Objects)
    const processedChartData: ChartDataPoint[] = DASHBOARD_DATA.categories.map((category, index) => {
      const point: ChartDataPoint = { name: category };
      DASHBOARD_DATA.series.forEach(s => {
        point[s.name] = s.data[index];
      });
      return point;
    });

    // 3. Prepare Data for Donut Chart
    const processedDonutData = DASHBOARD_DATA.series.map(s => ({
        name: s.name,
        value: s.data.reduce((a, b) => a + b, 0),
        color: s.color
    })).filter(item => item.value > 0);

    return { 
      totals: currentTotals, 
      chartData: processedChartData,
      donutData: processedDonutData 
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
            <p className="text-gray-500 mt-2 text-lg">Real-time overview of project distribution across all categories.</p>
          </div>
          <div className="text-sm text-gray-400 bg-white px-4 py-2 rounded-full shadow-sm">
            Last updated: {new Date().toLocaleDateString()}
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
          {/* Stacked Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Status Distribution by Category</h2>
            </div>
            <StackedBarChart data={chartData} series={DASHBOARD_DATA.series} />
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Overall Breakdown</h2>
            </div>
            <StatusDonutChart data={donutData} total={totals.total} />
          </div>
        </div>

        {/* Data Table */}
        <DataTable data={DASHBOARD_DATA} />

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-8">
            <p>&copy; {new Date().getFullYear()} Project Management Systems. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;