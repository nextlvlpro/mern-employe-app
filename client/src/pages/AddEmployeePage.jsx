import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createEmployee } from '../services/employeeService.js';

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canManage = ['admin', 'department_head'].includes(user?.role);
  const lockedDepartment = user?.role === 'department_head' ? user.department : '';

  async function addEmployee(employee) {
    await createEmployee(employee);
    navigate('/employees', { state: { message: 'Employee added successfully' } });
  }

  return (
    <section className="page-section narrow-page">
      <div className="page-heading">
        <div>
          <h2>Add Employee</h2>
          <p>Create a new company employee record.</p>
        </div>
        <Link className="ghost-button" to="/employees">
          <ArrowLeft size={17} /> Back
        </Link>
      </div>

      {!canManage && <p className="error-message">Only admins and department heads can add employees.</p>}
      {canManage && (
        <EmployeeForm
          lockedDepartment={lockedDepartment}
          onSubmit={addEmployee}
          submitLabel="Save Employee"
        />
      )}
    </section>
  );
}
