"use client";

import { useId, useState } from "react";
import styles from "./ContactForm.module.css";

const EMPTY = { name: "", email: "", subject: "", message: "" };

/** Name / email / subject / message form. Front-end only: validates and confirms. */
export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const found = {};
    if (!values.name.trim()) found.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) found.email = "Please enter a valid email address.";
    if (!values.message.trim()) found.message = "Please write a message.";
    setErrors(found);
    setSent(false);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    setValues(EMPTY);
    setSent(true);
  }

  const field = (name, extra = {}) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    className: styles.input,
    ...extra,
  });

  const error = (name) =>
    errors[name] && (
      <p id={`${id}-${name}-error`} className={styles.error}>
        {errors[name]}
      </p>
    );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div>
          <label htmlFor={`${id}-name`} className="visually-hidden">
            Name (required)
          </label>
          <input {...field("name", { placeholder: "Enter your name*", autoComplete: "name", required: true })} />
          {error("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="visually-hidden">
            Email (required)
          </label>
          <input
            {...field("email", {
              type: "email",
              placeholder: "Please Insert Your Email*",
              autoComplete: "email",
              required: true,
            })}
          />
          {error("email")}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-subject`} className="visually-hidden">
          Subject
        </label>
        <input {...field("subject", { placeholder: "Subject" })} />
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="visually-hidden">
          Message (required)
        </label>
        <textarea {...field("message", { placeholder: "Your message *", rows: 5, required: true })} />
        {error("message")}
      </div>
      <div className={styles.footer}>
        <p className={styles.status} role="status">
          {sent && "Thanks for getting in touch — we'll reply within one working day."}
        </p>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </div>
    </form>
  );
}
