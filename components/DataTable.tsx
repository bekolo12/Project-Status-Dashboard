import React from 'react';
import { RawDashboardData } from '../types';

interface DataTableProps {
  data: RawDashboardData;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-orange-100 text-orange-800';
      case 'At Risk': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Category Details</h2>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ring</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan FDT</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending FDT</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivered</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Planned Delivery</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actual Start</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actual Finish</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Gap</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.ring}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-blue-600 font-medium">{row.planFdt}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-orange-600">{row.pendingFdt}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-green-600">{row.deliveredFdt}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.plannedDelivery}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.actualStart}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{row.actualFinish}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900">{row.duration}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900">{row.gap}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;