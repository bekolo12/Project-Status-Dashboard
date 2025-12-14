import { RawDashboardData } from './types';

export const DASHBOARD_DATA: RawDashboardData = {
  title: "Project Status Distribution",
  chartType: "stackedBar",
  categories: [
      "BIJI R1", "BIJI R2", "SHT R1", "SHT R2", "SHT R3", "SHT R4", "SHT R5",
      "SMR R1", "SMR R2", "SMR R3", "TKT R1", "TKT R2", "TKT R3"
  ],
  series: [
      { name: "At Risk", color: "#DC2626", data: [0, 0, 0, 0, 0, 8, 5, 0, 0, 0, 0, 0, 0] }, // SHT R4, SHT R5
      { name: "Delayed", color: "#EA580C", data: [0, 0, 0, 18, 13, 0, 0, 0, 0, 11, 0, 0, 0] }, // SHT R2, SHT R3, SMR R3
      { name: "Delivered", color: "#16A34A", data: [15, 18, 15, 0, 0, 0, 0, 15, 16, 0, 15, 18, 0] }, // BIJI R1, BIJI R2, SHT R1, SMR R1, SMR R2, TKT R1, TKT R2
      { name: "Pending", color: "#4B5563", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11] } // TKT R3
  ]
};

export const COLOR_MAP: Record<string, { bg: string, text: string, border: string, iconBg: string }> = {
  "Total Projects": { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-500", iconBg: "bg-blue-100" },
  "Delivered": { bg: "bg-green-100", text: "text-green-600", border: "border-green-500", iconBg: "bg-green-100" },
  "At Risk": { bg: "bg-red-100", text: "text-red-600", border: "border-red-500", iconBg: "bg-red-100" },
  "Delayed": { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-500", iconBg: "bg-orange-100" },
  "Pending": { bg: "bg-gray-200", text: "text-gray-600", border: "border-gray-500", iconBg: "bg-gray-200" },
};