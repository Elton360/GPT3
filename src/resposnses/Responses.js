import React from "react";

import Response from "../response/Response";

import styles from "./responses.module.css";

function Responses({ prompts, clearPrompts }) {
  const deleteEntries = () => {
    localStorage.clear("prompts");
    clearPrompts([]);
  };

  return (
    <>
      {prompts[0] && <h2 className={styles.sub_heading}>List of Responses</h2>}
      <ol className={styles.container}>
        {prompts.map((prompt, i) => (
          <Response key={i} title={prompt.prompt} message={prompt.response} />
        ))}
      </ol>
      {prompts[0] && (
        <button
          type="button"
          data-message="Delete previous responses"
          onClick={deleteEntries}
          className={styles.delete_btn}
        >
          Delete All
        </button>
      )}
    </>
  );
}

export default Responses;
