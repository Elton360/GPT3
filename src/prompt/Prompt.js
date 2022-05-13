import { React, useRef, useState } from "react";

import Responses from "../resposnses/Responses";
import Modal from "../modal/Modal";

import styles from "./prompt.module.css";

function Prompt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [prompts, setPrompts] = useState(
    JSON.parse(localStorage.getItem("prompts") || "[]")
  );

  const promptRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      prompt: promptRef.current.value,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          //catch error
          return res.json().then((data) => {
            let errorMessage = "Whoops: ";
            if (data?.error.message)
              errorMessage += data.error.message.toLowerCase();
            throw errorMessage;
          });
        }
      })
      .then((data) => {
        const previousPrompts = JSON.parse(
          localStorage.getItem("prompts") || "[]"
        );
        previousPrompts.unshift({
          prompt: `${promptRef.current.value}`,
          response: `${data.choices[0].text}`,
        });
        const newPrompts = JSON.stringify(previousPrompts);
        localStorage.setItem("prompts", newPrompts);
        setPrompts(previousPrompts);
        document.getElementById("prompt").value = "";
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const clearPrompts = () => {
    setPrompts(JSON.parse("[]"));
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.input_container}>
          <input
            type="text"
            id="prompt"
            name="prompt"
            placeholder="Please Enter a Prompt"
            required
            ref={promptRef}
            className={styles.text_area}
          />
          <label htmlFor="prompt">Enter a prompt</label>
        </div>
        <button
          type="submit"
          data-message="Submit for response"
          className={styles.submit_btn}
        >
          Submit
        </button>
      </form>
      <Responses prompts={prompts} clearPrompts={clearPrompts} />
      {isLoading && <Modal />}
      {error && <p>{error}</p>}
    </>
  );
}

export default Prompt;
