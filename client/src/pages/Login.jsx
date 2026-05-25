import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialState = { email: '', password: '' };

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email.';
    if (!formData.password) errs.password = 'Password is required.';
    return { valid: Object.keys(errs).length === 0, errs };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errs } = validate();
    if (!valid) {
      setStatus('error');
      setMessage(Object.values(errs).join(' '));
      return;
    }

    setStatus('loading');
    setMessage('Signing in...');

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email.trim(), password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.message || 'Login failed');
        return;
      }

      // persist token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setStatus('success');
      setMessage('Login successful — redirecting...');
      navigate('/dashboard');
    } catch (error) {
      setStatus('error');
      setMessage(`Request failed: ${error.message}`);
    }
  };

  return (
    <section className="page-card">
      <h1>Login</h1>
      <p>Sign in to access your dashboard and saved drafts.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Your password" />
        </div>

        <button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Signing in…' : 'Sign in'}</button>
      </form>

      <div className={`status-message ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}>{message}</div>

      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>.
      </p>
    </section>
  );
}
