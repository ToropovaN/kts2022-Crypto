import CoinsStore from "@store/CoinsStore/CoinsStore";
import { Currencies } from "@store/CoinsStore/types";
import { NavigateFunction, useLocation } from "react-router-dom";

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
  if (
    query["active_search"] &&
    query["active_search"] !== String(store.isSearchActive)
  ) {
    query["active_search"] === "true"
      ? store.setIsSearchActive(true)
      : store.setIsSearchActive(false);
  }
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

export const navigateToNewParameters = (
  navigate: NavigateFunction,
  params: Record<string, string>
) => {
  navigate({
    pathname: "",
    search: parametersToQueryString(params),
  });
};

export const useQuery = (): Record<string, string> => {
  const query = useLocation().search;
  if (query !== "") {
    const pairs = query.slice(1).split("&");
    const result: Record<string, string> = {};
    pairs.forEach((pair) => {
      const values = pair.split("=");
      result[values[0]] = values[1];
    });
    return result;
  } else return {};
};
