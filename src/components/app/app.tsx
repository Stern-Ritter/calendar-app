import React from "react";
import AppHeader from "../app-header/app-header";
import TaskList from "../task-list/task-list";
import TaskForm from "../task-form/task-form";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <main className={styles.main}>
        <AppHeader />
        <TaskList />
        <TaskForm />
      </main>
    </>
  );
}

export default App;
