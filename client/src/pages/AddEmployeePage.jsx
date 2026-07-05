import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm.jsx';
import { createEmployee } from '../services/employeeService.js';

export default function AddEmployeePage() {
  const navigate = useNavigate();

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

      <EmployeeForm onSubmit={addEmployee} submitLabel="Save Employee" />
    </section>
  );
}
