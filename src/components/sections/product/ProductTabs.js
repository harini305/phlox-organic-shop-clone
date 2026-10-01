"use client";

import { useId, useRef, useState } from "react";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import StarRating from "@/components/ui/StarRating";
import styles from "./ProductTabs.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

/**
 * Vertical tabs (Description / Additional information / Reviews) following
 * the ARIA tabs pattern: arrow keys move between tabs, Home/End jump.
 * New reviews are kept in local state for the demo.
 */
export default function ProductTabs({ product, details, initialReviews }) {
  const id = useId();
  const [reviews, setReviews] = useState(initialReviews);
  const [active, setActive] = useState("description");
  const tabRefs = useRef({});

  const tabs = [
    { key: "description", label: "Description" },
    { key: "additional", label: "Additional information" },
    { key: "reviews", label: "Reviews", count: reviews.length },
  ];

  function onKeyDown(e) {
    const index = tabs.findIndex((t) => t.key === active);
    const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next;
    if (e.key in moves) next = (index + moves[e.key] + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next].key);
    tabRefs.current[tabs[next].key]?.focus();
  }

  return (
    <section className={styles.tabs} id="product-reviews" aria-label="Product information" data-reveal>
      <div className={styles.list} role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[tab.key] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${tab.key}`}
            aria-selected={active === tab.key}
            aria-controls={`${id}-panel-${tab.key}`}
            tabIndex={active === tab.key ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
            {tab.count != null && <span className={styles.count}>{tab.count}</span>}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-description`}
        aria-labelledby={`${id}-tab-description`}
        hidden={active !== "description"}
        className={styles.panel}
      >
        {details.description.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h2 className={styles.subheading}>Product Details</h2>
        <p>{details.summary}</p>
        <ul className={styles.bullets}>
          {details.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-additional`}
        aria-labelledby={`${id}-tab-additional`}
        hidden={active !== "additional"}
        className={styles.panel}
      >
        <table className={styles.table}>
          <tbody>
            {details.weight != null && (
              <tr>
                <th scope="row">Weight</th>
                <td>{details.weight} kg</td>
              </tr>
            )}
            {details.origin && (
              <tr>
                <th scope="row">Origin</th>
                <td>{details.origin}</td>
              </tr>
            )}
            <tr>
              <th scope="row">Certification</th>
              <td>Certified organic</td>
            </tr>
            <tr>
              <th scope="row">Packaging</th>
              <td>Plastic-free, compostable</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-reviews`}
        aria-labelledby={`${id}-tab-reviews`}
        hidden={active !== "reviews"}
        className={styles.panel}
      >
        <h2 className={styles.subheading}>
          {reviews.length ? `${reviews.length} ${reviews.length === 1 ? "review" : "reviews"} for ${product.name}` : "Reviews"}
        </h2>
        {reviews.length === 0 && <p>There are no reviews yet. Be the first to review “{product.name}”.</p>}
        <ol className={styles.reviews}>
          {reviews.map((r, i) => (
            <li key={`${r.author}-${i}`} className={styles.review}>
              <div className={styles.reviewHead}>
                <strong>{r.author}</strong>
                <time dateTime={r.date}>{dateFormat.format(new Date(r.date))}</time>
              </div>
              <StarRating value={r.rating} />
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
        <ReviewForm productName={product.name} onSubmit={(review) => setReviews((list) => [review, ...list])} />
      </div>
    </section>
  );
}

function ReviewForm({ productName, onSubmit }) {
  const id = useId();
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({ text: "", author: "", email: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!rating) return setStatus({ type: "error", message: "Please choose a rating." });
    if (!form.text.trim() || !form.author.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      return setStatus({ type: "error", message: "Please fill in your review, name and a valid email." });
    }
    onSubmit({ author: form.author.trim(), rating, text: form.text.trim(), date: new Date().toISOString() });
    setForm({ text: "", author: "", email: "" });
    setRating(0);
    setStatus({ type: "success", message: "Thanks — your review has been added." });
  }

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.formTitle}>Add a review for “{productName}”</h3>

      <fieldset className={styles.stars}>
        <legend>Your rating *</legend>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={styles.star}>
            <input
              type="radio"
              name={`${id}-rating`}
              value={n}
              checked={rating === n}
              onChange={() => setRating(n)}
              className="visually-hidden"
            />
            {n <= rating ? <PiStarFill aria-hidden="true" /> : <PiStarLight aria-hidden="true" />}
            <span className="visually-hidden">
              {n} {n === 1 ? "star" : "stars"}
            </span>
          </label>
        ))}
      </fieldset>

      <label htmlFor={`${id}-text`} className={styles.label}>
        Your review *
      </label>
      <textarea id={`${id}-text`} rows={5} className={styles.input} {...field("text")} />

      <div className={styles.row}>
        <div>
          <label htmlFor={`${id}-author`} className={styles.label}>
            Name *
          </label>
          <input id={`${id}-author`} autoComplete="name" className={styles.input} {...field("author")} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={styles.label}>
            Email *
          </label>
          <input id={`${id}-email`} type="email" autoComplete="email" className={styles.input} {...field("email")} />
        </div>
      </div>

      <button type="submit" className={styles.submit}>
        Submit
      </button>
      <p className={`${styles.status} ${styles[status.type] ?? ""}`} role="status">
        {status.message}
      </p>
    </form>
  );
}
