const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = (process.env.APP_URL || 'http://localhost:5173').replace(/\/$/, '');
const outputDir = path.join(__dirname, '..', 'docs', 'screenshots');

const accounts = {
  admin: { email: 'admin@example.com', password: 'password123' },
  head: { email: 'head@example.com', password: 'password123' },
  user: { email: 'user@example.com', password: 'password123' }
};

async function login(page, account) {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[type="email"]', account.email);
  await page.fill('input[type="password"]', account.password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(/dashboard/, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

async function screenshot(page, name) {
  await page.screenshot({
    fullPage: true,
    path: path.join(outputDir, `${name}.png`)
  });
}

async function captureForAccount(browser, account, shots) {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await login(page, account);

  for (const shot of shots) {
    await page.goto(`${baseUrl}${shot.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await screenshot(page, shot.name);
  }

  await context.close();
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const publicContext = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const publicPage = await publicContext.newPage();
  await publicPage.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
  await screenshot(publicPage, '01-login-page');
  await publicContext.close();

  await captureForAccount(browser, accounts.admin, [
    { path: '/dashboard', name: '02-admin-dashboard' },
    { path: '/employees', name: '03-admin-employees' },
    { path: '/employees/new', name: '04-add-employee' },
    { path: '/employees/import', name: '05-import-csv' },
    { path: '/users', name: '06-admin-users' }
  ]);

  await captureForAccount(browser, accounts.head, [
    { path: '/users', name: '07-department-head-users' }
  ]);

  await captureForAccount(browser, accounts.user, [
    { path: '/employees', name: '08-staff-read-only-employees' }
  ]);

  await browser.close();
  console.log(`Screenshots saved to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
