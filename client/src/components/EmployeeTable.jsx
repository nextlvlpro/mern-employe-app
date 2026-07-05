import { Edit3, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmployeeTable({ employees, onDelete, canManage = false }) {
  return (
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
                <Link className="name-link" to={`/employees/${employee._id}`}>
                  <strong>{employee.name}</strong>
                </Link>
                <span>{employee.email}</span>
              </td>
              <td>{employee.department}</td>
              <td>{employee.jobTitle}</td>
              <td>
                <span className={`status-pill ${employee.status.toLowerCase().replaceAll(' ', '-')}`}>
                  {employee.status}
                </span>
              </td>
              <td>{employee.phone}</td>
              <td>
                <div className="row-actions">
                  <Link className="icon-button" to={`/employees/${employee._id}`} title="View employee">
                    <Eye size={16} />
                  </Link>
                  {canManage && (
                    <>
                      <Link className="icon-button" to={`/employees/${employee._id}/edit`} title="Edit employee">
                        <Edit3 size={16} />
                      </Link>
                      <button className="icon-button danger" onClick={() => onDelete(employee)} title="Delete employee" type="button">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
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
  );
}
