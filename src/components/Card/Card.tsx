import { memo } from "react";

import styles from "./Card.module.scss";

/** Пропсы, которые принимает компонент Card */
type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: string;
  /** Подзаголовок карточки */
  subtitle: string;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const Card = ({ image, title, subtitle, content, onClick }: CardProps) => {
  return (
    <div
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      className={styles.card}
    >
      <img src={image} alt={image} className={styles.card__image} />
      <div className={styles.card__titleBlock}>
        <div className={styles.card__title}>{title}</div>
        <div className={styles.card__subtitle}>{subtitle}</div>
      </div>
      {content}
    </div>
  );
};
export default memo(Card);
