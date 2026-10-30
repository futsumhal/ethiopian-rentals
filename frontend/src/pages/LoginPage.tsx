import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import './Auth.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="rh-auth-page">
        <div className="rh-auth-card">
          <h1 className="rh-auth-title">Welcome back</h1>
          <p className="rh-auth-sub">Log in to your Ethiopian Rentals account.</p>

          <form onSubmit={handleSubmit}>
            <div className="rh-auth-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="rh-auth-input"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>

            <div className="rh-auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="rh-auth-input"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && <div className="rh-auth-error" role="alert">{error}</div>}

            <button type="submit" className="rh-auth-submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="rh-auth-switch">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;