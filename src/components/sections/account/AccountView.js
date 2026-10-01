"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useHydrated } from "@/lib/persistentStore";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/components/ui/Price";
import styles from "./AccountView.module.css";

/** Login form, or — once "signed in" — a small dashboard with this browser's orders. */
export default function AccountView() {
  const hydrated = useHydrated();
  const { account } = useCart();

  if (!hydrated) return <div className={styles.placeholder} aria-hidden="true" />;
  return account ? <Dashboard /> : <LoginForm />;
}

function LoginForm() {
  const id = useId();
  const { signIn } = useCart();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return setError("Username or email address is required.");
    if (!password) return setError("Password is required.");
    signIn(username.trim().split("@")[0]);
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate data-reveal>
        <h2 className={styles.title}>Login</h2>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <label htmlFor={`${id}-user`} className={styles.label}>
          Username or email address <span className={styles.req}>*</span>
        </label>
        <input
          id={`${id}-user`}
          className={styles.input}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor={`${id}-pass`} className={styles.label}>
          Password <span className={styles.req}>*</span>
        </label>
        <input
          id={`${id}-pass`}
          type="password"
          className={styles.input}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className={styles.remember}>
          <input type="checkbox" name="rememberme" /> Remember me
        </label>
        <button type="submit" className={styles.submit}>
          Log in
        </button>
        <Link href="/my-account/lost-password" className={styles.link}>
          Lost your password?
        </Link>
        <p className={styles.demo}>Demo store: any username and password will sign you in on this browser only.</p>
      </form>
    </div>
  );
}

function Dashboard() {
  const { account, orders, signOut } = useCart();

  return (
    <div className={styles.dashboard} data-reveal>
      <div className={styles.card}>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles.hello}>
          Hello <strong>{account.name}</strong> (not {account.name}?{" "}
          <button type="button" className={styles.inlineButton} onClick={signOut}>
            Log out
          </button>
          )
        </p>
        <p className={styles.text}>
          From your account dashboard you can view your recent orders, keep shopping, or check the items saved to
          your <Link href="/wishlist">wishlist</Link>.
        </p>
        <div className={styles.actions}>
          <Button href="/shop" variant="primary">
            Browse products
          </Button>
          <Button type="button" variant="light" onClick={signOut}>
            Log out
          </Button>
        </div>
      </div>

      <section className={styles.card} aria-labelledby="orders-heading">
        <h2 id="orders-heading" className={styles.title}>
          Orders
        </h2>
        {orders.length === 0 ? (
          <p className={styles.text}>
            No order has been made yet. <Link href="/shop">Browse products</Link>
          </p>
        ) : (
          <table className={styles.orders}>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Date</th>
                <th scope="col">Items</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.number}>
                  <td>#{o.number}</td>
                  <td>{new Date(o.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</td>
                  <td>{o.items.reduce((n, i) => n + i.quantity, 0)}</td>
                  <td>{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
