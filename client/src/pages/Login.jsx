import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className="page-card">
      <h1>Login</h1>
      <p>
        Sign in to manage your recipe projects, save content drafts, and prepare your next creator campaign.
      </p>
      <p>This is a placeholder page for future authentication flow.</p>
      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>.
      </p>
    </section>
  );
}
