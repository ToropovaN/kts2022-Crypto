import { Option } from "@components/MultiDropdown/MultiDropdown";

import CoinsStore from "./CoinsStore";

export type PageProps = {
  coinsStore: CoinsStore;
};

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

export const Currencies: Option[] = [
  { value: "usd", key: "$" },
  { value: "inr", key: "₹" },
  { value: "rub", key: "₽" },
  { value: "eur", key: "€" },
  { value: "try", key: "₺" },
];

export const Categories = ["All", "Gainer", "Loser", "Favourites"];

export type QueryParams = {
  vs_currency?: string,
  order?: "market_cap_desc" | "market_cap_asc" | "name_desc" | "name_asc" | "market_cap_change_24h_desc" | "market_cap_change_24h_asc",
  per_page?: number,
  page?: number,
  sparkline?: boolean,
  query?: string,
  days?: number,
  interval?: string
}

export const createQueryString = (newQueryParams : Record<string, any>) => {
  let params: string[] = [];
  for (const key in newQueryParams) {
    params.push(`${key}=${newQueryParams[key]}`);
  }
  return "?" + params.join("&");
}

