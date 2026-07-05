import { Building2, Lock, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submitLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await login(email, password);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <div className="brand-mark">
          <Building2 size={28} />
        </div>
        <h1>BluePeak HR</h1>
        <p>Employee records and daily HR work in one clean dashboard.</p>
      </section>

      <section className="auth-card">
        <h2>Sign in</h2>
        <form onSubmit={submitLogin}>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" disabled={busy} type="submit">
            <Lock size={17} /> {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-link">
          Need an account? <Link to="/register"><UserPlus size={15} /> Create one</Link>
        </p>
      </section>
    </main>
  );
}
