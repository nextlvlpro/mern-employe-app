import { BriefcaseBusiness, Building2, Clock, UserPlus, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../services/employeeService.js';
import { getActivityLogs } from '../services/activityService.js';
import { getDepartmentSummary, getStatusSummary } from '../utils/employeeUtils.js';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch(() => setError('Unable to load dashboard data'));
    getActivityLogs(5).then(setActivityLogs).catch(() => {});
  }, []);

  const statusSummary = getStatusSummary(employees);
  const departments = useMemo(() => getDepartmentSummary(employees), [employees]);
  const latestEmployees = employees.slice(0, 5);

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
        <StatCard icon={<Users size={22} />} value={employees.length} label="Total employees" />
        <StatCard icon={<BriefcaseBusiness size={22} />} value={statusSummary.active} label="Active employees" />
        <StatCard icon={<Building2 size={22} />} value={departments.length} label="Departments" />
        <StatCard icon={<Clock size={22} />} value={statusSummary.onLeave} label="On leave" />
      </div>

      <div className="dashboard-grid">
        <section className="list-panel">
          <div className="section-heading">
            <h3>Status Overview</h3>
          </div>
          <div className="status-bars">
            <StatusBar label="Active" value={statusSummary.active} total={employees.length} />
            <StatusBar label="On Leave" value={statusSummary.onLeave} total={employees.length} />
            <StatusBar label="Inactive" value={statusSummary.inactive} total={employees.length} />
          </div>
        </section>

        <section className="list-panel">
          <div className="section-heading">
            <h3>Top Departments</h3>
            <Link className="ghost-button" to="/departments">View all</Link>
          </div>
          <div className="simple-list">
            {departments.slice(0, 5).map((department) => (
              <div className="simple-list-row" key={department.name}>
                <div>
                  <strong>{department.name}</strong>
                  <span>{department.active} active employees</span>
                </div>
                <strong>{department.total}</strong>
              </div>
            ))}
            {!departments.length && <p className="empty-state">No departments found.</p>}
          </div>
        </section>
      </div>

      <section className="list-panel">
        <div className="section-heading">
          <h3>Recent Employees</h3>
          <Link className="ghost-button" to="/employees">View all</Link>
        </div>

        <div className="simple-list">
          {latestEmployees.map((employee) => (
            <Link className="simple-list-row" to={`/employees/${employee._id}`} key={employee._id}>
              <div>
                <strong>{employee.name}</strong>
                <span>{employee.jobTitle} - {employee.department}</span>
              </div>
              <span className={`status-pill ${employee.status.toLowerCase().replaceAll(' ', '-')}`}>
                {employee.status}
              </span>
            </Link>
          ))}
          {!employees.length && <p className="empty-state">No employees added yet.</p>}
        </div>
      </section>

      <section className="list-panel">
        <div className="section-heading">
          <h3>Recent Activity</h3>
          <Link className="ghost-button" to="/activity">View all</Link>
        </div>

        <div className="activity-list compact-activity">
          {activityLogs.map((log) => (
            <article className="activity-row" key={log._id}>
              <div>
                <strong>{log.message}</strong>
                <span>{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            </article>
          ))}
          {!activityLogs.length && <p className="empty-state">No recent activity yet.</p>}
        </div>
      </section>
    </section>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <article className="stat-card">
      {icon}
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}

function StatusBar({ label, value, total }) {
  const width = total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="status-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="bar-track">
        <span style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
