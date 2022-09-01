export type ChartDataApi = {
  prices: Array<[number, number]>;
};

export type ChartDataModel = {
  chart: Array<{ x: number; y: number }>;
  firstPrice: number;
  lastPrice: number;
};

export const getInitialChartModel = (): ChartDataModel => {
  return {
    chart: [],
    firstPrice: 0,
    lastPrice: 0,
  };
};

export const normalizeChartData = (from: ChartDataApi): ChartDataModel => {
  let chartData: Array<{ x: number; y: number }> = from.prices.map(
    (value: number[]) => {
      return { x: value[0], y: Number(value[1].toFixed(2)) };
    }
  );
  return {
    chart: chartData,
    firstPrice: chartData[0].y,
    lastPrice: chartData[chartData.length - 1].y,
  };
};
