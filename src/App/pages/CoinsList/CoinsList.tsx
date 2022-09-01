import Card from "@components/Card/Card";
import CardContent from "@components/CardContent/CardContent";
import { PageProps } from "@store/CoinsStore/types";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import InfoHeader from "./components/InfoHeader/InfoHeader";
import SearchHeader from "./components/SearchHeader/SearchHeader";

const CoinsList = ({ coinsStore }: PageProps) => {
  const navigate = useNavigate();

  return (
    <>
      {coinsStore.isSearchActive ? (
        <SearchHeader
          query={coinsStore.query}
          setQuery={coinsStore.setQuery}
          setIsSearchActive={coinsStore.setIsSearchActive}
        />
      ) : (
        <InfoHeader
          currency={coinsStore.currency}
          setCurrency={coinsStore.setCurrency}
          category={coinsStore.category}
          setCategory={coinsStore.setCategory}
          setIsSearchActive={coinsStore.setIsSearchActive}
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
                  <CardContent
                    price={coin.currentPrice}
                    priceChange={coin.priceChange}
                    currency={coinsStore.currency}
                  />
                }
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default observer(CoinsList);
