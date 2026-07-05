const { chromium } = require('playwright');

const appUrl = process.env.APP_URL || 'http://localhost:5173';
const email = process.env.E2E_EMAIL || 'admin@example.com';
const password = process.env.E2E_PASSWORD || 'password123';

async function runSmokeTest() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);

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

  const testRow = page.locator('tr', { hasText: employeeName });
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

  await browser.close();
  console.log('Playwright smoke test passed');
}

runSmokeTest().catch((error) => {
  console.error(error);
  process.exit(1);
});
