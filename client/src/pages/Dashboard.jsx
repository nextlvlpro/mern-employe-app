import { BriefcaseBusiness, Building2, UserPlus, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../services/employeeService.js';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch(() => setError('Unable to load dashboard data'));
  }, []);

  const activeCount = employees.filter((employee) => employee.status === 'Active').length;

  const departmentCount = useMemo(() => {
    const departments = employees.map((employee) => employee.department);
    return new Set(departments).size;
  }, [employees]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Dashboard</h2>
          <p>Quick view of company employee records.</p>
        </div>
        <Link className="primary-button" to="/employees/new">
          <UserPlus size={17} /> Add Employee
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="stats-grid">
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
            <strong>{departmentCount}</strong>
            <span>Departments</span>
          </div>
        </article>
      </div>

      <section className="list-panel">
        <div className="section-heading">
          <h3>Recent Employees</h3>
          <Link className="ghost-button" to="/employees">View all</Link>
        </div>

        <div className="simple-list">
          {employees.slice(0, 5).map((employee) => (
            <div className="simple-list-row" key={employee._id}>
              <div>
                <strong>{employee.name}</strong>
                <span>{employee.jobTitle}</span>
              </div>
              <span className={`status-pill ${employee.status.toLowerCase().replaceAll(' ', '-')}`}>
                {employee.status}
              </span>
            </div>
          ))}
          {!employees.length && <p className="empty-state">No employees added yet.</p>}
        </div>
      </section>
    </section>
  );
}
