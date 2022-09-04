import { memo } from "react";

import SearchIcon from "@components/svg/SearchIcon";
import classNames from "classnames";

import styles from "./Input.module.scss";

/** Пропсы, которые принимает компонент Input */
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

const Input = ({ value, onChange, className, ...rest }: InputProps) => {
  return (
    <div className={styles.input}>
      <div className={styles.input__searchIcon}>
        <SearchIcon isBig={false} />
      </div>

      <input
        className={classNames(
          styles.input__field,
          styles.className,
          rest.disabled && styles["input-disabled"]
        )}
        type="text"
        {...rest}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Search Cryptocurrency"
      ></input>
    </div>
  );
};

export default memo(Input);
