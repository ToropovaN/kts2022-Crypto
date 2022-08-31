import React, { useEffect, useState } from "react";

import Card from "@components/Card/Card";
import CardContent from "@components/CardContent/CardContent";
import { Categories, Coin, Currencies, PageProps } from "@store/CoinsStore/types";
import { useNavigate } from "react-router-dom";

import styles from "./CoinsList.module.scss";
import InfoHeader from "./components/InfoHeader/InfoHeader";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import { CategoryScale } from "chart.js";

const CoinsList = ({ coinsStore }: PageProps) => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<Coin[]>([]);

  const [currency, setCurrency] = useState<Option>(Currencies[0]);
  const [query, setQuery] = useState<string>("");
  const [сategory, setCategory] = useState<string>(Categories[0]);

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  useEffect(() => {
    if (query === "") {
      coinsStore.getCoinsList({vs_currency: currency.value}).then((result) => {
        setCoins(result);
      });
    } else {
      coinsStore.getCoinsByQuery({query: query}).then((result) => {
        setCoins(result);
      });
    }
  }, [query, currency]);

  return (
    <>
      {isSearchActive && (
        <SearchHeader
          query={query}
          setQuery={setQuery}
          setIsSearchActive={setIsSearchActive}
        />
      )}

      {!isSearchActive && (
        <InfoHeader
          currency={currency}
          setCurrency={setCurrency}
          category={сategory}
          setCategory={setCategory}
          setIsSearchActive={setIsSearchActive}
        />
      )}

      <div>
        {coins.length > 0 &&
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
