import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./LoginSignup.module.css"
import { UserContext } from "../../context/UserContext"
import Logo from "../../assets/shamanLogo.grey.png";

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
        <img src={Logo} alt="Logo representing a old shaman sitting down and meditating" />
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.enterP}>Enter the sanctuary</p>

        
            <div className={styles.inputGroup}>
            <label className={styles.label}>
                <code>Username</code>
            <input className={styles.emailInput}
                type="text" 
                value={username} 
                placeholder="meditator123"
                onChange={(e) => setUsername(e.target.value)} 
                required 
                autoComplete="off"
            />
        </label>

        <label className={styles.label}>
            <code>Password</code>
            <input className={styles.passwordInput}
                type="password" 
                value={password} 
                placeholder="●●●●●●●●"
                onChange={(e) => setPassword(e.target.value)} 
                required
                autoComplete="new-password"
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