"use client";

import Link from "next/link";
import { useId, useState } from "react";
import styles from "./AccountView.module.css";

/** Password reset request. Front-end only: validates and confirms without sending anything. */
export default function LostPasswordForm() {
  const id = useId();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) {
      setStatus({ type: "error", message: "Enter a username or email address." });
      return;
    }
    setStatus({
      type: "success",
      message: "If an account matches, a password reset link would be emailed. (Demo store — nothing was sent.)",
    });
    setValue("");
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate data-reveal>
        <h2 className={styles.title}>Reset password</h2>
        <p className={styles.text}>
          Lost your password? Enter your username or email address and you will receive a link to create a new
          password.
        </p>
        <label htmlFor={`${id}-user`} className={styles.label}>
          Username or email <span className={styles.req}>*</span>
        </label>
        <input
          id={`${id}-user`}
          className={styles.input}
          autoComplete="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={status.type === "error" || undefined}
          aria-describedby={`${id}-status`}
          required
        />
        <button type="submit" className={styles.submit}>
          Reset password
        </button>
        <p
          id={`${id}-status`}
          role="status"
          className={status.type === "error" ? styles.error : status.type === "success" ? styles.text : undefined}
        >
          {status.message}
        </p>
        <Link href="/my-account" className={styles.link}>
          ← Back to login
        </Link>
      </form>
    </div>
  );
}
