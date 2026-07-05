const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const docsDir = path.join(__dirname, '..', 'docs');
const screenshotsDir = path.join(docsDir, 'screenshots');
const outputPath = path.join(docsDir, 'BluePeak_HR_Project_Presentation.pptx');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Bhanu Sharma';
pptx.subject = 'MERN Stack Employee Management System';
pptx.title = 'BluePeak HR Project Presentation';
pptx.company = 'Chandigarh University';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-US'
};
pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });

const colors = {
  navy: '1E2B36',
  teal: '176B7C',
  gold: 'F2B84B',
  text: '1D2630',
  muted: '627D98',
  light: 'F5F8FA',
  border: 'D9E2EC',
  white: 'FFFFFF'
};

function addHeader(slide, title) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.55,
    fill: { color: colors.navy },
    line: { color: colors.navy }
  });
  slide.addText(title, {
    x: 0.45,
    y: 0.12,
    w: 8.5,
    h: 0.3,
    color: colors.white,
    fontFace: 'Aptos Display',
    fontSize: 14,
    bold: true,
    margin: 0
  });
  slide.addText('MERN Stack Employee Management System', {
    x: 9.1,
    y: 0.14,
    w: 3.8,
    h: 0.25,
    align: 'right',
    color: 'D8E2E8',
    fontSize: 9,
    margin: 0
  });
}

function addFooter(slide) {
  slide.addText('Bhanu Sharma | O24MCA112292 | MCA Full Stack Development', {
    x: 0.45,
    y: 7.18,
    w: 8,
    h: 0.2,
    color: colors.muted,
    fontSize: 8,
    margin: 0
  });
  slide.addText('https://bluepeak-hr.onrender.com', {
    x: 8.4,
    y: 7.18,
    w: 4.45,
    h: 0.2,
    align: 'right',
    color: colors.muted,
    fontSize: 8,
    margin: 0
  });
}

function addBullets(slide, items, x, y, w, h, options = {}) {
  const richText = items.map((item) => ({
    text: item,
    options: {
      bullet: { type: 'bullet' },
      breakLine: true
    }
  }));

  slide.addText(richText, {
    x,
    y,
    w,
    h,
    color: options.color || colors.text,
    fontSize: options.fontSize || 15,
    fit: 'shrink',
    breakLine: false,
    margin: 0.05,
    paraSpaceAfterPt: 8
  });
}

function addCard(slide, title, body, x, y, w, h) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: colors.light },
    line: { color: colors.border, width: 1 }
  });
  slide.addText(title, {
    x: x + 0.18,
    y: y + 0.15,
    w: w - 0.36,
    h: 0.28,
    color: colors.teal,
    fontSize: 14,
    bold: true,
    margin: 0
  });
  slide.addText(body, {
    x: x + 0.18,
    y: y + 0.55,
    w: w - 0.36,
    h: h - 0.68,
    color: colors.text,
    fontSize: 11,
    fit: 'shrink',
    valign: 'mid',
    margin: 0
  });
}

function addScreenshot(slide, fileName, x, y, w, h) {
  const filePath = path.join(screenshotsDir, fileName);
  if (!fs.existsSync(filePath)) {
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y,
      w,
      h,
      fill: { color: colors.light },
      line: { color: colors.border }
    });
    slide.addText(`Screenshot missing: ${fileName}`, {
      x,
      y: y + h / 2 - 0.15,
      w,
      h: 0.3,
      align: 'center',
      color: colors.muted,
      fontSize: 12,
      margin: 0
    });
    return;
  }

  slide.addImage({
    path: filePath,
    x,
    y,
    w,
    h,
    sizing: { type: 'contain', x, y, w, h }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color: 'FFFFFF', transparency: 100 },
    line: { color: colors.border, width: 1 }
  });
}

function createTitleSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.navy };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: colors.navy },
    line: { color: colors.navy }
  });
  slide.addText('BluePeak HR', {
    x: 0.75,
    y: 1.25,
    w: 6.2,
    h: 0.7,
    color: colors.gold,
    fontFace: 'Aptos Display',
    fontSize: 38,
    bold: true,
    margin: 0
  });
  slide.addText('MERN Stack Employee Management System', {
    x: 0.78,
    y: 2.02,
    w: 7.8,
    h: 0.48,
    color: colors.white,
    fontSize: 22,
    bold: true,
    margin: 0
  });
  slide.addText('Project overview and functionality presentation', {
    x: 0.8,
    y: 2.62,
    w: 6.9,
    h: 0.35,
    color: 'D8E2E8',
    fontSize: 15,
    margin: 0
  });
  addCard(slide, 'Student', 'Bhanu Sharma\nEnrollment: O24MCA112292\nMCA Full Stack Development', 0.78, 4.65, 3.5, 1.35);
  addCard(slide, 'Guide', 'Alok Srivastva\nAcademic Year: 2024-2026\nChandigarh University', 4.55, 4.65, 3.5, 1.35);
  addCard(slide, 'Deployment', 'Live on Render\nhttps://bluepeak-hr.onrender.com\nMongoDB Atlas database', 8.32, 4.65, 3.85, 1.35);
}

function createOverviewSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Project Overview');
  addFooter(slide);
  slide.addText('Purpose', { x: 0.55, y: 0.95, w: 4, h: 0.35, color: colors.teal, fontSize: 18, bold: true, margin: 0 });
  slide.addText('BluePeak HR is a web application that helps an organization store, search, secure, and maintain employee records through a browser-based interface.', {
    x: 0.55,
    y: 1.35,
    w: 5.35,
    h: 1,
    color: colors.text,
    fontSize: 16,
    fit: 'shrink',
    margin: 0
  });
  addBullets(slide, [
    'Centralized employee records',
    'JWT-based authentication',
    'Admin, department head, and user roles',
    'Employee CRUD, search, filters, CSV import/export',
    'Activity log and dashboard summaries'
  ], 0.6, 2.65, 5.1, 3.4);
  addScreenshot(slide, '02-admin-dashboard.png', 6.35, 1.05, 6.35, 5.4);
}

function createObjectivesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Objectives And Scope');
  addFooter(slide);
  addCard(slide, 'Database', 'Design MongoDB schemas for users, employees, activity logs, and app settings.', 0.6, 1.0, 3.8, 1.45);
  addCard(slide, 'Backend APIs', 'Develop RESTful APIs with Express for authentication, employees, users, activity, and imports.', 4.75, 1.0, 3.8, 1.45);
  addCard(slide, 'Frontend', 'Create a React interface with separate pages and clear workplace-style navigation.', 8.9, 1.0, 3.8, 1.45);
  addCard(slide, 'Security', 'Use JWT, password hashing, route protection, and role-based access control.', 0.6, 3.0, 3.8, 1.45);
  addCard(slide, 'Testing', 'Verify workflows using build checks, API checks, and Playwright browser testing.', 4.75, 3.0, 3.8, 1.45);
  addCard(slide, 'Deployment', 'Deploy the working MERN application on Render with MongoDB Atlas.', 8.9, 3.0, 3.8, 1.45);
}

function createArchitectureSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'System Architecture');
  addFooter(slide);
  const steps = [
    ['React Frontend', 'Pages, components, services, AuthContext'],
    ['Express Backend', 'Routes, controllers, middleware, validation'],
    ['MongoDB Atlas', 'Users, employees, activity logs, app settings'],
    ['Render', 'Builds React and runs the Node.js service']
  ];
  steps.forEach(([title, body], index) => {
    const x = 0.8 + index * 3.1;
    addCard(slide, title, body, x, 2.05, 2.65, 1.55);
    if (index < steps.length - 1) {
      slide.addText('>', {
        x: x + 2.72,
        y: 2.52,
        w: 0.35,
        h: 0.35,
        color: colors.teal,
        fontSize: 22,
        bold: true,
        margin: 0
      });
    }
  });
  slide.addText('The React app sends API requests to Express. Express validates requests, checks permissions, reads/writes MongoDB data, and serves the built frontend in production.', {
    x: 1.0,
    y: 4.45,
    w: 11.3,
    h: 0.8,
    align: 'center',
    color: colors.text,
    fontSize: 16,
    fit: 'shrink',
    margin: 0
  });
}

function createFeaturesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Main Functionality');
  addFooter(slide);
  addBullets(slide, [
    'Secure login, registration, and profile management',
    'Employee create, read, update, and delete operations',
    'Search by name, email, department, and job title',
    'Department, status, sorting, and row-count filters',
    'CSV import with validation and CSV export',
    'Activity history for employee and account changes'
  ], 0.65, 1.05, 5.25, 5.45);
  addScreenshot(slide, '03-admin-employees.png', 6.25, 1.0, 6.55, 5.55);
}

function createRolesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Role-Based Access Control');
  addFooter(slide);
  addCard(slide, 'Admin', 'Can view and manage all employees and users. Can create users in any department and update roles.', 0.7, 1.0, 3.7, 1.7);
  addCard(slide, 'Department Head', 'Can manage employees and add normal users only inside their own department.', 4.8, 1.0, 3.7, 1.7);
  addCard(slide, 'User', 'Can view employee and user information related to their department in read-only mode.', 8.9, 1.0, 3.7, 1.7);
  addScreenshot(slide, '06-admin-users.png', 0.8, 3.2, 5.9, 3.25);
  addScreenshot(slide, '08-staff-read-only-employees.png', 7.0, 3.2, 5.55, 3.25);
}

function createImportSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'CSV Import And Validation');
  addFooter(slide);
  addScreenshot(slide, '05-import-csv.png', 0.75, 1.05, 6.2, 5.3);
  addBullets(slide, [
    'Bulk employee upload using CSV files',
    'Checks required columns before import',
    'Validates email, phone, department, job title, and status',
    'Shows row-level validation errors',
    'Department heads can import only their own department'
  ], 7.3, 1.25, 5.15, 4.8);
}

function createPagesSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Important Screens');
  addFooter(slide);
  addScreenshot(slide, '01-login-page.png', 0.65, 0.95, 3.85, 2.35);
  addScreenshot(slide, '04-add-employee.png', 4.75, 0.95, 3.85, 2.35);
  addScreenshot(slide, '07-department-head-users.png', 8.85, 0.95, 3.85, 2.35);
  addCard(slide, 'Login', 'Demo accounts for admin, department head, and staff user.', 0.65, 3.65, 3.85, 1.35);
  addCard(slide, 'Add Employee', 'Separate page for creating new records.', 4.75, 3.65, 3.85, 1.35);
  addCard(slide, 'Department Head', 'User creation locked to the head department.', 8.85, 3.65, 3.85, 1.35);
}

function createTestingSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Testing And Verification');
  addFooter(slide);
  addBullets(slide, [
    'Frontend production build completed',
    'Backend JavaScript syntax checks completed',
    'Playwright smoke test covers login and employee workflows',
    'Permission checks verify user and department-head restrictions',
    'Render health endpoint verified after deployment'
  ], 0.8, 1.2, 5.8, 4.8);
  addCard(slide, 'Useful Commands', 'npm run build --prefix client\nnpm run test:e2e\nnode scripts/capture-ui-screenshots.js\nnode scripts/record-admin-tour.js', 7.05, 1.2, 5.2, 2.2);
  addCard(slide, 'Health URL', 'https://bluepeak-hr.onrender.com/api/health', 7.05, 3.8, 5.2, 1.15);
}

function createDeploymentSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Deployment');
  addFooter(slide);
  addCard(slide, 'Platform', 'Render Web Service', 0.75, 1.05, 3.6, 1.25);
  addCard(slide, 'Database', 'MongoDB Atlas', 4.85, 1.05, 3.6, 1.25);
  addCard(slide, 'Repository', 'GitHub: nextlvlpro/mern-employe-app', 8.95, 1.05, 3.6, 1.25);
  addBullets(slide, [
    'Render installs server and client dependencies',
    'Vite builds React production files',
    'Express serves API routes under /api',
    'Express serves React build for browser routes',
    'Startup seed creates safe demo data once'
  ], 0.8, 3.0, 5.75, 3.5);
  addCard(slide, 'Live Application', 'https://bluepeak-hr.onrender.com', 7.1, 3.0, 5.05, 1.25);
  addCard(slide, 'Demo Login', 'admin@example.com\npassword123', 7.1, 4.7, 5.05, 1.25);
}

function createConclusionSlide() {
  const slide = pptx.addSlide();
  addHeader(slide, 'Conclusion And Future Scope');
  addFooter(slide);
  addBullets(slide, [
    'Project fulfills the MERN stack employee management requirements',
    'Application supports secure authentication and role-based workflows',
    'System is deployed and ready for project demonstration',
    'Documentation includes PDFs, screenshots, and tour video'
  ], 0.8, 1.2, 5.9, 3.7);
  addBullets(slide, [
    'Attendance management',
    'Payroll or salary module',
    'Password reset through email',
    'Advanced reports and charts',
    'Profile image upload'
  ], 7.25, 1.2, 4.9, 3.7);
  slide.addText('Thank You', {
    x: 0,
    y: 6.0,
    w: 13.333,
    h: 0.5,
    align: 'center',
    color: colors.teal,
    fontFace: 'Aptos Display',
    fontSize: 28,
    bold: true,
    margin: 0
  });
}

async function main() {
  createTitleSlide();
  createOverviewSlide();
  createObjectivesSlide();
  createArchitectureSlide();
  createFeaturesSlide();
  createRolesSlide();
  createImportSlide();
  createPagesSlide();
  createTestingSlide();
  createDeploymentSlide();
  createConclusionSlide();

  await pptx.writeFile({ fileName: outputPath });
  console.log(`Generated ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
