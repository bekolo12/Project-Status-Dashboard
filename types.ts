export interface SeriesData {
  name: string;
  color: string;
  data: number[];
}

export interface RawDashboardData {
  title: string;
  chartType: string;
  categories: string[];
  series: SeriesData[];
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