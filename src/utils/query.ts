import Currencies from "@config/CurrenciesConfig";
import CoinsStore from "@store/CoinsStore/CoinsStore";

export type QueryParameter = { key: string; value: string };

export const setQueryParameter = (
  param: QueryParameter,
  params: Record<string, string>
) => {
  params[param.key] = param.value;
  return params;
};

export const setStoreFromQuery = (
  store: CoinsStore,
  query: Record<string, string>
) => {
  if (query["category"] && query["category"] !== store.category) {
    store.setCategory(query["category"]);
  }
  if (query["currency"] && query["currency"] !== store.currency.value) {
    store.setCurrency(
      Currencies.find((option) => option.value === query["currency"]) ||
        Currencies[0]
    );
  }
  if (
    (query["query"] || query["query"] === "") &&
    query["query"] !== store.query
  ) {
    store.setQuery(query["query"]);
  }
  if (query["page"] && query["page"] !== String(store.page)) {
    store.setPage(Number(query["page"]));
  }
};

export const parametersToQueryString = (params: Record<string, string>) => {
  let queryString: string[] = [];
  for (const key in params) {
    queryString.push(key + "=" + params[key]);
  }
  return "?" + queryString.join("&");
};
