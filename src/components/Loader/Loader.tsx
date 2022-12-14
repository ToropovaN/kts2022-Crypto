import { memo } from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

/** Возможные значения размера лоадера */
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
export type LoaderProps = {
  /**
   * Идет ли загрузка.
   * По умолчанию - true, для удобства использования
   * Если false, то лоадер не должен отображаться
   */
  loading?: boolean;
  /**
   * Размер лоадера. При передаче данного пропса, должен добавляться css-класс loader_size-{size}
   * По умолчанию: размер - LoaderSize.m, css-класс - loader_size-m
   */
  size?: LoaderSize;
  /**
   * Дополнительные CSS-классы.
   */
  className?: string;
};

const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => {
  if (loading)
    return (
      <div className={classNames(styles.loader, styles[`loader-size-${size}`])}>
        <div
          className={classNames(
            styles.loader__ellipse,
            styles[`loader__ellipse-size-${size}`],
            className && styles[className]
          )}
        />
        <div
          className={classNames(
            styles.loader__polygon,
            styles[`loader__polygon-size-${size}`]
          )}
        />
      </div>
    );
  else return null;
};

export default memo(Loader);
