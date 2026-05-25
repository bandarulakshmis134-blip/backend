import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-card">
      <h1>404 — Page Not Found</h1>
      <p>
        The page you are looking for does not exist yet. Use the navigation links above to continue exploring the creator platform.
      </p>
      <p>
        Return <Link to="/">home</Link> to see the main landing page.
      </p>
    </section>
  );
}
