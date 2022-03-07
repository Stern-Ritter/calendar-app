import React, { FormEvent } from "react";
import TagsInput from "../tags-input/tags-input";
import styles from "./task-form.module.css";

function TaskForm() {
  const [tags, setTags] = React.useState([] as string[]);
  const onFormChange = (evt: FormEvent) => {
    evt.preventDefault();
  };
  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <label className={styles.label} htmlFor="name">
        Название:
      </label>
      <input
        className={styles.input}
        type="text"
        onChange={onFormChange}
        value={""}
        name="name"
        id="name"
      />
      <label className={styles.label} htmlFor="date">
        Дата:
      </label>
      <input
        className={styles.input}
        type="datetime-local"
        onChange={onFormChange}
        value={""}
        name="date"
        id="date"
      />
      <label className={styles.label} htmlFor="category">
        Категория:
      </label>
      <input
        className={styles.input}
        type="text"
        onChange={onFormChange}
        value={""}
        name="category"
        id="category"
      />

      <label className={styles.label} htmlFor="tags">
        Название:
      </label>
      <TagsInput name="tags" tags={tags} setTags={setTags} />

      <label className={styles.label} htmlFor="description">
        Описание:
      </label>
      <textarea
        className={styles.description}
        onChange={onFormChange}
        value={""}
        name="description"
        id="description"
      />
      <button className={styles.button} type="submit">
        Создать
      </button>
    </form>
  );
}

export default TaskForm;
