import { NavigateFunction } from "react-router-dom";

import { parametersToQueryString } from "./query";

const navigateToNewParameters = (
  navigate: NavigateFunction,
  params: Record<string, string>
) => {
  navigate({
    pathname: "",
    search: parametersToQueryString(params),
  });
};

export default navigateToNewParameters;
