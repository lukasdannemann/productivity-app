import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import Logo from "../../assets/shamanLogo.grey.png";
import eventsIcon from "../../assets/icons8-calendar-75.png";
import dashboardIcon from "../../assets/icons8-dashboard-96.png";
import habitsIcon from "../../assets/icons8-sparkles-60.png";
import todoIcon from "../../assets/icons8-checkbox-50.png";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const {logoutUser} = useContext(UserContext)
  // Dölj navbar på login-sidan
  if (location.pathname === "/") {
    return null;
  }

  const navigate = useNavigate()

  const navItems = [
    { path: "/dashboard", label: "Dashboard", img: dashboardIcon },
    { path: "/todos", label: "Todos", img: todoIcon },
    { path: "/habits", label: "Habits", img: habitsIcon },
    { path: "/events", label: "Event planner", img: eventsIcon },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoDiv}>
        <Link to="/dashboard">
          <img
            src={Logo}
            alt="Logo representing a old shaman sitting down and meditating"
            width={100}
          />
        </Link>
        <h1 className={styles.title}>HaloMind</h1>
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
              <img src={item.img} alt="" className={styles.icons}/>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navFooter}>
        <button onClick={() => {logoutUser(); navigate('/' )}} ></button>
      </div>
    </nav>
  );
}

export default Navigation;
