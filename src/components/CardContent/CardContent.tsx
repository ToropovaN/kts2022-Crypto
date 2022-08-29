import { Currencies } from "@store/CoinsStore/types";
import classNames from "classnames";

import styles from "./CardContent.module.scss";

type CardContentProps = {
  price: number;
  priceChange: number;
  currency: string;
};

export const CardContent = (props: CardContentProps) => {
  let rised: boolean = props.priceChange > 0;

  return (
    <div className={styles.priceBlock}>
      <div className={styles.price}>
        {Currencies.get(props.currency)} {props.price}
      </div>
      <div
        className={classNames(
          styles.priceChange,
          rised ? styles.green : styles.red
        )}
      >
        {rised && "+"}
        {props.priceChange}%{" "}
      </div>
    </div>
  );
};
