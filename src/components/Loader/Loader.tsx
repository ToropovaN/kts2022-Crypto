import classNames from "classnames";

import styles from "./Loader.module.scss";

/** Возможные значения размера лоадера */
enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
type LoaderProps = {
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

export const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps) => {
  let sizeClass = "size-" + size;
  if (loading)
    return (
      <div className={classNames(styles.loader, styles[sizeClass], className)}>
        <div className={classNames(styles.ellipse, styles[sizeClass])} />
        <div className={classNames(styles.polygon, styles[sizeClass])} />
      </div>
    );
  else return null;
};
