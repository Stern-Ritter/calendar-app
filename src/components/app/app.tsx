import React from "react";
import AppHeader from "../app-header/app-header";
import TaskList from "../task-list/task-list";
import TaskForm from "../task-form/task-form";

function App() {
  return (
    <>
      <AppHeader />
      <TaskList />
      <TaskForm />
    </>
  );
}

export default App;
