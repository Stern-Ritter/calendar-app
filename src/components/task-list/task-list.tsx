import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../services/store/store";
import { getTasks } from "../../services/actions";
import TaskListItem from "../task-list-item/task-list-item";
import styles from "./task-list.module.css";

function TaskList() {
  const tasks = useSelector((state: State) => state.tasks.data);
  const toDoTasksCount = useMemo(
    () => tasks.filter((task) => task.state === "to do").length,
    [tasks]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <>
      <h1 className={styles.title}>Задачи</h1>
      <span className={styles.remaining}>
        {toDoTasksCount} из {tasks.length} осталось
      </span>
      <ul className={styles.list}>
        {tasks.map((content, idx) => (
          <TaskListItem key={idx} content={content} />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
