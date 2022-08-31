import { useEffect, useState } from "react";

import { Button, ButtonColor } from "@components/Button/Button";
import Card from "@components/Card/Card";
import WithLoader from "@components/WithLoader/WithLoader";
import {
  chartOptions,
  chartConfigData,
  ChartDaysValues,
} from "@config/ChartConfig";
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

const Chart = ({ coin }: ChartProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const [days, setDays] = useState<number>(ChartDaysValues[0]);

  useEffect(() => {
    const coinStore = new CoinsStore();
    coinStore.getChart(coin.id, { days: days }).then((result) => {
      setChartData(result);
    });
  }, [days, coin.id]);

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
      <div className={styles.Chart__priceBlock}>
        <span className={styles.Chart__mainPrice}>
          $ {chartData?.lastPrice}
        </span>
        <span
          className={classNames(
            styles.Chart__priceChange,
            !isRized ? styles.Chart__red : styles.Chart__green
          )}
        >
          {isRized && "+"}
          {priceChange.toFixed(2)}
          {isRized ? " (+" : " ("}
          {priceChangePercent.toFixed(2)}
          {"%)"}
        </span>
      </div>

      <Line
        options={chartOptions}
        data={chartConfigData(chartData, coin.symbol)}
      />

      <div className={styles.Chart__ButtonsBlock}>
        {ChartDaysValues.map((num) => {
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

export default Chart;
