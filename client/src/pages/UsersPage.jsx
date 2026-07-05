import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getUsers, updateUserRole } from '../services/userService.js';

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to load users');
    }
  }

  async function changeRole(selectedUser, role) {
    setMessage('');
    setError('');

    try {
      await updateUserRole(selectedUser._id, role);
      setMessage('User role updated successfully');
      await loadUsers();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update user role');
    }
  }

  if (user?.role !== 'admin') {
    return (
      <section className="page-section narrow-page">
        <p className="error-message">Only admins can manage users.</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Users</h2>
          <p>Manage registered users and admin access.</p>
        </div>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="list-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((account) => (
                <tr key={account._id}>
                  <td>
                    <strong>{account.name}</strong>
                    {String(account._id) === String(user.id) && <span>Current user</span>}
                  </td>
                  <td>{account.email}</td>
                  <td>
                    <span className="role-chip">
                      <Shield size={14} /> {account.role}
                    </span>
                  </td>
                  <td>{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={account.role}
                      onChange={(event) => changeRole(account, event.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
