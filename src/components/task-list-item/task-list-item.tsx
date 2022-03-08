import React from "react";
import { useDispatch } from "react-redux";
import Task from "../../model/Task";
import { deleteTask, TASK_FORM_SET_STATE } from "../../services/actions";
import { dateTimeFormat } from "../../utils/formats";
import styles from "./task-list-tem.module.css";

function TaskListItem({ content }: { content: Task }) {
  const dispatch = useDispatch();
  const id = content.getId();
  const { name, createdDate, eventDate, category, tags, state, description } =
    content;
  const formatedCreatedDate = new Date(createdDate).toLocaleString(
    "Ru-ru",
    dateTimeFormat
  );
  const formatedEventDate = new Date(eventDate).toLocaleString(
    "Ru-ru",
    dateTimeFormat
  );

  const deleteHandler = () => {
    dispatch(deleteTask(id));
  };

  const editHandler = () => {
    dispatch({ type: TASK_FORM_SET_STATE, payload: content });
  };

  return (
    <li className={styles.item}>
      <div className={styles.container}>
        <div className={styles.main}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.category}>Категория: {category}</span>
        </div>
        <div>
          <div className={styles.buttons}>
            <button className={styles.edit} type="button" onClick={editHandler}>
              Изменить
            </button>
            <button
              className={styles.delete}
              type="button"
              onClick={deleteHandler}
            >
              Удалить
            </button>
          </div>
          <div className={styles.timeliness}>
            <span className={styles.date}>
              Дата создания: {formatedCreatedDate}
            </span>
            <span className={styles.date}>
              Выполнить до: {formatedEventDate}
            </span>
          </div>
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

export default TaskListItem;
