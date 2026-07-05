const { chromium } = require('playwright');

const appUrl = process.env.APP_URL || 'http://localhost:5173';
const apiUrl = process.env.API_URL || 'http://localhost:5000/api';
const email = process.env.E2E_EMAIL || 'admin@example.com';
const password = process.env.E2E_PASSWORD || 'password123';

async function runSmokeTest() {
  await cleanOldTestEmployees();

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);

  try {
    await page.goto(`${appUrl}/login`);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL(/dashboard/);
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor();

    await page.getByRole('link', { name: /^Employees$/ }).click();
    await page.waitForURL(/employees$/);
    await page.getByRole('heading', { name: 'Employees' }).waitFor();

    await page.goto(`${appUrl}/employees/new`);
    await page.getByRole('heading', { name: 'Add Employee' }).waitFor();

    const employeeName = `Playwright User ${Date.now()}`;
    await page.getByLabel('Full name').fill(employeeName);
    await page.getByLabel('Email').fill(`${employeeName.toLowerCase().replaceAll(' ', '.')}@example.com`);
    await page.getByLabel('Phone').fill('9998887777');
    await page.getByLabel('Department').fill('Quality');
    await page.getByLabel('Job title').fill('QA Tester');
    await page.getByLabel('Status').selectOption('Active');
    await page.getByRole('button', { name: /save employee/i }).click();
    await page.waitForURL(/employees$/);
    await page.getByText(employeeName).waitFor();

    await page.getByPlaceholder('Search name, email, department, job title').fill(employeeName);
    await page.getByRole('button', { name: /^Search$/ }).click();
    await page.getByText(employeeName).waitFor();

    const testRow = page.locator('tr', { hasText: employeeName });
    await testRow.getByTitle('View employee').click();
    await page.waitForURL(/\/employees\/.+$/);
    await page.getByRole('heading', { name: employeeName, level: 2 }).waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: employeeName, level: 2 }).waitFor();

    await page.goto(`${appUrl}/departments`);
    await page.getByRole('heading', { name: 'Departments' }).waitFor();
    await page.getByPlaceholder('Search departments').fill('Quality');
    await page.getByText('Quality').waitFor();

    await page.goto(`${appUrl}/employees?search=${encodeURIComponent(employeeName)}`);
    await page.getByText(employeeName).waitFor();
    await testRow.getByTitle('Edit employee').click();
    await page.waitForURL(/\/employees\/.+\/edit/);
    await page.getByRole('heading', { name: 'Edit Employee' }).waitFor();

    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: 'Edit Employee' }).waitFor();

    await page.getByRole('link', { name: /back/i }).click();
    await page.waitForURL(/employees$/);
    page.on('dialog', (dialog) => dialog.accept());
    await page.locator('tr', { hasText: employeeName }).getByTitle('Delete employee').click();
    await page.getByText(employeeName).waitFor({ state: 'detached' });
  } finally {
    await browser.close();
    await cleanOldTestEmployees();
  }

  console.log('Playwright smoke test passed');
}

async function cleanOldTestEmployees() {
  const loginResponse = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const loginData = await loginResponse.json();
  const employeesResponse = await fetch(`${apiUrl}/employees`, {
    headers: { Authorization: `Bearer ${loginData.token}` }
  });

  const employees = await employeesResponse.json();
  const testEmployees = employees.filter((employee) => employee.name.startsWith('Playwright User'));

  await Promise.all(testEmployees.map((employee) => {
    return fetch(`${apiUrl}/employees/${employee._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${loginData.token}` }
    });
  }));
}

runSmokeTest().catch((error) => {
  console.error(error);
  process.exit(1);
});
