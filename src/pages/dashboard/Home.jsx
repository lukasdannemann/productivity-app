import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import { UserContext } from "../../context/UserContext";
import { TodoContext } from "../../context/TodoContext";
import { HabitsContext } from "../../context/HabitsContext";
import { EventContext } from "../../context/EventContext";
import styles from "./Home.module.css";
import planet from "../../assets/cyberspace.png";

function toSwedishDateString(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const { todos } = useContext(TodoContext);
  const { habits } = useContext(HabitsContext);
  const { events } = useContext(EventContext);

  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        setQuote(data);
      } catch (error) {
        console.error("Failed to fetch quote", error);
      }
    };

    fetchQuote();
  }, []);

  // 1) Tre senaste ej utförda todos (createdAt nyast först)
  const nextThreeTodos = [...(todos || [])]
    .filter((t) => !t.isDone)
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3);

  // 2) Tre rutiner med högst repetitions
  const topThreeHabits = [...(habits || [])]
    .sort((a, b) => (b.repetitions || 0) - (a.repetitions || 0))
    .slice(0, 3);

  // 3) Tre nästkommande events (end >= nu), sorterade på start
  const now = new Date();
  const upcomingThreeEvents = [...(events || [])]
    .filter((e) => {
      const end = new Date(e.end);
      return !Number.isNaN(end.getTime()) && end >= now;
    })
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  return (
    <div className="layout">
      <Navigation />
      <main className="content">
        <div className={styles.dashboard}>
          <h1 className={styles.welcome}>
            Welcome back,{" "}
            <span className={styles.username}>
              {currentUser?.username || "User"}
            </span>
          </h1>
          <img src={planet} alt="planet drawing" className={styles.planet} />
          {quote && (
            <div className={styles.quote}>
              <h2>" {quote.quote} "</h2> — <p>{quote.author}</p>
            </div>
          )}

          <section className={styles.section}>
            <h2 className={styles.title}>Latest Incomplete Tasks</h2>

            {nextThreeTodos.length === 0 ? (
              <p className={styles.emptyP}>No active todos at the moment.</p>
            ) : (
              <ul className={styles.cardGrid3}>
                {nextThreeTodos.map((t) => (
                  <li key={t.id} className={styles.card}>
                    <div className={styles.label}>{t.title}</div>
                    {t.deadline ? (
                      <small className={styles.number}>
                        Deadline: {toSwedishDateString(t.deadline)}
                      </small>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <Link to="/todos" className={styles.link}>
              {nextThreeTodos.length === 0
                ? "Create a new task"
                : "See your full task journey"}
            </Link>
          </section>

          <section className={styles.section}>
            <h2 className={styles.title}>Top Repeated Habits</h2>

            {topThreeHabits.length === 0 ? (
              <p className={styles.emptyP}>No routines yet.</p>
            ) : (
              <ul className={styles.cardGrid3}>
                {topThreeHabits.map((h) => (
                  <li key={h.id} className={styles.card}>
                    <div className={styles.label}>{h.label}</div>
                    <small className={styles.number}>
                      Repetitions: {h.repetitions || 0}
                    </small>
                  </li>
                ))}
              </ul>
            )}

            <Link to="/habits" className={styles.link}>
              {topThreeHabits.length === 0
                ? "Create a new habit"
                : "Explore all Habits"}
            </Link>
          </section>

          <section className={styles.section}>
            <h2 className={styles.title}>Upcoming Events</h2>

            {upcomingThreeEvents.length === 0 ? (
              <p className={styles.emptyP}>No upcoming events.</p>
            ) : (
              <ul className={styles.cardGrid3}>
                {upcomingThreeEvents.map((e) => (
                  <li key={e.id} className={styles.card}>
                    <div className={styles.label}>
                      {e.title || e.name || "Händelse"}
                    </div>
                    <small className={styles.number}>
                      {toSwedishDateString(e.start)} →{" "}
                      {toSwedishDateString(e.end)}
                    </small>
                  </li>
                ))}
              </ul>
            )}

            <Link to="/events" className={styles.link}>
              {upcomingThreeEvents.length === 0
                ? "Add an upcoming event"
                : "See all events"}
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
