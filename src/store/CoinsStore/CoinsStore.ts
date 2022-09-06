import { Option } from "@components/MultiDropdown/MultiDropdown";
import Categories from "@config/CategoriesConfig";
import { ChartDaysValues } from "@config/ChartConfig";
import Currencies from "@config/CurrenciesConfig";
import { Meta } from "@config/MetaConfig";
import ApiStore from "@store/ApiStore/ApiStore";
import { ApiResponse } from "@store/ApiStore/types";
import ChartDataModel, {
  ChartDataApi,
  getInitialChartModel,
  normalizeChartData,
} from "@store/models/Chart/Chart";
import {
  CoinDetailsApi,
  CoinListApi,
  CoinModel,
  CoinQueryApi,
  normalizeCoinDetails,
  normalizeCoinList,
  normalizeCoinQuery,
} from "@store/models/Coin/Coin";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/Collection";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { createQueryString, QueryParams } from "./types";

type PrivateFields =
  | "_meta"
  | "_list"
  | "_coin"
  | "_chart"
  | "_currency"
  | "_query"
  | "_category"
  | "_days"
  | "_page";

export default class CoinsStore {
  private readonly apiStore = new ApiStore("https://api.coingecko.com/api/v3");

  private _meta: Meta = Meta.initial;
  private _list: CollectionModel<string, CoinModel> =
    getInitialCollectionModel();
  private _coin: CoinModel | null = null;
  private _chart: ChartDataModel = getInitialChartModel();
  private _currency: Option = Currencies[0];
  private _query: string = "";
  private _category: string = Categories[0];
  private _days: number = ChartDaysValues[0];
  private _page: number = 1;

  constructor() {
    makeObservable<CoinsStore, PrivateFields>(this, {
      _list: observable.ref,
      _coin: observable,
      _meta: observable,
      _chart: observable.ref,
      _currency: observable,
      _query: observable,
      _category: observable,
      _days: observable,
      _page: observable,

      list: computed,
      coin: computed,
      meta: computed,
      chart: computed,
      query: computed,
      category: computed,
      currency: computed,
      days: computed,
      page: computed,

      getCoinDetails: action,
      getCoinsList: action,
      getCoinsByQuery: action,
      getChart: action,
      setCategory: action,
      setCurrency: action,
      setQuery: action,
      setDays: action,
      setPage: action,
    });

    if (this._list.order.length === 0) {
      this.getCoinsList({ vs_currency: this.currency.value });
    }
  }

  get list(): CoinModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get coin(): CoinModel | null {
    return this._coin;
  }

  get chart(): ChartDataModel {
    return this._chart;
  }

  get currency(): Option {
    return this._currency;
  }

  public setCurrency = (newCurrency: Option) => {
    this._currency = newCurrency;
    this.getCoinsList({ vs_currency: this.currency.value });
  };

  get days(): number {
    return this._days;
  }

  public setDays = (newDays: number) => {
    this._days = newDays;
    if (this._coin) {
      this.getChart(this._coin.id, {
        days: this._days,
        vs_currency: this.currency.value,
      });
    }
  };

  get page(): number {
    return this._page;
  }

  public setPage = (newPage: number) => {
    if (newPage !== this._page) {
      this._page = newPage;
      this.getCoinsList(
        { vs_currency: this.currency.value, page: this._page },
        true
      );
    }
  };

  get query(): string {
    return this._query;
  }
  public setQuery = (newQuery: string) => {
    this._query = newQuery;
    if (newQuery !== "") {
      this.getCoinsByQuery({ query: this._query });
    } else {
      this.getCoinsList({ vs_currency: this.currency.value });
    }
  };

  get category(): string {
    return this._category;
  }
  public setCategory = (newCategory: string) => {
    this._category = newCategory;
  };

  async getCoinsList(
    newQueryParams: QueryParams,
    showMore?: boolean
  ): Promise<void> {
    this._meta = Meta.loading;
    if (!showMore) this._list = getInitialCollectionModel();

    let result: ApiResponse<CoinListApi[], null> = await this.apiStore.request({
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

    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          const list = result.data.map(normalizeCoinList);

          const newCollection = normalizeCollection(
            list,
            (listItem) => listItem.id
          );
          if (showMore) {
            const newOrder = this._list.order.concat(newCollection.order);
            const newEntities = {
              ...this._list.entities,
              ...newCollection.entities,
            };
            this._list = { order: newOrder, entities: newEntities };
          } else this._list = newCollection;
        } catch (e) {
          this._meta = Meta.error;
        }
      } else {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async getCoinsByQuery(newQueryParams: QueryParams): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    let result: ApiResponse<{ coins: CoinQueryApi[] }, null> =
      await this.apiStore.request({
        method: "get",
        endpoint: "/search" + createQueryString(newQueryParams),
      });

    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          const list = result.data.coins.map(normalizeCoinQuery);
          this._list = normalizeCollection(list, (listItem) => listItem.id);
        } catch (e) {
          /* eslint-disable no-debugger, no-console */
          console.log(e);
          this._meta = Meta.error;
        }
      } else {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  async getCoinDetails(id: string) {
    this._meta = Meta.loading;
    this._coin = null;

    let result: ApiResponse<CoinDetailsApi, null> = await this.apiStore.request(
      {
        method: "get",
        endpoint: "/coins/" + id,
      }
    );

    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          this._coin = normalizeCoinDetails(result.data);

          this._days = ChartDaysValues[0];
          this.getChart(this._coin.id, {
            days: this._days,
            vs_currency: this.currency.value,
          });
        } catch (e) {
          this._meta = Meta.error;
          this._coin = null;
        }
      } else {
        this._meta = Meta.error;
        this._coin = null;
      }
    });
  }

  async getChart(id: string, newQueryParams: QueryParams): Promise<void> {
    this._meta = Meta.loading;
    this._chart = getInitialChartModel();

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

    runInAction(() => {
      if (result.success) {
        try {
          this._meta = Meta.success;
          this._chart = normalizeChartData(result.data as ChartDataApi);
        } catch (e) {
          this._meta = Meta.error;
          this._chart = getInitialChartModel();
        }
      } else {
        this._meta = Meta.error;
        this._chart = getInitialChartModel();
      }
    });
  }
}
