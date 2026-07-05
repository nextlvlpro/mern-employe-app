import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm.jsx';
import { getEmployee, updateEmployee } from '../services/employeeService.js';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getEmployee(id)
      .then(setEmployee)
      .catch(() => setError('Employee not found'));
  }, [id]);

  async function saveEmployee(values) {
    await updateEmployee(id, values);
    navigate('/employees', { state: { message: 'Employee updated successfully' } });
  }

  return (
    <section className="page-section narrow-page">
      <div className="page-heading">
        <div>
          <h2>Edit Employee</h2>
          <p>Update employee contact and work details.</p>
        </div>
        <Link className="ghost-button" to="/employees">
          <ArrowLeft size={17} /> Back
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}
      {!error && !employee && <p className="empty-state">Loading employee...</p>}
      {employee && <EmployeeForm initialValues={employee} onSubmit={saveEmployee} submitLabel="Update Employee" />}
    </section>
  );
}
