import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import TaskList from "../task-list/task-list";
import TaskForm from "../task-form/task-form";
import About from "../about/about";
import styles from "./app.module.css";

function App() {
  return (
    <Router>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/" exact={true}>
            <TaskList />
          </Route>
          <Route path="/create">
            <TaskForm />
          </Route>
          <Route path="/edit/:taskId">
            <TaskForm />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
