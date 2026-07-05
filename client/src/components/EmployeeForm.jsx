import { Save } from 'lucide-react';
import { useState } from 'react';

const blankEmployee = {
  name: '',
  email: '',
  phone: '',
  department: '',
  jobTitle: '',
  status: 'Active'
};

export default function EmployeeForm({ initialValues, onSubmit, submitLabel }) {
  const [employee, setEmployee] = useState(initialValues || blankEmployee);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function updateField(event) {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  }

  async function saveEmployee(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await onSubmit(employee);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to save employee');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form-panel" onSubmit={saveEmployee}>
      <div className="form-grid two-columns">
        <label>
          Full name
          <input name="name" value={employee.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={employee.email} onChange={updateField} required />
        </label>
        <label>
          Phone
          <input name="phone" value={employee.phone} onChange={updateField} required />
        </label>
        <label>
          Department
          <input name="department" value={employee.department} onChange={updateField} required />
        </label>
        <label>
          Job title
          <input name="jobTitle" value={employee.jobTitle} onChange={updateField} required />
        </label>
        <label>
          Status
          <select name="status" value={employee.status} onChange={updateField}>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
        </label>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="primary-button" disabled={busy} type="submit">
        <Save size={17} /> {busy ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
