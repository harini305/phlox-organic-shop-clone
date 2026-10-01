"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { PiCheckCircleLight } from "react-icons/pi";
import { getShipping, useCart } from "@/context/CartContext";
import { useHydrated } from "@/lib/persistentStore";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/components/ui/Price";
import styles from "./CheckoutView.module.css";

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Ireland", "Australia", "Germany", "France", "India"];

const PAYMENT_METHODS = [
  { value: "bank", label: "Direct bank transfer", note: "Make your payment directly into our bank account. Your order will ship once the funds have cleared." },
  { value: "cod", label: "Cash on delivery", note: "Pay with cash when your order is delivered." },
];

const FIELDS = [
  { name: "firstName", label: "First name", autoComplete: "given-name", half: true, required: true },
  { name: "lastName", label: "Last name", autoComplete: "family-name", half: true, required: true },
  { name: "company", label: "Company name (optional)", autoComplete: "organization" },
  { name: "country", label: "Country / Region", autoComplete: "country-name", required: true, options: COUNTRIES },
  { name: "address", label: "Street address", autoComplete: "street-address", required: true },
  { name: "city", label: "Town / City", autoComplete: "address-level2", half: true, required: true },
  { name: "postcode", label: "Postcode / ZIP", autoComplete: "postal-code", half: true, required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true, required: true },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", half: true, required: true },
];

function validate(values) {
  const errors = {};
  FIELDS.forEach((f) => {
    if (f.required && !values[f.name]?.trim()) errors[f.name] = `${f.label} is required.`;
  });
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone && !/^[+\d][\d\s()-]{5,}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  return errors;
}

/** Billing form + order review + payment choice. Placing an order is simulated locally. */
export default function CheckoutView() {
  const id = useId();
  const hydrated = useHydrated();
  const { items, total, account, placeOrder } = useCart();
  const formRef = useRef(null);
  const [values, setValues] = useState({ country: COUNTRIES[0], firstName: account?.name ?? "" });
  const [payment, setPayment] = useState(PAYMENT_METHODS[0].value);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  if (!hydrated) return <div className={styles.placeholder} aria-hidden="true" />;

  if (order) {
    return (
      <div className={styles.confirmation} role="status">
        <PiCheckCircleLight className={styles.confirmIcon} aria-hidden="true" />
        <h2 className={styles.confirmTitle}>Thank you. Your order has been received.</h2>
        <ul className={styles.orderFacts}>
          <li>
            Order number <strong>#{order.number}</strong>
          </li>
          <li>
            Date <strong>{new Date(order.date).toLocaleDateString("en-US", { dateStyle: "long" })}</strong>
          </li>
          <li>
            Total <strong>{formatPrice(order.total)}</strong>
          </li>
          <li>
            Payment method <strong>{PAYMENT_METHODS.find((m) => m.value === order.payment)?.label}</strong>
          </li>
        </ul>
        <p className={styles.demoNote}>This is a demo store — no payment was taken and nothing will be shipped.</p>
        <div className={styles.confirmActions}>
          <Button href="/shop" variant="primary">
            Continue shopping
          </Button>
          <Button href="/my-account" variant="light">
            View my account
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyBox}>
        <p>Your cart is currently empty, so there is nothing to check out.</p>
        <Button href="/shop" variant="primary">
          Return to shop
        </Button>
      </div>
    );
  }

  const shipping = getShipping(total);

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setOrder(
      placeOrder({
        items,
        total: total + shipping,
        payment,
        billing: values,
      }),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} className={styles.layout} onSubmit={handleSubmit} noValidate>
      <section className={styles.card} aria-labelledby={`${id}-billing`} data-reveal>
        <h2 id={`${id}-billing`} className={styles.cardTitle}>
          Billing details
        </h2>
        {errorCount > 0 && (
          <p className={styles.errorSummary} role="alert">
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
          </p>
        )}
        <div className={styles.fields}>
          {FIELDS.map((f) => {
            const fieldId = `${id}-${f.name}`;
            const error = errors[f.name];
            const common = {
              id: fieldId,
              name: f.name,
              autoComplete: f.autoComplete,
              className: styles.input,
              value: values[f.name] ?? "",
              onChange: (e) => setValues((v) => ({ ...v, [f.name]: e.target.value })),
              "aria-invalid": error ? true : undefined,
              "aria-describedby": error ? `${fieldId}-error` : undefined,
              required: f.required,
            };
            return (
              <div key={f.name} className={f.half ? styles.half : styles.full}>
                <label htmlFor={fieldId} className={styles.label}>
                  {f.label}
                  {f.required && <span className={styles.req}> *</span>}
                </label>
                {f.options ? (
                  <select {...common}>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input type={f.type ?? "text"} {...common} />
                )}
                {error && (
                  <p id={`${fieldId}-error`} className={styles.fieldError}>
                    {error}
                  </p>
                )}
              </div>
            );
          })}
          <div className={styles.full}>
            <label htmlFor={`${id}-notes`} className={styles.label}>
              Order notes (optional)
            </label>
            <textarea
              id={`${id}-notes`}
              rows={4}
              className={styles.input}
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={values.notes ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
            />
          </div>
        </div>
      </section>

      <section className={styles.card} aria-labelledby={`${id}-review`} data-reveal>
        <h2 id={`${id}-review`} className={styles.cardTitle}>
          Your order
        </h2>
        <table className={styles.review}>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name} <strong>× {item.quantity}</strong>
                </td>
                <td>{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Subtotal</th>
              <td>{formatPrice(total)}</td>
            </tr>
            <tr>
              <th scope="row">Shipping</th>
              <td>{shipping === 0 ? "Free shipping" : formatPrice(shipping)}</td>
            </tr>
            <tr className={styles.grand}>
              <th scope="row">Total</th>
              <td>{formatPrice(total + shipping)}</td>
            </tr>
          </tfoot>
        </table>

        <fieldset className={styles.payment}>
          <legend className="visually-hidden">Payment method</legend>
          {PAYMENT_METHODS.map((m) => (
            <label key={m.value} className={`${styles.method} ${payment === m.value ? styles.methodActive : ""}`}>
              <span className={styles.methodHead}>
                <input
                  type="radio"
                  name="payment"
                  value={m.value}
                  checked={payment === m.value}
                  onChange={() => setPayment(m.value)}
                />
                {m.label}
              </span>
              {payment === m.value && <span className={styles.methodNote}>{m.note}</span>}
            </label>
          ))}
        </fieldset>

        <p className={styles.privacy}>
          Your personal data will be used to process your order and support your experience on this website. This
          demo does not send or store it anywhere except your own browser.
        </p>

        <button type="submit" className={styles.placeOrder}>
          Place order
        </button>
        <Link href="/cart" className={styles.back}>
          ← Back to cart
        </Link>
      </section>
    </form>
  );
}
