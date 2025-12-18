import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "./Navigation.module.css";
import Logo from "../../assets/shamanLogo.grey.png";
import LogOutIcn from "../../assets/icons8-log-out-100.png";

// Navigation configuration
const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard"},
  { path: "/todos", label: "Todos"},
  { path: "/habits", label: "Habits"},
  { path: "/events", label: "Event planner"},
];

// Separate component for navigation link
function NavLink({ path, label, isActive }) {
  return (
    <Link
      to={path}
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.label}>{label}</span>
    </Link>
  );
}

// Separate component for logo section
function NavHeader() {
  return (
    <div className={styles.logoContainer}>
      <Link to="/dashboard" className={styles.logoLink}>
        <img
          src={Logo}
          alt="Logo representing a old shaman sitting down and meditating"
          className={styles.logo}
        />
      </Link>
    </div>
  );
}

// Separate component for footer
function NavFooter({ onLogout }) {
  return (
    <div className={styles.navFooter}>
      <button onClick={onLogout} className={styles.logoutButton}>
        <img
          src={LogOutIcn}
          alt="Log out icon"
          className={styles.logOut}
        />
        Log out
      </button>
    </div>
  );
}

// Main Navigation component
function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className={styles.sidebar}>
      <NavHeader />

      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <NavLink
              path={item.path}
              label={item.label}
              isActive={location.pathname === item.path}
            />
          </li>
        ))}
      </ul>

      <NavFooter onLogout={handleLogout} />
    </nav>
  );
}

export default Navigation;