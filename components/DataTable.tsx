import React from 'react';
import { RawDashboardData } from '../types';

interface DataTableProps {
  data: RawDashboardData;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Helper to get series data by name
  const getSeriesData = (name: string) => data.series.find(s => s.name === name)?.data || [];

  const atRiskData = getSeriesData("At Risk");
  const delayedData = getSeriesData("Delayed");
  const deliveredData = getSeriesData("Delivered");
  const pendingData = getSeriesData("Pending");

  // Calculate totals for footer
  const totalAtRisk = atRiskData.reduce((a, b) => a + b, 0);
  const totalDelayed = delayedData.reduce((a, b) => a + b, 0);
  const totalDelivered = deliveredData.reduce((a, b) => a + b, 0);
  const totalPending = pendingData.reduce((a, b) => a + b, 0);
  const grandTotal = totalAtRisk + totalDelayed + totalDelivered + totalPending;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Category Details</h2>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">At Risk</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Delayed</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivered</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.categories.map((category, index) => {
              const atRisk = atRiskData[index];
              const delayed = delayedData[index];
              const delivered = deliveredData[index];
              const pending = pendingData[index];
              const total = atRisk + delayed + delivered + pending;

              return (
                <tr key={category} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {atRisk > 0 ? (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">{atRisk}</span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {delayed > 0 ? (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">{delayed}</span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {delivered > 0 ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">{delivered}</span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {pending > 0 ? (
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-medium">{pending}</span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900">{total}</td>
                </tr>
              );
            })}
            
            {/* Footer Row */}
            <tr className="bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">TOTAL</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-red-600">{totalAtRisk}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-orange-600">{totalDelayed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-green-600">{totalDelivered}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-600">{totalPending}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900">{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;