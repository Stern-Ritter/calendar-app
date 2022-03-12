import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../services/store/store";
import {
  setTaskFormValue,
  createTask,
  updateTask,
} from "../../services/actions";
import TagsInput from "../tags-input/tags-input";
import Task from "../../model/Task";
import styles from "./task-form.module.css";

function TaskForm() {
  const {
    id,
    name,
    eventDate,
    createdDate,
    category,
    tags,
    state,
    description,
  } = useSelector((store: State) => store.form);
  const dispatch = useDispatch();

  const onFormChange = (evt: FormEvent) => {
    const input = evt.target as HTMLInputElement;
    dispatch(setTaskFormValue({ field: input.name, value: input.value }));
  };

  const onTagsChange = (data: { field: string; value: string[] }) => {
    dispatch(setTaskFormValue(data));
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (id === "") {
      const task = new Task({
        name,
        createdDate,
        eventDate,
        category,
        tags,
        state,
        description,
      });
      dispatch(createTask(task));
    } else {
      const task = new Task({
        id,
        name,
        createdDate,
        eventDate,
        category,
        tags,
        state,
        description,
      });
      dispatch(updateTask(task));
    }
  };

  return (
    <>
      <h1 className={styles.title}>
        {id === "" ? "Создать задачу:" : "Изменить задачу: "}
      </h1>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <label className={styles.label} htmlFor="name">
          Название:
        </label>
        <input
          className={styles.input}
          type="text"
          onChange={onFormChange}
          value={name}
          name="name"
          id="name"
          required
        />
        <label className={styles.label} htmlFor="eventDate">
          Дата:
        </label>
        <input
          className={styles.input}
          type="datetime-local"
          onChange={onFormChange}
          value={eventDate}
          name="eventDate"
          id="eventDate"
          required
        />
        <label className={styles.label} htmlFor="category">
          Категория:
        </label>
        <input
          className={styles.input}
          type="text"
          onChange={onFormChange}
          value={category}
          name="category"
          id="category"
          required
        />

        <label className={styles.label} htmlFor="tags">
          Название:
        </label>
        <TagsInput name="tags" tags={tags} onTagsChange={onTagsChange} />

        <label className={styles.label} htmlFor="description">
          Описание:
        </label>
        <textarea
          className={styles.description}
          onChange={onFormChange}
          value={description}
          name="description"
          id="description"
          required
        />
        <button className={styles.button} type="submit">
          {id === "" ? "Создать" : "Сохранить изменение"}
        </button>
      </form>
    </>
  );
}

export default TaskForm;
