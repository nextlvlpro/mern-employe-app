const requiredHeaders = ['name', 'email', 'phone', 'department', 'jobTitle'];
const allowedStatuses = ['Active', 'On Leave', 'Inactive'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{7,20}$/;

const headerMap = {
  name: 'name',
  fullname: 'name',
  full_name: 'name',
  email: 'email',
  phone: 'phone',
  contact: 'phone',
  mobilenumber: 'phone',
  mobile: 'phone',
  department: 'department',
  jobtitle: 'jobTitle',
  job_title: 'jobTitle',
  title: 'jobTitle',
  status: 'status'
};

export function parseEmployeeCsv(csvText) {
  const rows = csvText
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map(parseCsvRow);

  if (rows.length < 2) {
    return {
      employees: [],
      errors: [{ row: 1, errors: ['CSV must include a header row and at least one employee row'] }]
    };
  }

  const headers = rows[0].map(normalizeHeader);
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));

  if (missingHeaders.length) {
    return {
      employees: [],
      errors: [{ row: 1, errors: [`Missing columns: ${missingHeaders.join(', ')}`] }]
    };
  }

  const seenEmails = new Set();
  const employees = [];
  const errors = [];

  rows.slice(1).forEach((values, index) => {
    const rowNumber = index + 2;
    const employee = buildEmployee(headers, values);
    const rowErrors = validateCsvEmployee(employee);

    if (employee.email && seenEmails.has(employee.email.toLowerCase())) {
      rowErrors.push('Duplicate email in CSV');
    }

    if (employee.email) {
      seenEmails.add(employee.email.toLowerCase());
    }

    if (rowErrors.length) {
      errors.push({ row: rowNumber, email: employee.email, errors: rowErrors });
      return;
    }

    employees.push(employee);
  });

  return { employees, errors };
}

export function getSampleCsv() {
  return [
    'name,email,phone,department,jobTitle,status',
    'Ananya Rao,ananya.rao@example.com,9876543201,Engineering,Backend Developer,Active',
    'Vikram Singh,vikram.singh@example.com,9876543202,Sales,Sales Executive,On Leave'
  ].join('\n');
}

function parseCsvRow(row) {
  const values = [];
  let current = '';
  let insideQuotes = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];
    const nextCharacter = row[index + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      current += '"';
      index += 1;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === ',' && !insideQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += character;
    }
  }

  values.push(current.trim());
  return values;
}

function normalizeHeader(header) {
  const key = header.toLowerCase().replaceAll(' ', '').replaceAll('-', '').trim();
  return headerMap[key] || headerMap[header.toLowerCase().trim()] || key;
}

function buildEmployee(headers, values) {
  const employee = {};

  headers.forEach((header, index) => {
    employee[header] = values[index] || '';
  });

  return {
    name: String(employee.name || '').trim(),
    email: String(employee.email || '').trim().toLowerCase(),
    phone: String(employee.phone || '').trim(),
    department: String(employee.department || '').trim(),
    jobTitle: String(employee.jobTitle || '').trim(),
    status: String(employee.status || 'Active').trim()
  };
}

function validateCsvEmployee(employee) {
  const errors = [];

  if (!employee.name) {
    errors.push('Name is required');
  }

  if (!emailPattern.test(employee.email)) {
    errors.push('Valid email is required');
  }

  if (!phonePattern.test(employee.phone)) {
    errors.push('Valid phone number is required');
  }

  if (!employee.department) {
    errors.push('Department is required');
  }

  if (!employee.jobTitle) {
    errors.push('Job title is required');
  }

  if (!allowedStatuses.includes(employee.status)) {
    errors.push('Status must be Active, On Leave, or Inactive');
  }

  return errors;
}
