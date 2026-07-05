import { Search, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../services/employeeService.js';
import { getDepartmentSummary } from '../utils/employeeUtils.js';

export default function DepartmentsPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch(() => setError('Unable to load departments'));
  }, []);

  const departments = useMemo(() => {
    return getDepartmentSummary(employees).filter((department) => {
      return department.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [employees, search]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Departments</h2>
          <p>Department-wise employee count and status summary.</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <section className="list-panel">
        <div className="filter-bar department-filter">
          <div className="search-box">
            <Search size={17} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search departments" />
          </div>
        </div>

        <div className="department-grid">
          {departments.map((department) => (
            <article className="department-card" key={department.name}>
              <div className="department-title">
                <Users size={20} />
                <h3>{department.name}</h3>
              </div>
              <strong>{department.total}</strong>
              <span>Total employees</span>
              <div className="mini-counts">
                <small>{department.active} active</small>
                <small>{department.onLeave} on leave</small>
                <small>{department.inactive} inactive</small>
              </div>
              <Link className="ghost-button" to={`/employees?department=${encodeURIComponent(department.name)}`}>
                View employees
              </Link>
            </article>
          ))}
          {!departments.length && <p className="empty-state">No departments found.</p>}
        </div>
      </section>
    </section>
  );
}
