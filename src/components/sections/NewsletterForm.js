"use client";

import { useId, useState } from "react";
import styles from "./Newsletter.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Front-end only sign-up: validates the address and shows a confirmation. */
export default function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ type: "success", message: "Thanks for subscribing! Your discount code is on its way." });
    setEmail("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor={`${id}-email`} className="visually-hidden">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          className={styles.input}
          placeholder="Please Insert Your Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.type === "error") setStatus({ type: "idle", message: "" });
          }}
          aria-invalid={status.type === "error"}
          aria-describedby={`${id}-status`}
          required
        />
        <button type="submit" className={styles.submit}>
          Subscribe
        </button>
      </div>
      <p id={`${id}-status`} className={`${styles.status} ${styles[status.type] ?? ""}`} role="status">
        {status.message}
      </p>
    </form>
  );
}
