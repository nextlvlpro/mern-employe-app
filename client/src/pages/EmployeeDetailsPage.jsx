import { ArrowLeft, Edit3, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEmployee } from '../services/employeeService.js';

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getEmployee(id)
      .then(setEmployee)
      .catch(() => setError('Employee not found'));
  }, [id]);

  if (error) {
    return (
      <section className="page-section narrow-page">
        <p className="error-message">{error}</p>
        <Link className="ghost-button fit-button" to="/employees">
          <ArrowLeft size={17} /> Back to employees
        </Link>
      </section>
    );
  }

  if (!employee) {
    return <p className="empty-state">Loading employee...</p>;
  }

  return (
    <section className="page-section narrow-page">
      <div className="page-heading">
        <div>
          <h2>{employee.name}</h2>
          <p>{employee.jobTitle} in {employee.department}</p>
        </div>
        <div className="button-row">
          <Link className="ghost-button" to="/employees">
            <ArrowLeft size={17} /> Back
          </Link>
          <Link className="primary-button" to={`/employees/${employee._id}/edit`}>
            <Edit3 size={17} /> Edit
          </Link>
        </div>
      </div>

      <section className="details-card">
        <div className="profile-head">
          <div className="avatar-circle">{employee.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <h3>{employee.name}</h3>
            <span className={`status-pill ${employee.status.toLowerCase().replaceAll(' ', '-')}`}>
              {employee.status}
            </span>
          </div>
        </div>

        <div className="details-grid">
          <Detail label="Department" value={employee.department} />
          <Detail label="Job Title" value={employee.jobTitle} />
          <Detail label="Created By" value={employee.createdBy?.name || 'System'} />
          <Detail label="Created On" value={new Date(employee.createdAt).toLocaleDateString()} />
          <Detail label="Email" value={employee.email} icon={<Mail size={16} />} />
          <Detail label="Phone" value={employee.phone} icon={<Phone size={16} />} />
        </div>
      </section>
    </section>
  );
}

function Detail({ label, value, icon }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{icon}{value}</strong>
    </div>
  );
}
