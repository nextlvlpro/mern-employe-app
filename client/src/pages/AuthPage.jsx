import { Building2, Lock, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const initialForm = {
  name: '',
  email: '',
  password: '',
  adminCode: ''
};

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, register } = useAuth();

  const isRegister = mode === 'register';

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login(form.email, form.password);
      }
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Authentication failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <div className="brand-mark">
          <Building2 size={28} />
        </div>
        <h1>MERN Stack Employee Management System</h1>
        <p>Secure employee records, role-based access, and simple company operations.</p>
      </section>

      <section className="auth-card">
        <div className="segmented-control">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')} type="button">
            <LogIn size={16} /> Login
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')} type="button">
            <UserPlus size={16} /> Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Full name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Bhanu Sharma" required />
            </label>
          )}

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="admin@example.com" required />
          </label>

          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="password123" required minLength={6} />
          </label>

          {isRegister && (
            <label>
              Admin code
              <input name="adminCode" value={form.adminCode} onChange={handleChange} placeholder="Optional" />
            </label>
          )}

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" disabled={busy} type="submit">
            <Lock size={17} /> {busy ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}
