import {
  BriefcaseBusiness,
  Building2,
  Edit3,
  LogOut,
  Plus,
  Search,
  Trash2,
  Users
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
  jobTitle: '',
  status: 'Active'
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const activeCount = useMemo(
    () => employees.filter((employee) => employee.status === 'Active').length,
    [employees]
  );

  const departments = useMemo(
    () => new Set(employees.map((employee) => employee.department)).size,
    [employees]
  );

  const fetchEmployees = async () => {
    setError('');
    const response = await api.get('/employees', { params: { search, status } });
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees().catch((apiError) => {
      setError(apiError.response?.data?.message || 'Unable to load employees');
    });
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, form);
        setMessage('Employee updated successfully');
      } else {
        await api.post('/employees', form);
        setMessage('Employee added successfully');
      }

      resetForm();
      await fetchEmployees();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to save employee');
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee._id);
    setForm({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      jobTitle: employee.jobTitle,
      status: employee.status
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(`Delete ${employee.name}?`);
    if (!confirmed) {
      return;
    }

    setError('');
    setMessage('');

    try {
      await api.delete(`/employees/${employee._id}`);
      setMessage('Employee deleted successfully');
      await fetchEmployees();
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to delete employee');
    }
  };

  const handleFilter = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      await fetchEmployees();
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Employee Operations</span>
          <h1>MERN Stack Employee Management System</h1>
        </div>
        <div className="user-actions">
          <span>{user?.name} - {user?.role}</span>
          <button className="icon-button" onClick={logout} title="Logout" type="button">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <Users size={22} />
          <div>
            <strong>{employees.length}</strong>
            <span>Total employees</span>
          </div>
        </article>
        <article className="stat-card">
          <BriefcaseBusiness size={22} />
          <div>
            <strong>{activeCount}</strong>
            <span>Active employees</span>
          </div>
        </article>
        <article className="stat-card">
          <Building2 size={22} />
          <div>
            <strong>{departments}</strong>
            <span>Departments</span>
          </div>
        </article>
      </section>

      <section className="workspace-grid">
        <form className="form-panel" onSubmit={handleSubmit}>
          <div className="section-heading">
            <h2>{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
            {editingId && <button className="ghost-button" onClick={resetForm} type="button">Cancel</button>}
          </div>

          <div className="form-grid">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              Department
              <input name="department" value={form.department} onChange={handleChange} required />
            </label>
            <label>
              Job title
              <input name="jobTitle" value={form.jobTitle} onChange={handleChange} required />
            </label>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" disabled={busy} type="submit">
            <Plus size={17} /> {busy ? 'Saving...' : editingId ? 'Update employee' : 'Add employee'}
          </button>
        </form>

        <section className="list-panel">
          <div className="section-heading">
            <h2>Employee Records</h2>
          </div>

          <form className="filter-bar" onSubmit={handleFilter}>
            <div className="search-box">
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employees" />
            </div>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="secondary-button" disabled={busy} type="submit">Filter</button>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <strong>{employee.name}</strong>
                      <span>{employee.email}</span>
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.jobTitle}</td>
                    <td><span className={`status-pill ${employee.status.toLowerCase().replaceAll(' ', '-')}`}>{employee.status}</span></td>
                    <td>{employee.phone}</td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-button" onClick={() => handleEdit(employee)} title="Edit employee" type="button">
                          <Edit3 size={16} />
                        </button>
                        <button className="icon-button danger" onClick={() => handleDelete(employee)} title="Delete employee" type="button">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!employees.length && (
                  <tr>
                    <td className="empty-state" colSpan="6">No employee records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
