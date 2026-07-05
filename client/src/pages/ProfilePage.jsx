import { Save } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function saveProfile(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    setError('');

    try {
      await updateProfile({ name, password: password || undefined });
      setPassword('');
      setMessage('Profile updated successfully');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update profile');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page-section narrow-page">
      <div className="page-heading">
        <div>
          <h2>Profile</h2>
          <p>Manage your account details and password.</p>
        </div>
      </div>

      <section className="profile-card">
        <div className="profile-head compact-profile">
          <div className="avatar-circle">{user?.name?.slice(0, 1).toUpperCase()}</div>
          <div>
            <h3>{user?.name}</h3>
            <span>{user?.email}</span>
            <span className="role-label">{user?.role}</span>
          </div>
        </div>

        <form onSubmit={saveProfile}>
          <label>
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            New password
            <input
              value={password}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Leave blank to keep current password"
              type="password"
            />
          </label>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button className="primary-button fit-button" disabled={busy} type="submit">
            <Save size={17} /> {busy ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </section>
    </section>
  );
}
