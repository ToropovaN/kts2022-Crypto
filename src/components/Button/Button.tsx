import { memo } from "react";

import Loader from "components/Loader/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

/** Возможные раскраски кнопки */
export enum ButtonColor {
  /** Основная, акцентная кнопка */
  primary = "primary",
  /** Второстепенная кнопка */
  secondary = "secondary",
}

/** Пропсы, который принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   * По умолчанию - false
   */
  loading?: boolean;
  /** Цвет кнопки, по умолчанию -  ButtonColor.primary*/
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  loading = false,
  color = ButtonColor.primary,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={classNames(
        styles.button,
        loading || rest.disabled === true ? styles.disabled : "",
        styles[`color-${color}`],
        className
      )}
    >
      {loading && <Loader />}
      {children}
    </button>
  );
};

export default memo(Button);
