import { PiCreditCardLight, PiRepeatLight, PiShoppingCartSimpleLight, PiTruckLight } from "react-icons/pi";
import IconBox from "@/components/ui/IconBox";
import { features } from "@/data/site";
import styles from "./Features.module.css";

const featureIcons = {
  shipping: PiTruckLight,
  deal: PiShoppingCartSimpleLight,
  return: PiRepeatLight,
  payment: PiCreditCardLight,
};

/** Green benefits strip (shipping, deals, returns, payment). */
export default function Features() {
  return (
    <section className={styles.features} aria-label="Why shop with us">
      <div className="container">
        <ul className={styles.strip} data-reveal>
          {features.map(({ id, title, description }) => {
            const Icon = featureIcons[id];
            return (
              <li key={id}>
                <IconBox icon={<Icon />} title={title} description={description} className={styles.item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
