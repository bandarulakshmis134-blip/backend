import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <section className="page-card">
      <h1>Register</h1>
      <p>
        Join Recipe Creator to build, publish, and organize your recipes in a modern creator workspace.
      </p>
      <p>This page is intentionally static while backend authentication is added later.</p>
      <p>
        Already a creator? <Link to="/login">Login</Link> instead.
      </p>
    </section>
  );
}
