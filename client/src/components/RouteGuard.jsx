import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="page-card"><p>Checking authentication...</p></div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;

  
}

export function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="page-card"><p>Checking authentication...</p></div>;
  }

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
