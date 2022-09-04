import Button from "@components/Button/Button";
import Card from "@components/Card/Card";
import CardContent from "@components/CardContent/CardContent";
import { LoaderSize } from "@components/Loader/Loader";
import WithLoader from "@components/WithLoader/WithLoader";
import { PageProps } from "@store/CoinsStore/types";
import { Meta } from "@utils/meta";
import {
  navigateToNewParameters,
  QueryParameter,
  setQueryParameter,
  setStoreFromQuery,
  useQuery,
} from "@utils/useQuery";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      {coinsStore.isSearchActive ? (
        <SearchHeader
          query={coinsStore.query}
          setQuery={(query) =>
            updateQuery({ key: "query", value: String(query) })
          }
          setIsSearchActive={(isSearchActive) =>
            updateQuery({ key: "active_search", value: String(isSearchActive) })
          }
        />
      ) : (
        <InfoHeader
          currency={coinsStore.currency}
          setCurrency={(currency) =>
            updateQuery({ key: "currency", value: currency.value })
          }
          category={coinsStore.category}
          setCategory={(category) => {
            updateQuery({ key: "category", value: category });
          }}
          setIsSearchActive={(isSearchActive) =>
            updateQuery({ key: "active_search", value: String(isSearchActive) })
          }
        />
      )}

      <div>
        {coinsStore.list.length > 0 &&
          coinsStore.list.map((coin) => (
            <div key={coin.id}>
              <Card
                image={coin.img}
                title={coin.name}
                subtitle={coin.symbol}
                onClick={() => navigate(`/coin/${coin.id}`)}
                content={
                  !coinsStore.isSearchActive && (
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
      {!coinsStore.isSearchActive && (
        <WithLoader
          loading={coinsStore.meta === Meta.loading}
          size={LoaderSize.s}
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
