import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSignup.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.enterP}>Join the sanctuary</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Email
            <input
              className={styles.emailInput}
              type="email"
              value={email}
              placeholder="Your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.passwordInput}
              type="password"
              value={password}
              placeholder="Choose a password"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>
        </div>

        <button className={styles.button} type="submit">Sign up</button>
        <div className={styles.divider} />

        <p>Already have an account?{" "}
          <span className={styles.link} onClick={() => navigate("/")}>
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
