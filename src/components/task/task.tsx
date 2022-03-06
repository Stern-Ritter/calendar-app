import React from "react";
import styles from "./task.module.css";

function Task({ content }: TaskProps) {
  const {
    id,
    name,
    createdDate,
    eventDate,
    category,
    tags,
    state,
    description,
  } = content;

  return (
    <li className={styles.item}>
      <div className={styles.container}>
        <div className={styles.main}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.category}>Категория: {category}</span>
        </div>
        <div className={styles.timeliness}>
          <span className={styles.date}>
            Дата создания: {new Date(createdDate).toLocaleDateString("Ru-ru")}
          </span>
          <span className={styles.date}>
            Выполнить до: {new Date(eventDate).toLocaleDateString("Ru-ru")}
          </span>
        </div>
      </div>
      <div className={styles.info}>
        <ul className={styles.tags}>
          {tags.map((tag, idx) => (
            <li key={idx} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={styles["status-container"]}>
          <input type="checkbox"></input>
          <span className={styles.status}>{state}</span>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
    </li>
  );
}

export default Task;
