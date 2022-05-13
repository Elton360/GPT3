import React from "react";

import ReactDOM from "react-dom";

import loading from "../utilities/loading.gif";
import styles from "./modal.module.css";

const Loading = () => {
  return (
    <div className={styles.backdrop}>
      <img src={loading} alt="Logo" />
    </div>
  );
};

function Modal() {
  return (
    <>
      {ReactDOM.createPortal(
        <Loading />,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default Modal;
