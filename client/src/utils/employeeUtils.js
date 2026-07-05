export function getDepartmentSummary(employees) {
  const summary = {};

  employees.forEach((employee) => {
    if (!summary[employee.department]) {
      summary[employee.department] = {
        name: employee.department,
        total: 0,
        active: 0,
        onLeave: 0,
        inactive: 0
      };
    }

    summary[employee.department].total += 1;

    if (employee.status === 'Active') {
      summary[employee.department].active += 1;
    }

    if (employee.status === 'On Leave') {
      summary[employee.department].onLeave += 1;
    }

    if (employee.status === 'Inactive') {
      summary[employee.department].inactive += 1;
    }
  });

  return Object.values(summary).sort((a, b) => a.name.localeCompare(b.name));
}

export function getStatusSummary(employees) {
  return {
    active: employees.filter((employee) => employee.status === 'Active').length,
    onLeave: employees.filter((employee) => employee.status === 'On Leave').length,
    inactive: employees.filter((employee) => employee.status === 'Inactive').length
  };
}

export function downloadEmployeesCsv(employees) {
  const headings = ['Name', 'Email', 'Phone', 'Department', 'Job Title', 'Status'];
  const rows = employees.map((employee) => [
    employee.name,
    employee.email,
    employee.phone,
    employee.department,
    employee.jobTitle,
    employee.status
  ]);

  const csv = [headings, ...rows]
    .map((row) => row.map(formatCsvCell).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'employees.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function formatCsvCell(value) {
  const text = String(value || '');
  return `"${text.replaceAll('"', '""')}"`;
}
