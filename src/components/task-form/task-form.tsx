import React, { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { State } from "../../services/store/store";
import {
  getTaskById,
  setTaskFormValue,
  createTask,
  updateTask,
  TASK_FORM_CLEAR_STATE,
} from "../../services/actions";
import TagsInput from "../tags-input/tags-input";
import Task from "../../model/Task";
import styles from "./task-form.module.css";

function TaskForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ taskId?: string }>();

  useEffect(() => {
    dispatch({ type: TASK_FORM_CLEAR_STATE });
    if (params.taskId) {
      dispatch(getTaskById(params.taskId));
    }
  }, [dispatch, params]);

  const {
    hasError,
    data: {
      id,
      name,
      eventDate,
      createdDate,
      category,
      tags,
      state,
      description,
    },
  } = useSelector((store: State) => store.form);

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
      dispatch(createTask(task, history));
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
      dispatch(updateTask(task, history));
    }
  };

  const clearForm = () => {
    dispatch({ type: TASK_FORM_CLEAR_STATE });
  };

  return hasError ? (
    <p className={styles["edit-load-error"]}>Ошибка загрузки задачи...</p>
  ) : (
    <>
      <h1 className={styles.title}>
        {id === "" ? "Создать задачу:" : "Изменить задачу: "}
      </h1>
      <form className={styles.form} onSubmit={onFormSubmit} name="task-form">
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
          data-testid="date"
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
          Тэги:
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
        <div className={styles.buttons}>
          {id === "" && (
            <button className={styles.button} type="button" onClick={clearForm}>
              Очистить форму
            </button>
          )}
          <button className={styles.button} type="submit">
            {id === "" ? "Создать" : "Сохранить изменение"}
          </button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
