import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

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
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
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
