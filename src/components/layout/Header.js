import Link from "next/link";
import { PiUserLight } from "react-icons/pi";
import Logo from "@/components/ui/Logo";
import CartMenu from "./CartMenu";
import MainNav from "./MainNav";
import SearchForm from "./SearchForm";
import TopBar from "./TopBar";
import styles from "./Header.module.css";

/** Site header: shipping strip, logo / search / account / basket row, and the main nav bar. */
export default function Header() {
  return (
    <header className={styles.header}>
      <TopBar />

      <div className={`container ${styles.main}`}>
        <Logo priority className={styles.logo} />

        <SearchForm className={styles.search} />

        <div className={styles.actions}>
          <Link href="/my-account" className={styles.login}>
            <span className={styles.loginLabel}>Login</span>
            <PiUserLight aria-hidden="true" className={styles.loginIcon} />
            <span className="visually-hidden">to your account</span>
          </Link>
          <CartMenu />
        </div>
      </div>

      <MainNav />
    </header>
  );
}
