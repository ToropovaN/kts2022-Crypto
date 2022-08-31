import MultiDropdown, { Option } from "@components/MultiDropdown/MultiDropdown";
import SearchIcon from "@components/svg/SearchIcon";
import { Categories, Currencies } from "@store/CoinsStore/types";
import classNames from "classnames";

import styles from "./InfoHeader.module.scss";

type InfoHeaderProps = {
  currency: Option;
  setCurrency: (currency: Option) => void;
  setIsSearchActive: (isSearchActive: boolean) => void;
  category: string;
  setCategory: (category: string) => void;
};

const InfoHeader = ({
  currency,
  setCurrency,
  category,
  setCategory,
  setIsSearchActive,
}: InfoHeaderProps) => {
  const marketIs: number = 0;

  return (
    <div>
      <div className={classNames(styles.InfoHeader__row, styles.row100)}>
        <div>
          <div className={styles.InfoHeader__header20}>
            {`Market is `}
            <span
              className={
                marketIs > 0 ? styles.InfoHeader__green : styles.InfoHeader__red
              }
            >
              {" "}
              {marketIs > 0 ? " up" : " down"} {`(${marketIs}%)`}{" "}
            </span>
          </div>
          <div className={styles.InfoHeader__header12}>
            In the past 24 hours
          </div>
        </div>

        <div
          onClick={() => {
            setIsSearchActive(true);
          }}
        >
          <SearchIcon isBig={true} />
        </div>
      </div>

      <div className={classNames(styles.InfoHeader__row)}>
        <div className={styles.InfoHeader__header18}> Coins </div>

        <MultiDropdown
          options={Currencies}
          value={[currency]}
          onChange={(newOptions: Option[]) => {
            setCurrency(newOptions[0]);
          }}
          pluralizeOptions={() => {
            return `Market- ${currency.value}`;
          }}
        />
      </div>

      <div className={styles.InfoHeader__categoryRow}>
        {Categories.map((cat) => {
          return (
            <div
              key={cat}
              className={classNames(
                styles.InfoHeader__category,
                cat === category ? styles["InfoHeader__category-active"] : ""
              )}
              onClick={() => {
                setCategory(cat);
              }}
            >
              {cat}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default InfoHeader;
