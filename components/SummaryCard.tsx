import React from 'react';
import { LucideIcon } from 'lucide-react';
import { COLOR_MAP } from '../constants';

interface SummaryCardProps {
  title: string;
  count: number;
  percent?: string;
  type: "Total Projects" | "Delivered" | "At Risk" | "Delayed" | "Pending";
  Icon: LucideIcon;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, percent, type, Icon }) => {
  const styles = COLOR_MAP[type];

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border-l-4 ${styles.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-3xl font-bold ${styles.text} mt-1`}>{count}</p>
          {percent && <p className="text-sm text-gray-400 mt-1">{percent}</p>}
        </div>
        <div className={`${styles.iconBg} p-3 rounded-full`}>
          <Icon className={`w-6 h-6 ${styles.text}`} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;