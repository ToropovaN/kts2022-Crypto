import { memo } from "react";

import Input from "components/Input/Input";

import styles from "./SearchHeader.module.scss";

type SearchHeaderProps = {
  query: string;
  setQuery: (newQuery: string) => void;
  setIsSearchActive: (isSearchActive: boolean) => void;
};

const SearchHeader = ({
  query,
  setQuery,
  setIsSearchActive,
}: SearchHeaderProps) => {
  return (
    <div className={styles.SearchHeader__Search}>
      <Input
        value={query}
        placeholder={"Search Cryptocurrency"}
        onChange={(newQuery: string) => {
          setQuery(newQuery);
        }}
      ></Input>

      <button
        className={styles.SearchHeader__cancelButton}
        onClick={() => {
          setQuery("");
          setIsSearchActive(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};
export default memo(SearchHeader);
