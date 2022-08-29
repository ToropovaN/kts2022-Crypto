import React, { useEffect, useState } from "react";

import { Card } from "@components/Card/Card";
import { CardContent } from "@components/CardContent/CardContent";
import CoinsStore from "@store/CoinsStore/CoinsStore";
import { Coin } from "@store/CoinsStore/types";
import { useNavigate } from "react-router-dom";

import styles from "./CoinsList.module.scss";
import { Input } from "./components/Input/Input";

const CoinsList = () => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<Coin[]>([]);

  //const [currency, setCurrency] = useState<string>("usd");
  const currency = "usd";

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const coinStore = new CoinsStore();
    if (query === "") {
      coinStore.getCoinsList(currency).then((result) => {
        setCoins(result);
      });
    } else {
      coinStore.getCoinsByQuery(query).then((result) => {
        setCoins(result);
      });
    }
  }, [query]);

  return (
    <>
      <div className={styles.Search}>
        <Input
          value={query}
          placeholder={"Search Cryptocurrency"}
          onChange={(newQuery) => {
            setQuery(newQuery);
          }}
        ></Input>

        <button
          className={styles.cancelButton}
          onClick={() => {
            setQuery("");
          }}
        >
          Cancel
        </button>
      </div>

      <div>
        {coins &&
          coins.map((coin) => (
            <div key={coin.id}>
              <Card
                image={coin.img}
                title={coin.name}
                subtitle={coin.symbol}
                onClick={() => navigate(`/coin/${coin.id}`)}
                content={
                  <CardContent
                    price={coin.currentPrice}
                    priceChange={coin.priceChange}
                    currency={currency}
                  />
                }
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default CoinsList;

/* eslint-disable no-debugger, no-console */
//console.log();
