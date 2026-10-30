import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import './Auth.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/login');
    } catch {
      setError('Registration failed. Username may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="rh-auth-page">
        <div className="rh-auth-card">
          <h1 className="rh-auth-title">Create your account</h1>
          <p className="rh-auth-sub">Join Ethiopian Rentals in a few seconds.</p>

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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="rh-auth-input"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="rh-auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="rh-auth-input"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
              <small className="rh-auth-hint">At least 8 characters.</small>
            </div>

            {error && <div className="rh-auth-error" role="alert">{error}</div>}

            <button type="submit" className="rh-auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="rh-auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;