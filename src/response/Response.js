import React from "react";

import styles from "./response.module.css";

function Response({ title, message }) {
  return (
    <>
      <li className={styles.container}>
        <h3 className={styles.card__title}>{title}</h3>
        <p>{message}</p>
      </li>
    </>
  );
}

export default Response;
