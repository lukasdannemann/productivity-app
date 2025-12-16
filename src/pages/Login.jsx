import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./LoginSignup.module.css"
import { UserContext } from "../context/UserContext"

export default function Login(){
const {loginUser} = useContext(UserContext)

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const navigate = useNavigate()
    

function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // lösning för att ignorera whitespace och case-sensitivity vid inloggning
    const result = loginUser(username, password)

    if (result.success) {
        navigate("/dashboard");
    } else{
        setError(result.message)
        return ;
    }
    
    //inloggningslogik här senare
}


return (
<div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.enterP}>Enter the sanctuary</p>

        
            <div className={styles.inputGroup}>
            <label className={styles.label}>
                Username
            <input className={styles.emailInput}
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
            <input className={styles.passwordInput}
                type="password" 
                value={password} 
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)} 
                required
                autoComplete="current-password"
            />
        </label>
    </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button}>Log in</button>
        <div className={styles.divider} />
        <p>New to the sanctuary? {""}
            <span className={styles.link} onClick={() => navigate("/signup")}>
                Create one
            </span>
        </p>
    </form>
</div>

)}