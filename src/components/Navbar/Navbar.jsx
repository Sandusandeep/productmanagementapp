import { Link, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <h2 className={styles.logo}>React Store</h2>

      <div className={styles.links}>
        <Link
          to="/"
          className={location.pathname === "/" ? styles.activeLink : ""}
        >
          Products
        </Link>

        <Link
          to="/admin"
          className={location.pathname === "/admin" ? styles.activeLink : ""}
        >
          Admin
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
