import { Save, Shield, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingState from '../components/LoadingState.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createUser, getUsers, updateUserRole } from '../services/userService.js';

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(getBlankUser(user));
  const [edits, setEdits] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const isAdmin = user?.role === 'admin';
  const canAddUsers = ['admin', 'department_head'].includes(user?.role);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to load users');
    } finally {
      setLoading(false);
    }
  }

  function updateNewUser(event) {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  }

  function updateEdit(id, field, value) {
    setEdits({
      ...edits,
      [id]: {
        ...(edits[id] || {}),
        [field]: value
      }
    });
  }

  async function addUser(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const payload = {
      ...newUser,
      role: isAdmin ? newUser.role : 'user',
      department: isAdmin ? newUser.department : user.department
    };

    try {
      await createUser(payload);
      setNewUser(getBlankUser(user));
      setMessage('User added successfully');
      await loadUsers();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to add user');
    } finally {
      setSaving(false);
    }
  }

  async function saveRole(account) {
    setMessage('');
    setError('');

    const nextRole = edits[account._id]?.role || account.role;
    const nextDepartment = edits[account._id]?.department || account.department;

    try {
      await updateUserRole(account._id, nextRole, nextDepartment);
      setMessage('User access updated successfully');
      await loadUsers();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to update user access');
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Users</h2>
          <p>{isAdmin ? 'Manage all application users.' : `Users in ${user?.department || 'your department'}.`}</p>
        </div>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {!canAddUsers && <p className="permission-note">Read-only directory for your department.</p>}

      {canAddUsers && (
        <section className="form-panel">
          <div className="section-heading">
            <h3>Add User</h3>
          </div>
          <form onSubmit={addUser}>
            <div className="form-grid user-form-grid">
              <label>
                Full name
                <input name="name" value={newUser.name} onChange={updateNewUser} required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={newUser.email} onChange={updateNewUser} required />
              </label>
              <label>
                Password
                <input name="password" minLength="6" type="password" value={newUser.password} onChange={updateNewUser} required />
              </label>
              <label>
                Role
                {isAdmin ? (
                  <select name="role" value={newUser.role} onChange={updateNewUser}>
                    <option value="user">user</option>
                    <option value="department_head">department_head</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  <input disabled value="user" />
                )}
              </label>
              <label>
                Department
                <input
                  disabled={!isAdmin}
                  name="department"
                  value={isAdmin ? newUser.department : user?.department || ''}
                  onChange={updateNewUser}
                  required
                />
              </label>
            </div>

            <button className="primary-button fit-button" disabled={saving} type="submit">
              <UserPlus size={17} /> {saving ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </section>
      )}

      <section className="list-panel">
        {loading && <LoadingState message="Loading users..." />}
        {!loading && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Joined</th>
                  {isAdmin && <th>Access</th>}
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
                    <td>{account.department || 'General'}</td>
                    <td>{new Date(account.createdAt).toLocaleDateString()}</td>
                    {isAdmin && (
                      <td>
                        <div className="inline-access-form">
                          <select
                            value={edits[account._id]?.role || account.role}
                            onChange={(event) => updateEdit(account._id, 'role', event.target.value)}
                          >
                            <option value="user">user</option>
                            <option value="department_head">department_head</option>
                            <option value="admin">admin</option>
                          </select>
                          <input
                            value={edits[account._id]?.department || account.department || 'General'}
                            onChange={(event) => updateEdit(account._id, 'department', event.target.value)}
                            placeholder="Department"
                          />
                          <button className="icon-button" onClick={() => saveRole(account)} title="Save access" type="button">
                            <Save size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {!users.length && (
                  <tr>
                    <td className="empty-state" colSpan={isAdmin ? '6' : '5'}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}

function getBlankUser(user) {
  return {
    name: '',
    email: '',
    password: '',
    role: 'user',
    department: user?.role === 'department_head' ? user.department : 'General'
  };
}
