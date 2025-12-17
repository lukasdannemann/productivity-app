import Navigation from "../components/navigation/Navigation";

export default function Home() {
  return (
    <div className="layout">
      <Navigation />
      <main className="content">
        <h1>Welcome back, User</h1>
      </main>
    </div>
  );
}
