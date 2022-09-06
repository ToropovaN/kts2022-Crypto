export type ChartDataApi = {
  prices: Array<[number, number]>;
};

type ChartDataModel = {
  chart: Array<{ x: number; y: number }>;
  firstPrice: number;
  lastPrice: number;
  priceChange: string;
  priceChangePercent: string;
  isRized: boolean;
};

export const getInitialChartModel = (): ChartDataModel => {
  return {
    chart: [],
    firstPrice: 0,
    lastPrice: 0,
    priceChange: "",
    priceChangePercent: "",
    isRized: false,
  };
};

export const normalizeChartData = (from: ChartDataApi): ChartDataModel => {
  let chartData: Array<{ x: number; y: number }> = from.prices.map(
    (value: number[]) => {
      return { x: value[0], y: Number(value[1].toFixed(2)) };
    }
  );

  const firstPrice = chartData[0].y;
  const lastPrice = chartData[chartData.length - 1].y;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? priceChange / firstPrice : 0;
  const isRized = priceChange > 0;

  return {
    chart: chartData,
    firstPrice: firstPrice,
    lastPrice: lastPrice,
    priceChange: (isRized ? "+" : "") + priceChange.toFixed(2) + " ",
    priceChangePercent:
      (isRized ? "(+" : "(") + priceChangePercent.toFixed(2) + "%)",
    isRized: isRized,
  };
};

export default ChartDataModel;