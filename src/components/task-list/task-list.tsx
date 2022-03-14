import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { State } from "../../services/store/store";
import { getTasks } from "../../services/actions";
import TaskListItem from "../task-list-item/task-list-item";
import {
  STATUS_TO_DO,
  STATUS_DONE,
  STATUS_EXPIRED,
} from "../../utils/constants";
import { serializeQuery, deserializeQuery } from "../../utils/api";
import styles from "./task-list.module.css";

const options = [
  { value: STATUS_TO_DO, label: STATUS_TO_DO },
  { value: STATUS_DONE, label: STATUS_DONE },
  { value: STATUS_EXPIRED, label: STATUS_EXPIRED },
];

function TaskList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const tasks = useSelector((state: State) => state.tasks.data);
  const [searchValue, setSearch] = useState("");
  const [statusValue, setStatus] = useState("");

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (search) {
      Object.entries(deserializeQuery(search)).forEach(([key, value]) => {
        if (key === "q") {
          setSearch(value);
        }
        if (key === "status") {
          setStatus(value);
        }
      });
    }
  }, [search]);

  useEffect(() => {
    const query = serializeQuery({ q: searchValue, status: statusValue });
    if (query) {
      history.replace({ search: query });
    } else {
      history.replace({ search: "" });
    }
  }, [searchValue, statusValue, history, search]);

  const filteredTasks = useMemo(
    () =>
      tasks
        .map((task) => {
          task.state =
            task.state === STATUS_TO_DO &&
            Date.now() > new Date(task.eventDate).getTime()
              ? STATUS_EXPIRED
              : task.state;
          return task;
        })
        .filter(
          (task) =>
            [task.name, task.category, task.tags, task.description]
              .join(" ")
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase()) &&
            (statusValue === "" || statusValue === task.state)
        ),
    [tasks, searchValue, statusValue]
  );

  const toDoTasksCount = useMemo(
    () => tasks.filter((task) => task.state === STATUS_TO_DO).length,
    [tasks]
  );

  const addTaskHandler = useCallback(() => {
    history.push({ pathname: "/create" });
  }, [history]);

  const onSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  const onStatusChange = (
    status: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    setStatus(status?.value || "");
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Задачи</h1>
        <button
          className={styles.create}
          type="button"
          onClick={addTaskHandler}
        >
          +
        </button>
      </div>
      <span className={styles.remaining}>
        {toDoTasksCount} из {tasks.length} осталось
      </span>
      <div className={styles["search-container"]}>
        <Select
          className={styles.status}
          placeholder={"Статус выполнения..."}
          value={
            statusValue ? { value: statusValue, label: statusValue } : null
          }
          onChange={onStatusChange}
          options={options}
          isClearable
          isSearchable
        />
        <input
          className={styles.search}
          type="text"
          placeholder="Поиск"
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      <ul className={styles.list}>
        {filteredTasks.map((content, idx) => (
          <TaskListItem key={idx} content={content} />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
