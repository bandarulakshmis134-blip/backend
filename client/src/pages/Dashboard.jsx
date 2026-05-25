import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="page-card">
      <h1>Creator Dashboard</h1>
      {user && (
        <p>
          Welcome back, <strong>{user.name}</strong> — <em>{user.email}</em>
        </p>
      )}

      <div className="feature-grid">
        <article>
          <h2>Draft Recipes</h2>
          <p>Placeholder for recipe cards and saved draft content.</p>
        </article>
        <article>
          <h2>Content Studio</h2>
          <p>Future tools will let creators draft titles, ingredients, and publishing notes.</p>
        </article>
        <article>
          <h2>Platform Insights</h2>
          <p>Summary panels for upcoming creator tasks and performance metrics.</p>
        </article>
      </div>

      <p>
        Need help? Return <Link to="/">home</Link> to explore the platform overview.
      </p>
    </section>
  );
}
