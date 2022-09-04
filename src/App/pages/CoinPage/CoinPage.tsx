import { useEffect } from "react";

import BackIcon from "@components/svg/BackIcon";
import StarIcon from "@components/svg/StarIcon";
import WithLoader from "@components/WithLoader/WithLoader";
import { PageProps } from "@store/CoinsStore/types";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Chart from "./components/Chart/Chart";

const CoinPage = ({ coinsStore }: PageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      coinsStore.getCoinDetails(id);
    }
  }, [id, coinsStore]);

  return (
    <div className={styles.coinPage}>
      <WithLoader loading={coinsStore.meta === Meta.loading}>
        <div className={styles.header}>
          <button className={styles.buttonBack} onClick={() => navigate(`/`)}>
            <BackIcon />
          </button>
          <img
            src={coinsStore.coin?.img}
            alt={coinsStore.coin?.name}
            className={styles.header__smallImg}
          />
          <div className={styles.header__title}>{coinsStore.coin?.name}</div>
          <div className={styles.header__subtitle}>
            {` (${coinsStore.coin?.symbol.toLocaleUpperCase()}) `}
          </div>
          <StarIcon />
        </div>

        {coinsStore.coin && (
          <Chart coin={coinsStore.coin} coinsStore={coinsStore}></Chart>
        )}
      </WithLoader>
    </div>
  );
};

export default observer(CoinPage);
