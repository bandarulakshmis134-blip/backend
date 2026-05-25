import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) return <section className="page-card"><h1>Loading dashboard…</h1></section>;

  return (
    <section className="page-card">
      <h1>Creator Dashboard</h1>
      {user && (
        <p>
          Welcome back, <strong>{user.name}</strong> — <em>{user.email}</em>
        </p>
      )}

      {error && <div className="status-message error">{error}</div>}

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
