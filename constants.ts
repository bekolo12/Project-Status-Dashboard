import { RawDashboardData } from './types';

export const DASHBOARD_DATA: RawDashboardData = {
  title: "FDT Status Distribution",
  chartType: "bar",
  // Order: SMR(1-3), SHT(1-5), BIJI(1-2), TKT(1-3) based on CSV
  categories: [
      "SMR R1", "SMR R2", "SMR R3",
      "SHT R1", "SHT R2", "SHT R3", "SHT R4", "SHT R5",
      "BIJI R1", "BIJI R2",
      "TKT R1", "TKT R2", "TKT R3"
  ],
  series: [
      { 
          name: "Plan FDT", 
          color: "#3B82F6", // Blue
          data: [15, 16, 11, 15, 18, 13, 8, 5, 15, 18, 15, 18, 11] 
      },
      { 
          name: "Pending FDT", 
          color: "#F59E0B", // Amber
          data: [0, 0, 0, 2, 18, 13, 8, 5, 0, 9, 0, 3, 11] 
      },
      { 
          name: "No. of FDTs Delivered", 
          color: "#16A34A", // Green
          data: [15, 16, 0, 13, 0, 0, 0, 0, 15, 9, 15, 15, 0] 
      }
  ],
  tableData: [
      { ring: "SMR R1", planFdt: 15, pendingFdt: 0, deliveredFdt: 15, plannedDelivery: "20-Oct-25", actualStart: "5-Aug-25", actualFinish: "24-Oct-25", duration: 80, gap: 4, status: "Delivered" },
      { ring: "SMR R2", planFdt: 16, pendingFdt: 0, deliveredFdt: 16, plannedDelivery: "28-Nov-25", actualStart: "20-Aug-25", actualFinish: "2-Dec-25", duration: 104, gap: 4, status: "Delivered" },
      { ring: "SMR R3", planFdt: 11, pendingFdt: 0, deliveredFdt: 0, plannedDelivery: "16-Dec-25", actualStart: "19-Aug-25", actualFinish: "Not Finish", duration: "Not Finish", gap: "Not Finish", status: "Delayed" },
      { ring: "SHT R1", planFdt: 15, pendingFdt: 2, deliveredFdt: 13, plannedDelivery: "29-Oct-25", actualStart: "8-Jul-25", actualFinish: "5-Nov-25", duration: 120, gap: 7, status: "Delivered" },
      { ring: "SHT R2", planFdt: 18, pendingFdt: 18, deliveredFdt: 0, plannedDelivery: "30-Nov-25", actualStart: "7-Aug-25", actualFinish: "Not Finish", duration: "Not Finish", gap: "Not Finish", status: "Delayed" },
      { ring: "SHT R3", planFdt: 13, pendingFdt: 13, deliveredFdt: 0, plannedDelivery: "10-Dec-25", actualStart: "3-Nov-25", actualFinish: "Not Finish", duration: "Not Finish", gap: "Not Finish", status: "Delayed" },
      { ring: "SHT R4", planFdt: 8, pendingFdt: 8, deliveredFdt: 0, plannedDelivery: "29-Dec-25", actualStart: "Not Started", actualFinish: "Not Finish", duration: "Not Finish", gap: "Not Finish", status: "At Risk" },
      { ring: "SHT R5", planFdt: 5, pendingFdt: 5, deliveredFdt: 0, plannedDelivery: "30-Dec-25", actualStart: "Not Started", actualFinish: "Not Finish", duration: "Not Finish", gap: "Not Finish", status: "At Risk" },
      { ring: "BIJI R1", planFdt: 15, pendingFdt: 0, deliveredFdt: 15, plannedDelivery: "15-Sep-25", actualStart: "15-Apr-25", actualFinish: "22-Sep-25", duration: 160, gap: 7, status: "Delivered" },
      { ring: "BIJI R2", planFdt: 18, pendingFdt: 9, deliveredFdt: 9, plannedDelivery: "21-Sep-25", actualStart: "7-May-25", actualFinish: "30-Sep-25", duration: 146, gap: 9, status: "Delivered" },
      { ring: "TKT R1", planFdt: 15, pendingFdt: 0, deliveredFdt: 15, plannedDelivery: "9-Aug-25", actualStart: "2-Feb-25", actualFinish: "9-Aug-25", duration: 188, gap: 0, status: "Delivered" },
      { ring: "TKT R2", planFdt: 18, pendingFdt: 3, deliveredFdt: 15, plannedDelivery: "28-Aug-25", actualStart: "17-Feb-25", actualFinish: "28-Aug-25", duration: 192, gap: 0, status: "Delivered" },
      { ring: "TKT R3", planFdt: 11, pendingFdt: 11, deliveredFdt: 0, plannedDelivery: "6-Dec-25", actualStart: "8-Apr-25", actualFinish: "Not Finish", duration: "Not Finish", gap: "Not Finish", status: "Pending" }
  ]
};

export const COLOR_MAP: Record<string, { bg: string, text: string, border: string, iconBg: string }> = {
  "Total Projects": { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-500", iconBg: "bg-blue-100" },
  "Delivered": { bg: "bg-green-100", text: "text-green-600", border: "border-green-500", iconBg: "bg-green-100" },
  "At Risk": { bg: "bg-red-100", text: "text-red-600", border: "border-red-500", iconBg: "bg-red-100" },
  "Delayed": { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-500", iconBg: "bg-orange-100" },
  "Pending": { bg: "bg-gray-200", text: "text-gray-600", border: "border-gray-500", iconBg: "bg-gray-200" },
};