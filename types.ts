export interface SeriesData {
  name: string;
  color: string;
  data: number[];
}

export interface ProjectRow {
  ring: string;
  planFdt: number;
  pendingFdt: number;
  deliveredFdt: number;
  plannedDelivery: string;
  actualStart: string;
  actualFinish: string;
  duration: string | number;
  gap: string | number;
  status: "Delivered" | "Delayed" | "At Risk" | "Pending";
}

export interface RawDashboardData {
  title: string;
  chartType: string;
  categories: string[];
  series: SeriesData[];
  tableData: ProjectRow[];
}

export interface CalculatedTotals {
  atRisk: number;
  delayed: number;
  delivered: number;
  pending: number;
  total: number;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}