"use client";

import Image from "next/image";
import Link from "next/link";
import { PiXLight } from "react-icons/pi";
import { FREE_SHIPPING_THRESHOLD, getShipping, useCart } from "@/context/CartContext";
import { getProduct, getProductHref } from "@/data/products";
import { useHydrated } from "@/lib/persistentStore";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/components/ui/Price";
import QuantityInput from "@/components/ui/QuantityInput";
import styles from "./CartView.module.css";

/** Basket table with quantity steppers, plus the cart totals card. */
export default function CartView() {
  const hydrated = useHydrated();
  const { items, total, setQuantity, removeItem } = useCart();

  if (!hydrated) return <div className={styles.placeholder} aria-hidden="true" />;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <Image src="/images/icons/empty-cart.svg" alt="" width={110} height={110} unoptimized />
        <p className={styles.emptyText}>Your cart is currently empty.</p>
        <Button href="/shop" variant="primary">
          Return to shop
        </Button>
      </div>
    );
  }

  const shipping = getShipping(total);
  const toFreeShipping = FREE_SHIPPING_THRESHOLD - total;

  return (
    <div className={styles.layout}>
      <div className={styles.tableWrap} data-reveal>
        <table className={styles.table}>
          <caption className="visually-hidden">Items in your basket</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Remove</span>
              </th>
              <th scope="col" colSpan={2}>
                Product
              </th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const href = getProduct(item.id) ? getProductHref(item) : "/shop";
              return (
                <tr key={item.id}>
                  <td className={styles.removeCell}>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(item)}
                      aria-label={`Remove ${item.name} from basket`}
                    >
                      <PiXLight aria-hidden="true" />
                    </button>
                  </td>
                  <td className={styles.thumbCell}>
                    <Link href={href} tabIndex={-1} aria-hidden="true">
                      <Image src={item.image} alt="" width={80} height={86} className={styles.thumb} />
                    </Link>
                  </td>
                  <td className={styles.nameCell}>
                    <Link href={href} className={styles.name}>
                      {item.name}
                    </Link>
                  </td>
                  <td data-label="Price">{formatPrice(item.price)}</td>
                  <td data-label="Quantity">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(q) => setQuantity(item.id, q)}
                      label={`Quantity of ${item.name}`}
                      className={styles.qty}
                    />
                  </td>
                  <td data-label="Subtotal" className={styles.subtotal}>
                    {formatPrice(item.price * item.quantity)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link href="/shop" className={styles.continue}>
          ← Continue shopping
        </Link>
      </div>

      <aside className={styles.totals} aria-labelledby="cart-totals-heading" data-reveal>
        <h2 id="cart-totals-heading" className={styles.totalsTitle}>
          Cart totals
        </h2>
        <dl className={styles.rows}>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? "Free shipping" : `Flat rate: ${formatPrice(shipping)}`}</dd>
          </div>
          <div className={styles.grand}>
            <dt>Total</dt>
            <dd>{formatPrice(total + shipping)}</dd>
          </div>
        </dl>
        {toFreeShipping > 0 && (
          <p className={styles.note}>Add {formatPrice(toFreeShipping)} more to get free shipping.</p>
        )}
        <Button href="/checkout" variant="accent" size="lg" className={styles.checkout}>
          Proceed to checkout
        </Button>
      </aside>
    </div>
  );
}
