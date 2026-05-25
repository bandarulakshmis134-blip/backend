import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="page-card">
      <h1>Welcome to Recipe Creator</h1>
      <p>
        This frontend foundation is built for a creator platform where cooks and recipe authors can manage
        recipe content, plan seasonal menus, and explore a clean site structure.
      </p>
      <div className="feature-grid">
        <article>
          <h2>Recipe Planning</h2>
          <p>Mock sections for saved recipes, drafts, and step-by-step cooking guides.</p>
        </article>
        <article>
          <h2>Creator Tools</h2>
          <p>Placeholder pages for login, registration, and creator dashboard workflows.</p>
        </article>
      </div>
      <p>
        Get started by visiting your <Link to="/dashboard">dashboard</Link> or creating an account.
      </p>
    </section>
  );
}
