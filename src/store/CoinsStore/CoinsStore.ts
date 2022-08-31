import ApiStore from "@store/ApiStore/ApiStore";

import { ChartData, Coin, createQueryString, QueryParams } from "./types";

export default class CoinsStore {
  private readonly apiStore = new ApiStore("https://api.coingecko.com/api/v3");

  async getCoinsList(newQueryParams: QueryParams): Promise<Coin[]> {
    let result = await this.apiStore.request({
      method: "get",
      endpoint:
        "/coins/markets" +
        createQueryString({
          vs_currency: newQueryParams.vs_currency || "usd",
          order: newQueryParams.order || "market_cap_desc",
          per_page: newQueryParams.per_page || 20,
          page: newQueryParams.page || 1,
          sparkline: newQueryParams.sparkline || false,
        }),
    });

    return result.data.map((coin: Record<string, string>) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        img: coin.image,
        currentPrice: coin.current_price,
        priceChange: coin.price_change_percentage_24h,
      };
    });
  }

  async getCoinsByQuery(newQueryParams: QueryParams): Promise<Coin[]> {
    let result = await this.apiStore.request({
      method: "get",
      endpoint: "/search" + createQueryString(newQueryParams),
    });

    return result.data.coins.map((coin: any) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        img: coin.thumb,
        currentPrice: null,
        priceChange: null,
      };
    });
  }

  async getCoinDetails(id: string): Promise<Coin> {
    let result = await this.apiStore.request({
      method: "get",
      endpoint: "/coins/" + id,
    });

    let coin = result.data;

    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      img: coin.image.small,
      currentPrice: 0,
      priceChange: 0,
    };
  }

  async getChart(id: string, newQueryParams: QueryParams): Promise<ChartData> {
    let result = await this.apiStore.request({
      method: "get",
      endpoint:
        "/coins/" +
        id +
        "/market_chart" +
        createQueryString({
          vs_currency: newQueryParams.vs_currency || "usd",
          days: newQueryParams.days || 7,
          interval: newQueryParams.interval || "daily",
        }),
    });

    let chartData: Array<{ x: number; y: number }> = result.data.prices.map(
      (value: number[]) => {
        return { x: value[0], y: value[1].toFixed(2) };
      }
    );

    let firstPrice = chartData[0].y;
    let lastPrice = chartData[chartData.length - 1].y;
    return {
      chart: chartData,
      firstPrice: firstPrice,
      lastPrice: lastPrice,
    };
  }
}
