import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

interface ParetoDataPoint {
  name: string;
  duration: number;
  cumulativePercent: number;
}

interface DurationParetoChartProps {
  data: ParetoDataPoint[];
}

const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  
  if (value === 0) {
    return (
      <text x={x + width / 2} y={y - 5} fill="#374151" textAnchor="middle" dominantBaseline="auto" fontSize={12}>
        {value}
      </text>
    );
  }
  
  // Check if bar is tall enough for inside label (approx 20px)
  if (height < 20) {
      return (
      <text x={x + width / 2} y={y - 5} fill="#374151" textAnchor="middle" dominantBaseline="auto" fontSize={12}>
        {value}
      </text>
    );
  }

  return (
    <text x={x + width / 2} y={y + 15} fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight="600">
      {value}
    </text>
  );
};

const DurationParetoChart: React.FC<DurationParetoChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          barCategoryGap="2%"
        >
          <CartesianGrid stroke="#e5e5e5" vertical={false} />
          <XAxis 
            dataKey="name" 
            scale="band" 
            tick={{ fill: '#4B5563', fontSize: 11 }}
            axisLine={{ stroke: '#9CA3AF' }}
            tickLine={false}
            interval={0}
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Duration (Days)', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 12 }}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            domain={[0, 100]}
            unit="%"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <Tooltip 
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar 
            yAxisId="left" 
            dataKey="duration" 
            name="Actual Duration" 
            fill="#5B9BD5" // Matches Excel Blue
          >
            <LabelList dataKey="duration" content={<CustomBarLabel />} />
          </Bar>
          <Line 
            yAxisId="right" 
            type="linear" 
            dataKey="cumulativePercent" 
            name="Cumulative %" 
            stroke="#ED7D31" // Matches Excel Orange
            strokeWidth={3}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DurationParetoChart;