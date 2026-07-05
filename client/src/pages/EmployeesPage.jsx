import { Search, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable.jsx';
import { deleteEmployee, getEmployees } from '../services/employeeService.js';

export default function EmployeesPage() {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');

  async function loadEmployees(filters = {}) {
    setError('');
    const data = await getEmployees(filters);
    setEmployees(data);
  }

  useEffect(() => {
    loadEmployees().catch(() => setError('Unable to load employees'));
  }, []);

  async function filterEmployees(event) {
    event.preventDefault();

    try {
      await loadEmployees({ search, status });
    } catch {
      setError('Unable to filter employees');
    }
  }

  async function removeEmployee(employee) {
    const confirmed = window.confirm(`Delete ${employee.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployee(employee._id);
      setMessage('Employee deleted successfully');
      await loadEmployees({ search, status });
    } catch {
      setError('Unable to delete employee');
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Employees</h2>
          <p>Search, update, and maintain employee records.</p>
        </div>
        <Link className="primary-button" to="/employees/new">
          <UserPlus size={17} /> Add Employee
        </Link>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="list-panel">
        <form className="filter-bar" onSubmit={filterEmployees}>
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
          <button className="secondary-button" type="submit">Filter</button>
        </form>

        <EmployeeTable employees={employees} onDelete={removeEmployee} />
      </section>
    </section>
  );
}
