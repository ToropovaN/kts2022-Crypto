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

export const Input = ({ value, onChange, className, ...rest }: InputProps) => {
  return (
    <div className={styles.input}>
      <svg
        className={styles.searchIcon}
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.84199 12.1504C8.36004 12.1502 9.83434 11.6989 11.0301 10.8686L14.7898 14.2069L15.9991 13.1331L12.2395 9.79477C13.1751 8.73287 13.6836 7.42349 13.684 6.07522C13.684 2.72549 10.6145 0 6.84199 0C3.06949 0 0 2.72549 0 6.07522C0 9.42494 3.06949 12.1504 6.84199 12.1504ZM6.84199 1.5188C9.67201 1.5188 11.9735 3.56236 11.9735 6.07522C11.9735 8.58808 9.67201 10.6316 6.84199 10.6316C4.01197 10.6316 1.7105 8.58808 1.7105 6.07522C1.7105 3.56236 4.01197 1.5188 6.84199 1.5188Z"
          fill="#DFE2E4"
        />
      </svg>

      <input
        className={classNames(
          styles.field,
          styles.className,
          rest.disabled ? styles.disabled : ""
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
