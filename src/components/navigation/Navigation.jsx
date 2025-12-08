import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import Logo from "../../assets/shamanLogo.grey.png";

function Navigation() {
  const location = useLocation();

  // Dölj navbar på login-sidan
  if (location.pathname === "/login") {
    return null;
  }

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/todos", label: "Todos" },
    { path: "/habits", label: "Habits" },
    { path: "/events", label: "Event planner" },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoDiv}>
        <Link to="/"><img
          src={Logo}
          alt="Logo representing a old shaman sitting down and meditating"
          width={100}
        /></Link>
        <h1 className={styles.title}>
          HaloMind
        </h1>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navFooter}>
        <Link to="/login" className={styles.navLink}>
          Log out
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
