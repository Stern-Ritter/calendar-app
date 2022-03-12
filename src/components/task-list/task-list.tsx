import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../services/store/store";
import { getTasks, TASK_FORM_CLEAR_STATE } from "../../services/actions";
import TaskListItem from "../task-list-item/task-list-item";
import { STATUS_TO_DO } from "../../utils/constants";
import styles from "./task-list.module.css";

function TaskList() {
  const tasks = useSelector((state: State) => state.tasks.data);
  const toDoTasksCount = useMemo(
    () => tasks.filter((task) => task.state === STATUS_TO_DO).length,
    [tasks]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const addTaskHandler = () => {
    dispatch({ type: TASK_FORM_CLEAR_STATE });
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
      <ul className={styles.list}>
        {tasks.map((content, idx) => (
          <TaskListItem key={idx} content={content} />
        ))}
      </ul>
    </>
  );
}

export default TaskList;
