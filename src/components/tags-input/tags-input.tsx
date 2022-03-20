import React from "react";
import styles from "./tags-input.module.css";

function TagsInput({ name, tags, onTagsChange }: TagInputProps) {
  function removeTags(removeIdx: number) {
    onTagsChange({
      field: name,
      value: [...tags.filter((_, idx) => idx !== removeIdx)],
    });
  }

  function addTags(evt: React.KeyboardEvent<HTMLInputElement>) {
    const input = evt.target as HTMLInputElement;
    if (input.value.trim().length > 0) {
      onTagsChange({
        field: name,
        value: [...tags, input.value],
      });
      input.value = "";
    }
  }

  return (
    <div className={styles.container} data-testid="tags-input">
      <ul className={styles.list}>
        {tags.map((tag, index) => (
          <li key={index} className={styles.tag} data-testid="tag">
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
        onKeyDown={(event) => (event.key === " " ? addTags(event) : null)}
        placeholder="Нажмите пробел чтобы добавить тэг"
        name={name}
        id={name}
      />
    </div>
  );
}
export default TagsInput;
