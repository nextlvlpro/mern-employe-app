import { Download, FileSpreadsheet, RotateCcw, Search, UserPlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable.jsx';
import { deleteEmployee, getEmployees, getEmployeesPage } from '../services/employeeService.js';
import { downloadEmployeesCsv } from '../utils/employeeUtils.js';

export default function EmployeesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    department: searchParams.get('department') || '',
    sort: searchParams.get('sort') || 'newest',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [error, setError] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');

  const departments = useMemo(() => {
    const names = allEmployees.map((employee) => employee.department);
    return [...new Set(names)].sort();
  }, [allEmployees]);

  useEffect(() => {
    loadEmployees(filters).catch(() => setError('Unable to load employees'));
    getEmployees().then(setAllEmployees).catch(() => {});
  }, []);

  function updateFilter(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  async function loadEmployees(nextFilters) {
    setError('');
    const result = await getEmployeesPage(nextFilters);
    setEmployees(result.data);
    setPagination(result.pagination);
  }

  async function filterEmployees(event) {
    event.preventDefault();

    try {
      const nextFilters = { ...filters, page: 1 };
      setFilters(nextFilters);
      setSearchParams(cleanFilters(nextFilters));
      await loadEmployees(nextFilters);
    } catch {
      setError('Unable to search employees');
    }
  }

  async function clearFilters() {
    const blankFilters = { search: '', status: '', department: '', sort: 'newest', page: 1, limit: 10 };
    setFilters(blankFilters);
    setSearchParams({});
    await loadEmployees(blankFilters);
  }

  async function changePage(page) {
    const nextFilters = { ...filters, page };
    setFilters(nextFilters);
    setSearchParams(cleanFilters(nextFilters));
    await loadEmployees(nextFilters);
  }

  async function removeEmployee(employee) {
    const confirmed = window.confirm(`Delete ${employee.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployee(employee._id);
      setMessage('Employee deleted successfully');
      await loadEmployees(filters);
      const freshEmployees = await getEmployees();
      setAllEmployees(freshEmployees);
    } catch {
      setError('Unable to delete employee');
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h2>Employees</h2>
          <p>Search, update, export, and maintain employee records.</p>
        </div>
        <div className="button-row">
          <Link className="ghost-button" to="/employees/import">
            <FileSpreadsheet size={17} /> Import CSV
          </Link>
          <button className="ghost-button" onClick={() => downloadEmployeesCsv(employees)} type="button">
            <Download size={17} /> Export CSV
          </button>
          <Link className="primary-button" to="/employees/new">
            <UserPlus size={17} /> Add Employee
          </Link>
        </div>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="list-panel">
        <form className="filter-bar employee-filter" onSubmit={filterEmployees}>
          <div className="search-box">
            <Search size={17} />
            <input name="search" value={filters.search} onChange={updateFilter} placeholder="Search name, email, department, job title" />
          </div>
          <select name="department" value={filters.department} onChange={updateFilter}>
            <option value="">All departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
          <select name="status" value={filters.status} onChange={updateFilter}>
            <option value="">All status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select name="sort" value={filters.sort} onChange={updateFilter}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name A-Z</option>
            <option value="department">Department A-Z</option>
          </select>
          <select name="limit" value={filters.limit} onChange={updateFilter}>
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
          </select>
          <button className="secondary-button" type="submit">Search</button>
          <button className="ghost-button" onClick={clearFilters} type="button">
            <RotateCcw size={16} /> Clear
          </button>
        </form>

        <EmployeeTable employees={employees} onDelete={removeEmployee} />
        <div className="pagination-bar">
          <span>
            Showing page {pagination.page} of {pagination.pages} - {pagination.total} records
          </span>
          <div className="button-row">
            <button
              className="ghost-button"
              disabled={pagination.page <= 1}
              onClick={() => changePage(pagination.page - 1)}
              type="button"
            >
              Previous
            </button>
            <button
              className="ghost-button"
              disabled={pagination.page >= pagination.pages}
              onClick={() => changePage(pagination.page + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

function cleanFilters(filters) {
  const params = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params[key] = value;
    }
  });

  return params;
}
