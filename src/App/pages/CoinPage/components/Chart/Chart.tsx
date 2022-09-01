import { Button, ButtonColor } from "@components/Button/Button";
import Card from "@components/Card/Card";
import WithLoader from "@components/WithLoader/WithLoader";
import {
  chartOptions,
  chartConfigData,
  ChartDaysValues,
} from "@config/ChartConfig";
import CoinsStore from "@store/CoinsStore/CoinsStore";
import { CoinModel } from "@store/models/Coin/Coin";
import { Meta } from "@utils/meta";
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
import { observer } from "mobx-react-lite";
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
  coin: CoinModel;
  coinsStore: CoinsStore;
};

const Chart = ({ coin, coinsStore }: ChartProps) => {
  const priceChange = coinsStore.chart
    ? coinsStore.chart.lastPrice - coinsStore.chart.firstPrice
    : 0;
  const priceChangePercent =
    coinsStore.chart && coinsStore.chart.firstPrice > 0
      ? priceChange / coinsStore.chart.firstPrice
      : 0;
  const isRized = priceChange > 0;

  return (
    <>
      <WithLoader loading={coinsStore.meta !== Meta.success}>
        <div className={styles.Chart__priceBlock}>
          <span className={styles.Chart__mainPrice}>
            {` ${coinsStore.currency.key} ${coinsStore.chart?.lastPrice} `}
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
          data={chartConfigData(coinsStore.chart, coin.symbol)}
        />
      </WithLoader>

      <div className={styles.Chart__ButtonsBlock}>
        {ChartDaysValues.map((num) => {
          return (
            <Button
              key={num}
              color={
                num === coinsStore.days
                  ? ButtonColor.secondary
                  : ButtonColor.primary
              }
              onClick={() => {
                coinsStore.setDays(num);
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
    </>
  );
};

export default observer(Chart);
