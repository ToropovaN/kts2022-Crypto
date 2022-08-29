export type ApiResp = {};

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  img: string;
  currentPrice: number;
  priceChange: number;
};

export type ChartData = {
  chart: Array<{ x: number; y: number }>;
  firstPrice: number;
  lastPrice: number;
};

export const Currencies = new Map([
  ["inr", "₹"],
  ["rub", "₽"],
  ["usd", "$"],
  ["eur", "€"],
  ["try", "₺"],
]);
