export type QueryParams = {
  vs_currency?: string;
  order?:
    | "market_cap_desc"
    | "market_cap_asc"
    | "name_desc"
    | "name_asc"
    | "market_cap_change_24h_desc"
    | "market_cap_change_24h_asc";
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  query?: string;
  days?: number;
  interval?: string;
};

export const createQueryString = (newQueryParams: QueryParams) => {
  let params: string[] = [];
  Object.entries(newQueryParams).map(([key, value]) =>
    params.push(`${key}=${value}`)
  );
  return "?" + params.join("&");
};
