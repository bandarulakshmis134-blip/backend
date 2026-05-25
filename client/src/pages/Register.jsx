import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('Fill out the form to create your account.');

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      setStatus('error');
      setMessage('Please fix the highlighted fields before submitting.');
      return;
    }

    setStatus('loading');
    setMessage('Registering your account...');

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || 'Registration failed.');
        return;
      }

      setStatus('success');
      setMessage('Registration successful! You can now log in.');
      setFormData(initialState);
      setErrors({});
    } catch (error) {
      setStatus('error');
      setMessage(`Request failed: ${error.message}`);
    }
  };

  return (
    <section className="page-card">
      <h1>Register</h1>
      <p>
        Join Recipe Creator to build, publish, and organize your recipes in a modern creator workspace.
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a secure password"
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
          />
          {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registering…' : 'Create account'}
        </button>
      </form>

      <div className={`status-message ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}>
        {message}
      </div>

      <p>
        Already a creator? <Link to="/login">Login</Link> instead.
      </p>
    </section>
  );
}
