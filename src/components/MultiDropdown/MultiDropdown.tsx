import React, { memo } from "react";

import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";
/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}: MultiDropdownProps) => {
  let [isOpened, setIsOpened] = React.useState(false);

  return (
    <div className={styles.MultiDropdown}>
      <input
        type="checkbox"
        disabled={disabled}
        id="MultiDropdown"
        className={styles.MultiDropdown__checkbox}
        onChange={() => {
          if (!disabled) setIsOpened(!isOpened);
        }}
      ></input>

      <label htmlFor="MultiDropdown" className={styles.MultiDropdown__button}>
        {pluralizeOptions(value)}
        <div className={styles.MultiDropdown__corner}></div>
      </label>

      {isOpened && !disabled && (
        <div className={styles.MultiDropdown__list}>
          {options.map((option, index) => {
            let isChecked =
              value.find((o) => o.key === option.key) !== undefined;

            return (
              <div
                className={styles.MultiDropdown__optionBlock}
                key={option.key}
                style={{ top: (index * 27) + "px" }}
              >
                <input
                  type="checkbox"
                  className={classNames(styles.MultiDropdown__checkbox)}
                  id={option.key + "input"}
                  checked={isChecked}
                  onChange={() => {
                    onChange([option]);
                    value = [option];
                  }}
                />
                <label
                  htmlFor={option.key + "input"}
                  className={classNames(
                    styles.MultiDropdown__option,
                    isChecked ? styles["MultiDropdown__option-chacked"] : ""
                  )}
                >
                  Market- {option.value}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(MultiDropdown);
