import styles from "./Card.module.scss";

/** Пропсы, которые принимает компонент Card */
type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}: CardProps) => {
  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      className={styles.card}
    >
      <img src={image} alt={image} className={styles.image} />
      <div className={styles.titleBlock}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {content}
    </button>
  );
};
