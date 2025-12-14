import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusDonutChartProps {
  data: { name: string; value: number; color: string }[];
  total: number;
}

const StatusDonutChart: React.FC<StatusDonutChartProps> = ({ data, total }) => {
  return (
    <div className="w-full h-96 flex items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
             formatter={(value: number) => [`${value} projects`, 'Count']}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text for Total */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-6 text-center pointer-events-none">
        <p className="text-gray-500 text-sm font-medium">Total</p>
        <p className="text-3xl font-bold text-gray-800">{total}</p>
      </div>
    </div>
  );
};

export default StatusDonutChart;