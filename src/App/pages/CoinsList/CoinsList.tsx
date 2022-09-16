import { useState } from "react";

import Button from "components/Button/Button";
import Card from "components/Card/Card";
import CardContent from "components/CardContent/CardContent";
import { LoaderSize } from "components/Loader/Loader";
import WithLoader from "components/WithLoader/WithLoader";
import Meta from "config/MetaConfig";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import CoinModel from "store/models/Coin/Coin";
import useQuery from "utils/hooks/useQuery";
import navigateToNewParameters from "utils/navigate";
import {
  QueryParameter,
  setQueryParameter,
  setStoreFromQuery,
} from "utils/query";

import PageProps from "../types/types";
import styles from "./CoinsList.module.scss";
import InfoHeader from "./components/InfoHeader/InfoHeader";
import SearchHeader from "./components/SearchHeader/SearchHeader";

const CoinsList = ({ coinsStore }: PageProps) => {
  const navigate = useNavigate();

  const query = useQuery();
  setStoreFromQuery(coinsStore, query);

  const updateQuery = (newParameter: QueryParameter) => {
    navigateToNewParameters(navigate, setQueryParameter(newParameter, query));
  };

  const [isSearchActive, setIsSearchActive] = useState(
    query["active_search"] || "false"
  );

  if (coinsStore.marketCap === null) {
    coinsStore.getMarketCap();
  }

  return (
    <>
      <div className={styles.CoinsList__header}>
        {isSearchActive === "true" ? (
          <SearchHeader
            query={coinsStore.query}
            setQuery={(query) =>
              updateQuery({ key: "query", value: String(query) })
            }
            setIsSearchActive={(isSearchActive) => {
              updateQuery({
                key: "active_search",
                value: String(isSearchActive),
              });
              setIsSearchActive(String(isSearchActive));
            }}
          />
        ) : (
          <InfoHeader
            marketCap={coinsStore.marketCap}
            currency={coinsStore.currency}
            setCurrency={(currency) =>
              updateQuery({ key: "currency", value: currency.value })
            }
            category={coinsStore.category}
            setCategory={(category) => {
              updateQuery({ key: "category", value: category });
              updateQuery({ key: "page", value: "1" });
            }}
            setIsSearchActive={(isSearchActive) => {
              updateQuery({
                key: "active_search",
                value: String(isSearchActive),
              });
              setIsSearchActive(String(isSearchActive));
            }}
          />
        )}
      </div>
      <div>
        {coinsStore.list.map((coin: CoinModel) => (
          <div key={coin.id}>
            <Card
              image={coin.img}
              title={coin.name}
              subtitle={coin.symbol}
              onClick={() => navigate(`/coin/${coin.id}`)}
              content={
                isSearchActive === "false" && (
                  <CardContent
                    price={coin.currentPrice}
                    priceChange={coin.priceChange}
                    currency={coinsStore.currency}
                  />
                )
              }
            />
          </div>
        ))}
      </div>
      {isSearchActive === "false" && (
        <WithLoader
          loaderProps={{
            loading: coinsStore.meta === Meta.loading,
            size: LoaderSize.s,
          }}
        >
          <div className={styles.CoinsList__row}>
            <Button
              onClick={() => {
                updateQuery({
                  key: "page",
                  value: String(coinsStore.page + 1),
                });
              }}
            >
              Show more
            </Button>
          </div>
        </WithLoader>
      )}
    </>
  );
};

export default observer(CoinsList);
