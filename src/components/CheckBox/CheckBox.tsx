import classNames from "classnames";

import styles from "./CheckBox.module.scss";

/** Пропсы, которые принимает компонент CheckBox */
export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  disabled,
  ...rest
}) => {
  return (
    <div className={classNames(styles.checkbox)}>
      <input
        type="checkbox"
        id="checkbox1"
        className={classNames(styles.input)}
        {...rest}
        disabled={disabled}
        onChange={(e) => {
          if (!disabled) onChange(e.target.checked);
        }}
      ></input>
      <label htmlFor="checkbox1">
        <div className={classNames(styles.square)}></div>
        <div className={classNames(styles.sign)}>Чекбокс</div>
      </label>
    </div>
  );
};
