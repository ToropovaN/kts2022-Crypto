import { useEffect, useState } from "react";

import { Button, ButtonColor } from "@components/Button/Button";
import { Card } from "@components/Card/Card";
import { WithLoader } from "@components/WithLoader/WithLoader";
import CoinsStore from "@store/CoinsStore/CoinsStore";
import { ChartData, Coin } from "@store/CoinsStore/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import classNames from "classnames";
import moment from "moment";
import { Line } from "react-chartjs-2";

import styles from "./Chart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type ChartProps = {
  coin: Coin;
};

export const Chart = ({ coin }: ChartProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const [days, setDays] = useState<number>(7);
  const daysValues = [7, 14, 30, 60, 365];

  useEffect(() => {
    const coinStore = new CoinsStore();
    coinStore.getChart(coin.id, days).then((result) => {
      setChartData(result);
    });
  }, [days, coin.id]);

  const options = {
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

  const data = {
    labels: chartData?.chart
      ? chartData.chart.map((value: { x: number; y: number }) =>
          moment(value.x).format("MMMDD")
        )
      : [],
    datasets: [
      {
        label: coin.symbol,
        fill: false,
        data: chartData
          ? chartData.chart.map((value: { x: number; y: number }) => value.y)
          : [],
        borderColor: "#0063F5",
      },
    ],
  };

  const priceChange = chartData
    ? chartData.lastPrice - chartData.firstPrice
    : 0;
  const priceChangePercent =
    chartData && chartData.firstPrice > 0
      ? priceChange / chartData.firstPrice
      : 0;
  const isRized = priceChange > 0;

  return (
    <WithLoader loading={chartData === null}>
      <div className={styles.priceBlock}>
        <span className={styles.mainPrice}>$ {chartData?.lastPrice}</span>
        <span
          className={classNames(
            styles.priceChange,
            !isRized ? styles.red : styles.green
          )}
        >
          {isRized && "+"}
          {priceChange.toFixed(2)}
          {isRized ? " (+" : " ("}
          {priceChangePercent.toFixed(2)}
          {"%)"}
        </span>
      </div>

      <Line options={options} data={data} />

      <div className={styles.ButtonsBlock}>
        {daysValues.map((num) => {
          return (
            <Button
              key={num}
              color={num === days ? ButtonColor.secondary : ButtonColor.primary}
              onClick={() => {
                setDays(num);
              }}
            >
              {num} days
            </Button>
          );
        })}
      </div>

      <Card
        image={coin.img}
        title={coin.name}
        subtitle={coin.symbol}
        onClick={() => {}}
        content={<></>}
      />
    </WithLoader>
  );
};
