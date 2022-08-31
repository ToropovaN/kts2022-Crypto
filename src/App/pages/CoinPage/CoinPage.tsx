import { useEffect, useState } from "react";

import BackIcon from "@components/svg/BackIcon";
import StarIcon from "@components/svg/StarIcon";
import WithLoader from "@components/WithLoader/WithLoader";
import { Coin, PageProps } from "@store/CoinsStore/types";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";
import Chart from "./components/Chart/Chart";

const CoinPage = ({ coinsStore }: PageProps) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [coin, setCoin] = useState<Coin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      coinsStore.getCoinDetails(id).then((result) => {
        setCoin(result);
        setIsLoading(false);
      });
    }
  }, [id, coinsStore]);

  return (
    <div className={styles.coinPage}>
      <WithLoader loading={isLoading}>
        <div className={styles.header}>
          <button className={styles.buttonBack} onClick={() => navigate(`/`)}>
            <BackIcon />
          </button>
          <img
            src={coin?.img}
            alt={coin?.name}
            className={styles.header__smallImg}
          />
          <div className={styles.header__title}>{coin?.name}</div>
          <div className={styles.header__subtitle}>
            {` (${coin?.symbol.toLocaleUpperCase()}) `}
          </div>
          <StarIcon />
        </div>

        {coin && <Chart coin={coin}></Chart>}
      </WithLoader>
    </div>
  );
};

export default CoinPage;
