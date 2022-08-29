import React from "react";

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
  const checkedOptions = value;

  return (
    <div className={styles.MultiDropdown}>
      <input
        type="checkbox"
        disabled={disabled}
        id="MultiDropdown"
        className={styles.MultiDropdownButtonCheckbox}
        onChange={() => {
          if (!disabled) setIsOpened(!isOpened);
        }}
      ></input>
      <label htmlFor="MultiDropdown" className={styles.MultiDropdownButton}>
        {pluralizeOptions(checkedOptions)}
        <div className={styles.MultiDropdownButtonCorner}></div>
      </label>

      {isOpened && !disabled && (
        <div>
          {options.map((option) => {
            let isChecked =
              checkedOptions.find((o) => o.key === option.key) !== undefined;

            return (
              <div
                className={classNames(
                  styles.option,
                  isChecked ? styles.optionChacked : ""
                )}
                key={option.key}
              >
                <input
                  type="checkbox"
                  className={classNames(styles.optionCheckbox)}
                  id={option.key + "input"}
                  checked={isChecked}
                  onChange={(e) => {
                    let currentOption = checkedOptions.find(
                      (op) => op.key === option.key
                    );

                    if (!isChecked) {
                      checkedOptions.push(option);
                    }
                    isChecked = !isChecked;
                    if (currentOption === undefined) onChange([option]);
                    else
                      onChange(
                        checkedOptions.filter((op) => op.key !== option.key)
                      );
                  }}
                ></input>
                <label
                  htmlFor={option.key + "input"}
                  className={styles.optionCheckboxLabel}
                >
                  {option.value}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
