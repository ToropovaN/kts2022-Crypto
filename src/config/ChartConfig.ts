import { ChartData } from "@store/CoinsStore/types";
import moment from "moment";

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

export const chartConfigData = (
  chartData: ChartData | null,
  coinSymbol: string
) => {
  return {
    labels: chartData?.chart
      ? chartData.chart.map((value: { x: number; y: number }) =>
          moment(value.x).format("MMMDD")
        )
      : [],
    datasets: [
      {
        label: coinSymbol,
        fill: false,
        data: chartData
          ? chartData.chart.map((value: { x: number; y: number }) => value.y)
          : [],
        borderColor: "#0063F5",
      },
    ],
  };
};

export const ChartDaysValues = [7, 14, 30, 60, 365];
