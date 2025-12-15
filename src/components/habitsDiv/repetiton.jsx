import styles from "./repetition.module.css";

export default function Repetition({ count, onIncrement, onDecrement, onReset }) {
  return (
    <div>
      <div className={styles.repSection}>
        <button onClick={onDecrement}>-</button>
        <h4>{count}</h4>
        <button onClick={onIncrement}>+</button>
      </div>

      <button onClick={onReset} className={styles.resetBtn}>
        Reset
      </button>
    </div>
  );
}