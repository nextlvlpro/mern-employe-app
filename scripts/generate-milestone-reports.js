const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'docs', 'milestones');

const student = {
  name: 'Bhanu Sharma',
  enrollment: 'O24MCA112292',
  course: 'MCA Full Stack Development',
  university: 'Chandigarh University',
  mentor: 'Alok Srivastva',
  academicYear: '2024-2026',
  project: 'MERN Stack Employee Management System',
  repo: 'https://github.com/nextlvlpro/mern-employe-app'
};

const milestones = [
  {
    number: '01',
    file: '01-design-database-schema',
    title: 'Design Database Schema',
    progress: 'Complete',
    statusClass: 'complete',
    action: 'Marked as Complete',
    objective: 'Design the MongoDB database structure required to store users, employees, and activity logs for the employee management system.',
    work: [
      'Created a User schema for account details, email, password hash, role, and timestamps.',
      'Created an Employee schema for name, email, phone, department, job title, status, createdBy, and timestamps.',
      'Created an ActivityLog schema to track important actions such as employee creation, updates, deletion, imports, and role changes.',
      'Used Mongoose models to keep validation and database structure consistent across the backend.'
    ],
    evidence: [
      'server/src/models/User.js',
      'server/src/models/Employee.js',
      'server/src/models/ActivityLog.js'
    ],
    outcome: 'The database schema milestone is complete. The application has structured MongoDB collections for authentication, employee records, and system activity tracking.'
  },
  {
    number: '02',
    file: '02-develop-restful-apis',
    title: 'Develop RESTful APIs',
    progress: 'Complete',
    statusClass: 'complete',
    action: 'Marked as Complete',
    objective: 'Develop RESTful APIs using Node.js and Express.js for authentication, employee management, CSV import, users, and activity logs.',
    work: [
      'Implemented authentication APIs for register, login, current user, and profile update.',
      'Implemented employee CRUD APIs for create, list, detail, update, and delete operations.',
      'Implemented bulk employee import API with validation for CSV records.',
      'Implemented activity log API and admin user role management API.',
      'Added error handling, protected routes, and role-based middleware.'
    ],
    evidence: [
      'server/src/routes/authRoutes.js',
      'server/src/routes/employeeRoutes.js',
      'server/src/routes/userRoutes.js',
      'server/src/routes/activityRoutes.js',
      'server/src/controllers'
    ],
    outcome: 'The RESTful API milestone is complete. Backend services are available for all major modules required by the project.'
  },
  {
    number: '03',
    file: '03-create-front-end-interface',
    title: 'Create Front-End Interface',
    progress: 'Complete',
    statusClass: 'complete',
    action: 'Marked as Complete',
    objective: 'Create a user-friendly React interface for interacting with the backend employee management services.',
    work: [
      'Built a company-style interface using the BluePeak HR / PeopleDesk branding.',
      'Created separate pages for dashboard, employees, add employee, edit employee, employee details, departments, CSV import, activity, profile, and users.',
      'Added collapsible sticky sidebar navigation and responsive layouts.',
      'Added employee search, filters, sorting, pagination, CSV export, and CSV import preview screens.',
      'Added deployment route fallbacks for Vercel and Netlify refresh support.'
    ],
    evidence: [
      'client/src/App.jsx',
      'client/src/components',
      'client/src/pages',
      'client/src/styles.css',
      'client/vite.config.js'
    ],
    outcome: 'The frontend milestone is complete. The application provides a practical, multi-page interface suitable for company employee management.'
  },
  {
    number: '04',
    file: '04-implement-authentication',
    title: 'Implement Authentication',
    progress: 'Complete',
    statusClass: 'complete',
    action: 'Marked as Complete',
    objective: 'Implement secure user authentication and authorization using JWT tokens and role-based access control.',
    work: [
      'Implemented user registration and login with JWT token generation.',
      'Stored passwords securely using bcrypt hashing.',
      'Added route protection middleware for private APIs.',
      'Added admin/user role handling and admin-only user management.',
      'Added protected frontend routes and persistent login handling with reload failsafes.'
    ],
    evidence: [
      'server/src/controllers/authController.js',
      'server/src/middleware/auth.js',
      'server/src/utils/generateToken.js',
      'client/src/context/AuthContext.jsx',
      'client/src/App.jsx'
    ],
    outcome: 'The authentication milestone is complete. Users can securely log in, access protected routes, and use role-based features.'
  },
  {
    number: '05',
    file: '05-conduct-testing',
    title: 'Conduct Testing',
    progress: 'Complete',
    statusClass: 'complete',
    action: 'Marked as Complete',
    objective: 'Verify that the application works correctly through build checks, API validation, npm audits, and browser-based testing.',
    work: [
      'Ran frontend production build checks using Vite.',
      'Ran backend JavaScript syntax checks.',
      'Ran npm audits for client and server dependencies.',
      'Added Playwright smoke testing for login, dashboard, employee CRUD, search, employee details reload, departments, CSV import validation, and cleanup.',
      'Added a repeatable npm command for end-to-end testing.'
    ],
    evidence: [
      'tests/playwright-smoke.js',
      'package.json test:e2e script',
      'docs/API_TEST_CASES.md',
      'docs/SUBMISSION_CHECKLIST.md'
    ],
    outcome: 'The testing milestone is complete. The project includes repeatable verification steps and a Playwright smoke test for major workflows.'
  },
  {
    number: '06',
    file: '06-deploy-application',
    title: 'Deploy Application',
    progress: 'Ready / Pending Deployment',
    statusClass: 'pending',
    action: 'Ready for Deployment',
    objective: 'Prepare the MERN application for cloud deployment using MongoDB Atlas, Render, and Vercel or Netlify.',
    work: [
      'Prepared MongoDB Atlas connection instructions.',
      'Prepared Render backend deployment configuration using render.yaml.',
      'Prepared Vercel and Netlify frontend refresh fallback files.',
      'Added deployment documentation with required environment variables and build commands.',
      'Kept local and production environment values separate using .env.example files.'
    ],
    evidence: [
      'docs/DEPLOYMENT.md',
      'render.yaml',
      'client/vercel.json',
      'client/public/_redirects',
      'server/.env.example',
      'client/.env.example'
    ],
    outcome: 'The deployment milestone is ready but pending final cloud deployment. Final deployed URLs should be added after Render and Vercel/Netlify deployment are completed.'
  }
];

fs.mkdirSync(outputDir, { recursive: true });

milestones.forEach((milestone) => {
  const html = buildHtml(milestone);
  fs.writeFileSync(path.join(outputDir, `${milestone.file}.html`), html);
});

function buildHtml(milestone) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(milestone.title)} - Milestone Report</title>
    <style>
      @page { size: A4; margin: 20mm; }
      * { box-sizing: border-box; }
      body {
        color: #1f2933;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.55;
        margin: 0;
      }
      .header {
        border-bottom: 3px solid #176b7c;
        margin-bottom: 22px;
        padding-bottom: 16px;
      }
      .eyebrow {
        color: #176b7c;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      h1 {
        color: #102a43;
        font-size: 27px;
        line-height: 1.15;
        margin: 8px 0 8px;
      }
      h2 {
        color: #102a43;
        font-size: 17px;
        margin: 22px 0 10px;
      }
      p { margin: 0 0 10px; }
      .details {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
        margin-top: 15px;
      }
      .detail {
        background: #f5f8fa;
        border: 1px solid #d9e2ec;
        border-radius: 6px;
        padding: 10px 12px;
      }
      .detail span {
        color: #627d98;
        display: block;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .detail strong {
        color: #102a43;
        display: block;
        font-size: 13px;
        margin-top: 3px;
      }
      .status-row {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;
        margin-top: 12px;
      }
      .status-box {
        border: 1px solid #d9e2ec;
        border-radius: 6px;
        padding: 12px;
      }
      .status-box span {
        color: #627d98;
        display: block;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .status-box strong {
        display: block;
        margin-top: 4px;
      }
      .pill {
        border-radius: 999px;
        display: inline-block;
        font-size: 10px;
        font-weight: 700;
        padding: 4px 9px;
        text-transform: uppercase;
      }
      .complete { background: #e3f8ec; color: #166534; }
      .pending { background: #fff7d6; color: #92400e; }
      ul {
        margin: 8px 0 0 18px;
        padding: 0;
      }
      li { margin-bottom: 6px; }
      table {
        border-collapse: collapse;
        margin-top: 10px;
        width: 100%;
      }
      td {
        border: 1px solid #d9e2ec;
        padding: 9px 10px;
        vertical-align: top;
      }
      tr:nth-child(even) td { background: #f8fafc; }
      .note {
        background: #eef7f9;
        border-left: 4px solid #176b7c;
        margin-top: 18px;
        padding: 12px;
      }
      .signature {
        display: grid;
        gap: 28px;
        grid-template-columns: 1fr 1fr;
        margin-top: 40px;
      }
      .line {
        border-top: 1px solid #9fb3c8;
        padding-top: 8px;
      }
    </style>
  </head>
  <body>
    <section class="header">
      <div class="eyebrow">Milestone ${milestone.number} Report</div>
      <h1>${escapeHtml(milestone.title)}</h1>
      <p><strong>Project:</strong> ${escapeHtml(student.project)}</p>
      <div class="details">
        ${detail('Student Name', student.name)}
        ${detail('Enrollment Number', student.enrollment)}
        ${detail('Course', student.course)}
        ${detail('University', student.university)}
        ${detail('Guide / Mentor', student.mentor)}
        ${detail('Academic Year', student.academicYear)}
      </div>
    </section>

    <h2>Milestone Progress</h2>
    <div class="status-row">
      <div class="status-box">
        <span>Milestone</span>
        <strong>${escapeHtml(milestone.title)}</strong>
      </div>
      <div class="status-box">
        <span>Progress</span>
        <strong><span class="pill ${milestone.statusClass}">${escapeHtml(milestone.progress)}</span></strong>
      </div>
      <div class="status-box">
        <span>Actions / Status</span>
        <strong>${escapeHtml(milestone.action)}</strong>
      </div>
    </div>

    <h2>Objective</h2>
    <p>${escapeHtml(milestone.objective)}</p>

    <h2>Work Completed</h2>
    <ul>
      ${milestone.work.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n      ')}
    </ul>

    <h2>Evidence / Files</h2>
    <table>
      <tbody>
        ${milestone.evidence.map((item) => `<tr><td>${escapeHtml(item)}</td></tr>`).join('\n        ')}
      </tbody>
    </table>

    <h2>Outcome</h2>
    <div class="note">${escapeHtml(milestone.outcome)}</div>

    <h2>Repository</h2>
    <table>
      <tbody>
        <tr>
          <td><strong>GitHub Repository</strong></td>
          <td>${escapeHtml(student.repo)}</td>
        </tr>
      </tbody>
    </table>

    <div class="signature">
      <div class="line">Student Signature<br />${escapeHtml(student.name)}</div>
      <div class="line">Guide / Mentor<br />${escapeHtml(student.mentor)}</div>
    </div>
  </body>
</html>`;
}

function detail(label, value) {
  return `<div class="detail"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
