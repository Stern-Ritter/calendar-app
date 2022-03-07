import React from "react";
import styles from "./tags-input.module.css";

function TagsInput({ name, tags, setTags }: TagInputProps) {
  function removeTags(removeIdx: number) {
    setTags([...tags.filter((el, idx) => idx !== removeIdx)]);
  }

  function addTags(evt: React.KeyboardEvent<HTMLInputElement>) {
    const input = evt.target as HTMLInputElement;
    if (input.value.trim().length > 0) {
      setTags([...tags, input.value]);
      input.value = "";
    }
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {tags.map((tag, index) => (
          <li key={index} className={styles.tag}>
            <span className={styles.title}>{tag}</span>
            <span className={styles.close} onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        className={styles.input}
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Нажмите enter чтобы добавить тэг"
        name={name}
        id={name}
      />
    </div>
  );
}
export default TagsInput;
