import { Building2, Info, Lock, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [showHint, setShowHint] = useState(false);
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
        <div className="auth-title-row">
          <h2>Sign in</h2>
          <button
            className="hint-button"
            onClick={() => setShowHint(!showHint)}
            title="Demo login help"
            type="button"
          >
            <Info size={18} />
          </button>
        </div>

        {showHint && (
          <div className="demo-hint">
            <strong>Demo accounts</strong>
            <p>Admin can manage users and see all employee records.</p>
            <button type="button" onClick={() => { setEmail('admin@example.com'); setPassword('password123'); }}>
              admin@example.com / password123
            </button>
            <p>Staff user has normal role access for comparison.</p>
            <button type="button" onClick={() => { setEmail('user@example.com'); setPassword('password123'); }}>
              user@example.com / password123
            </button>
          </div>
        )}

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
