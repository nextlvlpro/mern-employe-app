import { Building2, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', adminCode: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitRegister(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await register(form);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Registration failed');
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
        <p>Create your staff account and start managing employee records.</p>
      </section>

      <section className="auth-card">
        <h2>Create account</h2>
        <form onSubmit={submitRegister}>
          <label>
            Full name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={updateField} type="email" required />
          </label>
          <label>
            Password
            <input name="password" value={form.password} onChange={updateField} type="password" required minLength={6} />
          </label>
          <label>
            Admin code
            <input name="adminCode" value={form.adminCode} onChange={updateField} placeholder="Optional" />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" disabled={busy} type="submit">
            <Lock size={17} /> {busy ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="auth-link">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
