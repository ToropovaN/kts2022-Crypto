import ApiStore from "../ApiStore/ApiStore";
import { ChartData, Coin } from "./types";

export default class CoinsStore {
  private readonly apiStore = new ApiStore("https://api.coingecko.com/api/v3");

  async getCoinsList(currency: string): Promise<Coin[]> {
    let result = this.apiStore.request({
      method: "get",
      endpoint:
        `/coins/markets?vs_currency=` +
        currency +
        `&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
    });

    return (await result).data.map((coin: any) => {
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

  async getCoinsByQuery(query: string): Promise<Coin[]> {
    let result = this.apiStore.request({
      method: "get",
      endpoint: "/search?query=" + query,
    });

    return (await result).data.coins.map((coin: any) => {
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
    let result = this.apiStore.request({
      method: "get",
      endpoint: "/coins/" + id,
    });

    let coin = (await result).data;

    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      img: coin.image.small,
      currentPrice: 0,
      priceChange: 0,
    };
  }

  async getChart(id: string, days: number): Promise<ChartData> {
    let result = this.apiStore.request({
      method: "get",
      endpoint:
        "/coins/" +
        id +
        "/market_chart?vs_currency=usd&days=" +
        days +
        "&interval=daily",
    });

    let chartData: Array<{ x: number; y: number }> = (
      await result
    ).data.prices.map((value: number[]) => {
      return { x: value[0], y: value[1].toFixed(2) };
    });

    let firstPrice = chartData[0].y;
    let lastPrice = chartData[chartData.length - 1].y;
    return {
      chart: chartData,
      firstPrice: firstPrice,
      lastPrice: lastPrice,
    };
  }
}
