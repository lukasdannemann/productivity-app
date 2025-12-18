import { Link } from "react-router-dom";
import errorIcon from "../../assets/Triskelion-Symbol.png";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.content}>
      <img src={errorIcon} alt="" />
      <h1>Oops! Can't find the page you are looking for.</h1>
      <Link to="/dashboard"><button>
        Back to start
      </button></Link>
    </div>
  );
}
