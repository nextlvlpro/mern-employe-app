import { ArrowLeft, Download, FileSpreadsheet, Upload } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bulkCreateEmployees } from '../services/employeeService.js';
import { getSampleCsv, parseEmployeeCsv } from '../utils/csvImport.js';

export default function ImportEmployeesPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [validRows, setValidRows] = useState([]);
  const [rowErrors, setRowErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function readCsvFile(event) {
    const file = event.target.files?.[0];
    setMessage('');
    setError('');
    setValidRows([]);
    setRowErrors([]);

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please choose a CSV file');
      return;
    }

    const text = await file.text();
    const result = parseEmployeeCsv(text);
    setFileName(file.name);
    setValidRows(result.employees);
    setRowErrors(result.errors);
  }

  async function importEmployees() {
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const result = await bulkCreateEmployees(validRows);

      if (result.errors?.length) {
        setRowErrors(result.errors);
        setMessage(`${result.created} employees imported. ${result.skipped} rows skipped.`);
        return;
      }

      navigate('/employees', {
        state: { message: `${result.created} employees imported successfully` }
      });
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to import employees');
    } finally {
      setBusy(false);
    }
  }

  function downloadSample() {
    const blob = new Blob([getSampleCsv()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'employee-import-sample.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Import Employees</h2>
          <p>Upload a CSV file to add multiple employees at once.</p>
        </div>
        <div className="button-row">
          <button className="ghost-button" onClick={downloadSample} type="button">
            <Download size={17} /> Sample CSV
          </button>
          <Link className="ghost-button" to="/employees">
            <ArrowLeft size={17} /> Back
          </Link>
        </div>
      </div>

      <section className="import-panel">
        <div className="upload-box">
          <FileSpreadsheet size={34} />
          <div>
            <strong>{fileName || 'Choose employee CSV file'}</strong>
            <span>Required columns: name, email, phone, department, jobTitle, status</span>
          </div>
          <label className="primary-button file-button">
            <Upload size={17} /> Choose CSV
            <input accept=".csv,text/csv" onChange={readCsvFile} type="file" />
          </label>
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="import-summary">
          <article>
            <strong>{validRows.length}</strong>
            <span>valid rows</span>
          </article>
          <article>
            <strong>{rowErrors.length}</strong>
            <span>rows with errors</span>
          </article>
        </div>

        <button className="primary-button fit-button" disabled={!validRows.length || busy} onClick={importEmployees} type="button">
          <Upload size={17} /> {busy ? 'Importing...' : 'Import Valid Rows'}
        </button>
      </section>

      {!!validRows.length && (
        <section className="list-panel">
          <div className="section-heading">
            <h3>Valid Preview</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {validRows.slice(0, 10).map((employee) => (
                  <tr key={employee.email}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.jobTitle}</td>
                    <td>{employee.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {!!rowErrors.length && (
        <section className="list-panel">
          <div className="section-heading">
            <h3>Validation Errors</h3>
          </div>
          <div className="error-list">
            {rowErrors.map((rowError) => (
              <div className="error-row" key={`${rowError.row}-${rowError.email}`}>
                <strong>Row {rowError.row}</strong>
                <span>{rowError.email || 'No email'}</span>
                <p>{rowError.errors.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
