import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

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
        {isAuthenticated() ? (
          <>
            <span className="nav-user">{user?.name}</span>
            <button className="nav-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
