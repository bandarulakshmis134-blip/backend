import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <Link to="/">Recipe Creator</Link>
      </div>
      <nav className="site-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
    </header>
  );
}
