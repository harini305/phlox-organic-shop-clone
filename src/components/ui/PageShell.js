import Breadcrumbs from "./Breadcrumbs";
import styles from "./PageShell.module.css";

/**
 * Standard inner-page wrapper: breadcrumb heading (the page's h1) and content.
 * title: current page name; the trail is always Home › title.
 */
export default function PageShell({ title, children, className = "" }) {
  return (
    <section className={[styles.shell, className].filter(Boolean).join(" ")}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: title, href: "#" },
          ]}
          className={styles.heading}
        />
        {children}
      </div>
    </section>
  );
}
