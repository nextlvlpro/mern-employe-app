const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const appUrl = (process.env.APP_URL || 'https://bluepeak-hr.onrender.com/').replace(/\/$/, '');
const outputDir = path.join(__dirname, '..', 'docs', 'tour');
const videoFile = path.join(outputDir, 'bluepeak-admin-tour.webm');
const subtitleFile = path.join(outputDir, 'bluepeak-admin-tour.vtt');
const playerFile = path.join(outputDir, 'bluepeak-admin-tour.html');

const captions = [];
let startedAt = 0;

async function setCaption(page, text) {
  const currentTime = (Date.now() - startedAt) / 1000;
  const lastCaption = captions[captions.length - 1];
  if (lastCaption) {
    lastCaption.end = currentTime;
  }

  captions.push({ start: currentTime, end: currentTime + 2, text });
  await ensureCaptionOverlay(page);
  await page.evaluate((captionText) => {
    document.querySelector('#tour-caption').textContent = captionText;
  }, text);
}

async function pause(ms = 2300) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function goto(page, route, caption) {
  await page.goto(`${appUrl}${route}`, { waitUntil: 'networkidle', timeout: 45000 });
  await setCaption(page, caption);
  await pause();
}

async function ensureCaptionOverlay(page) {
  const hasCaption = await page.locator('#tour-caption').count();
  if (hasCaption === 1) {
    return;
  }

  await prepareCaptionOverlay(page);
}

async function prepareCaptionOverlay(page) {
  await page.addStyleTag({
    content: `
      #tour-caption {
        background: rgba(15, 23, 42, 0.88);
        border-radius: 8px;
        bottom: 26px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
        font-weight: 700;
        left: 50%;
        line-height: 1.35;
        max-width: 920px;
        padding: 14px 20px;
        position: fixed;
        text-align: center;
        transform: translateX(-50%);
        width: max-content;
        z-index: 99999;
      }
    `
  });
  await page.evaluate(() => {
    document.querySelectorAll('#tour-caption').forEach((element) => element.remove());
    const caption = document.createElement('div');
    caption.id = 'tour-caption';
    document.body.appendChild(caption);
  });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: outputDir,
      size: { width: 1366, height: 768 }
    },
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();
  startedAt = Date.now();

  await page.goto(`${appUrl}/login`, { waitUntil: 'networkidle', timeout: 60000 });
  await prepareCaptionOverlay(page);
  await setCaption(page, 'BluePeak HR starts with a secure login page and demo role options.');
  await pause();

  await page.fill('input[type="email"]', 'admin@example.com');
  await page.fill('input[type="password"]', 'password123');
  await setCaption(page, 'Admin login is used to show the complete employee management workflow.');
  await pause(1300);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(/dashboard/, { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  await prepareCaptionOverlay(page);
  await setCaption(page, 'The dashboard gives a quick overview of employees, departments, status, and activity.');
  await pause();

  await goto(page, '/employees', 'The Employees page supports search, filters, pagination, and record actions.');
  await page.getByPlaceholder('Search name, email, department, job title').fill('Engineering');
  await page.getByRole('button', { name: /^Search$/ }).click();
  await page.waitForLoadState('networkidle');
  await setCaption(page, 'Search helps users find employee records by name, email, department, or job title.');
  await pause();

  await goto(page, '/employees/new', 'The Add Employee page keeps employee creation separate from the list view.');
  await goto(page, '/employees/import', 'CSV import allows multiple employees to be added with validation.');
  await goto(page, '/departments', 'The Departments page summarizes employee counts department wise.');
  await goto(page, '/users', 'The Users page lets admin manage roles and department access.');
  await goto(page, '/activity', 'The Activity page records important employee and account changes.');
  await goto(page, '/profile', 'The Profile page lets the logged-in user update account details.');

  await setCaption(page, 'This completes the admin tour of the deployed MERN Employee Management System.');
  await pause(2500);

  const video = page.video();
  await context.close();
  await browser.close();

  const tempVideoPath = await video.path();
  fs.copyFileSync(tempVideoPath, videoFile);
  fs.writeFileSync(subtitleFile, buildVtt(captions));
  fs.writeFileSync(playerFile, buildPlayerHtml());

  console.log(`Tour video saved to ${videoFile}`);
  console.log(`Subtitles saved to ${subtitleFile}`);
}

function buildVtt(items) {
  return `WEBVTT\n\n${items.map((item, index) => {
    return `${index + 1}\n${formatTime(item.start)} --> ${formatTime(item.end)}\n${item.text}\n`;
  }).join('\n')}`;
}

function formatTime(seconds) {
  const safeSeconds = Math.max(seconds, 0);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const wholeSeconds = Math.floor(safeSeconds % 60);
  const milliseconds = Math.floor((safeSeconds - Math.floor(safeSeconds)) * 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(wholeSeconds)}.${String(milliseconds).padStart(3, '0')}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function buildPlayerHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BluePeak HR Admin Tour</title>
    <style>
      body { background: #f5f7f9; font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 32px; }
      main { margin: 0 auto; max-width: 980px; }
      video { background: #111827; border-radius: 8px; width: 100%; }
      a { color: #176b7c; font-weight: 700; }
      p { color: #4b5563; }
    </style>
  </head>
  <body>
    <main>
      <h1>BluePeak HR Admin Tour</h1>
      <video controls>
        <source src="bluepeak-admin-tour.webm" type="video/webm" />
      </video>
      <p>Captions are already visible in the video. Subtitle file: <a href="bluepeak-admin-tour.vtt">bluepeak-admin-tour.vtt</a></p>
    </main>
  </body>
</html>`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
