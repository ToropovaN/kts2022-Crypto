import { memo } from "react";

import { Option } from "@components/MultiDropdown/MultiDropdown";
import classNames from "classnames";

import styles from "./CardContent.module.scss";

type CardContentProps = {
  price: number;
  priceChange: number;
  currency: Option;
};

const CardContent = (props: CardContentProps) => {
  const rised: boolean = props.priceChange > 0;

  return (
    <div className={styles.cardContent__priceBlock}>
      <div className={styles.cardContent__price}>
        {props.currency.key} {props.price}
      </div>
      <div
        className={classNames(
          styles.cardContent__priceChange,
          rised ? styles.cardContent__green : styles.cardContent__red
        )}
      >
        {rised && "+"}
        {props.priceChange}%{" "}
      </div>
    </div>
  );
};
export default memo(CardContent);
