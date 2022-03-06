import React from "react";
import Task from "../task/task";
import styles from "./task-list.module.css";

function TaskList() {
  return (
    <>
      <h1 className={styles.title}>Задачи</h1>
      {/* <span className={styles.remaining}>
        {data.length} из {data.length} осталось
      </span> */}
      <ul className={styles.list}>
        {/* {data.map((content, idx) => (
          <Task key={idx} content={content} />
        ))} */}
      </ul>
    </>
  );
}

export default TaskList;
