import { useLocation } from "react-router-dom";

const useQuery = (): Record<string, string> => {
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

export default useQuery;
