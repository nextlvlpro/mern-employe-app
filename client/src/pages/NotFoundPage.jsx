import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="center-screen">
      <section className="message-box">
        <h1>Page not found</h1>
        <p>The page you opened is not available.</p>
        <Link className="primary-button" to="/dashboard">Go to dashboard</Link>
      </section>
    </main>
  );
}
