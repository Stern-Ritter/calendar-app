import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header} data-testid="header">
      <Link to="/" className={styles.logo}>
        <span className={styles.image} />
        Календарь задач
      </Link>
      <nav>
        <ul className={styles.list}>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/"
              exact={true}
            >
              Список задач
            </NavLink>
          </li>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/about"
            >
              Информация
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
