import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import { UserContext } from "../context/UserContext";

export default function SignUp() {
const {registerUser, loginUser} = useContext(UserContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const result = registerUser(username, password)

    if(result.success){
      navigate("/dashboard");
    }else{
      setError(result.message)
    }
    
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.enterP}>Join the sanctuary</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Username
            <input
              className={styles.emailInput}
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
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

        {error && <p className={styles.error}>{error}</p>}
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
