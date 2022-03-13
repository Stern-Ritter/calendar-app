import React from "react";
import styles from "./about.module.css";

function About() {
  return (
    <>
      <h1 className={styles.title}>О приложении</h1>
      <p className={styles.text}>
        Бесплатное приложение по созданию и отслеживанию задач. Оно позволяет
        пользователям создать задачи, изменять их статус, отслеживать и
        фильтровать.
      </p>
      <p className={styles.text}>Год выхода: 2022 г.</p>
    </>
  );
}

export default About;
