import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import { UserContext } from "../../context/UserContext";

export default function Home() {
  const { currentUser } = useContext(UserContext);
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

  return (
    <div className="layout">
      <Navigation />
      <main className="content">
        <h1>Welcome back, {currentUser?.username || "User"}</h1>

        {quote && (
          <h2>{`"${quote.quote}" — ${quote.author}`}</h2>
        )}
      </main>
    </div>
  );
}