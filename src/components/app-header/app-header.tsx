import React from "react";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header} data-testid="header">
      <a href="./" className={styles.link}>
        <span className={styles.logo} />
        <span>Календарь задач</span>
      </a>
    </header>
  );
}

export default AppHeader;
