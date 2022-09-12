export type CoinDetailsApi = {
  id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
    thumb: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      inr: number;
      rub: number;
      eur: number;
      try: number;
    };
    price_change_24h: number;
  };
};

export type CoinListApi = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_24h: number;
};

export type CoinQueryApi = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
};

type CoinModel = {
  id: string;
  name: string;
  symbol: string;
  img: string;
  currentPrice: number;
  priceChange: number;
};

export const normalizeCoinDetails = (from: CoinDetailsApi): CoinModel => {
  return {
    id: from.id,
    name: from.name,
    symbol: from.symbol,
    img: from.image.small,
    currentPrice: from.market_data.current_price.usd,
    priceChange: from.market_data.price_change_24h
      ? Number(from.market_data.price_change_24h.toFixed(2))
      : 0,
  };
};

export const normalizeCoinList = (from: CoinListApi): CoinModel => {
  return {
    id: from.id,
    name: from.name,
    symbol: from.symbol,
    img: from.image,
    currentPrice: from.current_price,
    priceChange: from.price_change_24h
      ? Number(from.price_change_24h.toFixed(2))
      : 0,
  };
};

export const normalizeCoinQuery = (from: CoinQueryApi): CoinModel => {
  return {
    id: from.id,
    name: from.name,
    symbol: from.symbol,
    img: from.thumb,
    currentPrice: 0,
    priceChange: 0,
  };
};

export default CoinModel;