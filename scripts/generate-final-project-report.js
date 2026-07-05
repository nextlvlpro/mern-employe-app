const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'docs', 'FINAL_PROJECT_REPORT.html');

const student = {
  projectTitle: 'MERN Stack Employee Management System',
  name: 'Bhanu Sharma',
  enrollment: 'O24MCA112292',
  course: 'Master of Computer Application - Full Stack Development',
  university: 'Chandigarh University',
  mentor: 'Alok Srivastva',
  academicYear: '2024-2026',
  date: '05 July 2026',
  repo: 'https://github.com/nextlvlpro/mern-employe-app'
};

const chapters = [
  {
    title: 'Chapter 1: Introduction',
    body: [
      'Employee data management is an important operational requirement for every organization. Companies need to maintain accurate employee information such as personal contact details, department, job title, employment status, and account-level access. If this data is stored only in spreadsheets or paper records, it becomes difficult to search, update, secure, and audit.',
      'The MERN Stack Employee Management System is a web application developed to solve this problem using MongoDB, Express.js, React, and Node.js. The project provides a secure interface for managing employee records and includes authentication, role-based authorization, search, filtering, CSV import/export, activity tracking, and a dashboard for summary information.',
      'The application uses a company-style interface named BluePeak HR / PeopleDesk so that the project looks and behaves like a real workplace system. Instead of keeping all functionality on a single page, the application is divided into separate pages for dashboard, employees, employee details, add employee, edit employee, departments, CSV import, profile, users, and activity logs.',
      'The main purpose of the project is to demonstrate a complete full-stack workflow: database design, backend API development, frontend implementation, authentication, authorization, testing, documentation, and deployment readiness.'
    ],
    bulletsTitle: 'Objectives',
    bullets: [
      'To design a MongoDB database schema for storing user, employee, and activity log information.',
      'To develop RESTful APIs using Node.js and Express.js.',
      'To create a user-friendly React frontend for interacting with backend services.',
      'To implement JWT authentication and role-based access control.',
      'To provide employee CRUD, search, filtering, pagination, CSV import, and CSV export.',
      'To verify the application using build checks, audits, and Playwright browser testing.',
      'To prepare the application for cloud deployment using MongoDB Atlas, Render, and Vercel or Netlify.'
    ]
  },
  {
    title: 'Chapter 2: System Study',
    body: [
      'The existing manual method of employee record management usually depends on spreadsheets, documents, or scattered files. Such a method may work for a small number of records, but it becomes inefficient when employee data grows. Searching records, maintaining updated information, and controlling access become difficult.',
      'A web-based employee management system improves the situation by centralizing the data in a database and providing a secure interface to authorized users. The proposed system supports structured employee records, quick search, department-wise view, role control, and activity logs.',
      'The system also includes bulk import through CSV files. This is useful when a company already has employee data in spreadsheet format and wants to move it into the application without entering each employee manually.'
    ],
    bulletsTitle: 'Limitations Of Existing System',
    bullets: [
      'Manual record keeping is time-consuming.',
      'Spreadsheet data can be duplicated or accidentally changed.',
      'Searching and filtering employee records is limited.',
      'Access control is weak in file-based systems.',
      'There is no activity history for tracking changes.',
      'Bulk operations and reporting are difficult.'
    ]
  },
  {
    title: 'Chapter 3: System Analysis',
    body: [
      'System analysis identifies the functional and non-functional requirements of the proposed application. The project is designed for users who need to manage employee records securely through a browser-based interface.',
      'The system has two major roles: admin and user. Admin users can manage all employee records and user roles. Normal users can manage records created by them. This role-based design improves privacy and prevents unauthorized access.',
      'The system also validates input data at both frontend and backend levels. CSV import validates required columns, email format, phone format, status values, and duplicate emails before importing records.'
    ],
    bulletsTitle: 'Functional Requirements',
    bullets: [
      'User registration and login.',
      'JWT-based protected routes.',
      'Employee create, read, update, and delete operations.',
      'Employee details page.',
      'Employee search, filter, sort, and pagination.',
      'Bulk employee import using CSV with validation.',
      'Employee export to CSV.',
      'Department-wise employee summary.',
      'User profile management.',
      'Admin user role management.',
      'Activity log tracking.'
    ],
    extraTitle: 'Non-Functional Requirements',
    extraBullets: [
      'The interface should be responsive and easy to use.',
      'Passwords should be stored securely using hashing.',
      'Environment variables should be used for secrets.',
      'The application should be deployable on cloud platforms.',
      'The codebase should be divided into readable modules.',
      'The system should handle reloads and invalid routes gracefully.'
    ]
  },
  {
    title: 'Chapter 4: System Design',
    body: [
      'The system follows a client-server architecture. The React frontend communicates with the Express backend using HTTP requests. The backend connects to MongoDB through Mongoose models. JWT tokens are used to authenticate users and protect private routes.',
      'The frontend is divided into pages, components, services, context, and utilities. The backend is divided into routes, controllers, models, middleware, configuration, utilities, and data scripts. This separation improves maintainability and readability.'
    ],
    tableTitle: 'Database Collections',
    table: [
      ['Collection', 'Purpose', 'Important Fields'],
      ['users', 'Stores application user accounts', 'name, email, password, role, timestamps'],
      ['employees', 'Stores employee records', 'name, email, phone, department, jobTitle, status, createdBy, timestamps'],
      ['activitylogs', 'Stores system activity history', 'action, message, entityType, entityId, user, timestamps']
    ],
    extraTitle: 'Important API Groups',
    extraBullets: [
      'Authentication APIs: register, login, get current user, update profile.',
      'Employee APIs: list, create, details, update, delete, bulk import.',
      'User APIs: admin user list and role update.',
      'Activity APIs: recent activity logs.'
    ]
  },
  {
    title: 'Chapter 5: System Implementation',
    body: [
      'The backend is implemented using Node.js and Express.js. MongoDB is connected through Mongoose. Passwords are hashed using bcryptjs, and JWT tokens are generated during registration and login. Middleware is used for authentication and role authorization.',
      'The frontend is implemented using React and Vite. React Router provides navigation between pages. Axios is used for API communication. Authentication state is handled through a React context that stores the logged-in user and JWT token.',
      'The employee module includes listing, searching, sorting, filtering, pagination, detail view, add form, edit form, delete operation, CSV export, and CSV import. The CSV import page validates data before sending it to the backend and shows row-level errors.',
      'The activity module records important actions such as employee creation, employee update, employee deletion, CSV import, and user role changes. This helps the system look and behave like a real administrative tool.'
    ],
    bulletsTitle: 'Implemented Pages',
    bullets: [
      'Login and register pages.',
      'Dashboard page with statistics, status overview, departments, recent employees, and activity.',
      'Employees page with search, filters, sorting, pagination, export, and actions.',
      'Employee details page.',
      'Add employee and edit employee pages.',
      'CSV import page with validation and sample CSV download.',
      'Departments page.',
      'Profile page.',
      'Admin users page.',
      'Activity log page.'
    ]
  },
  {
    title: 'Chapter 6: Testing',
    body: [
      'Testing was performed to verify that the application works correctly. The frontend production build was tested using Vite. Backend JavaScript files were checked for syntax errors. Client and server dependencies were audited using npm audit.',
      'A Playwright smoke test was added to verify the main browser workflows. The test covers login, dashboard load, employees page, add employee, search, employee detail page reload, departments page, CSV import validation, edit page, delete operation, and cleanup of test records.'
    ],
    tableTitle: 'Testing Summary',
    table: [
      ['Test Area', 'Test Method', 'Result'],
      ['Frontend Build', 'npm run build in client', 'Passed'],
      ['Dependency Audit', 'npm audit for client and server', '0 vulnerabilities'],
      ['Authentication', 'Playwright login flow', 'Passed'],
      ['Employee CRUD', 'Playwright add/edit/delete flow', 'Passed'],
      ['Search And Details', 'Playwright search and details reload', 'Passed'],
      ['CSV Import', 'Valid and invalid row validation', 'Passed'],
      ['Backend APIs', 'Manual API health and login checks', 'Passed']
    ]
  },
  {
    title: 'Chapter 7: Results And Discussion',
    body: [
      'The project successfully implements a full-stack employee management system using the MERN stack. The system provides secure login, employee record management, search, filtering, pagination, CSV import/export, department summary, user profile, admin user management, and activity tracking.',
      'The application is structured in a way that makes it suitable for academic demonstration and future extension. The user interface is not a single-page demo screen; instead, it is divided into meaningful modules with separate URLs.',
      'The final result is a working local application with GitHub source code, documentation, milestone reports, testing support, and deployment instructions.'
    ],
    bulletsTitle: 'Major Outcomes',
    bullets: [
      'Centralized employee record management.',
      'Secure authentication and authorization.',
      'Improved usability with separate pages and a collapsible sidebar.',
      'Bulk CSV import with validation.',
      'Activity logs for administrative tracking.',
      'Testing and documentation support for project submission.'
    ]
  },
  {
    title: 'Chapter 8: Conclusion And Future Scope',
    body: [
      'The MERN Stack Employee Management System meets the major objectives of the project. It demonstrates database design, RESTful API development, frontend implementation, authentication, authorization, testing, and deployment readiness. The system can be used by a company to manage employee information in a structured and secure way.',
      'The project helped demonstrate full-stack development skills using modern web technologies. It also shows how frontend and backend modules can work together through APIs and how security can be added using JWT authentication.'
    ],
    bulletsTitle: 'Future Scope',
    bullets: [
      'Add attendance management.',
      'Add salary and payroll module.',
      'Add employee profile image upload.',
      'Add password reset through email.',
      'Add advanced reports and charts.',
      'Add audit log filters and export.',
      'Add Docker support for deployment.',
      'Deploy the final application on cloud infrastructure.'
    ]
  }
];

const references = [
  'MongoDB Documentation, https://www.mongodb.com/docs/',
  'MongoDB Atlas Documentation, https://www.mongodb.com/docs/atlas/',
  'Mongoose Documentation, https://mongoosejs.com/docs/',
  'Express.js Documentation, https://expressjs.com/',
  'Node.js Documentation, https://nodejs.org/docs/',
  'React Documentation, https://react.dev/',
  'React Router Documentation, https://reactrouter.com/',
  'Vite Documentation, https://vite.dev/',
  'JSON Web Token Introduction, https://jwt.io/introduction',
  'bcryptjs Package Documentation, https://www.npmjs.com/package/bcryptjs',
  'Axios Documentation, https://axios-http.com/',
  'Playwright Documentation, https://playwright.dev/',
  'Render Documentation, https://render.com/docs',
  'Vercel Documentation, https://vercel.com/docs',
  'Netlify Documentation, https://docs.netlify.com/',
  'MDN Web Docs - JavaScript, https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'MDN Web Docs - Fetch and HTTP Concepts, https://developer.mozilla.org/',
  'OWASP Authentication Cheat Sheet, https://cheatsheetseries.owasp.org/',
  'npm Documentation, https://docs.npmjs.com/',
  'GitHub Docs, https://docs.github.com/'
];

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${student.projectTitle} - Project Report</title>
    <style>
      @page { size: A4; margin: 20mm; }
      * { box-sizing: border-box; }
      body {
        color: #1f2933;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.6;
        margin: 0;
      }
      h1, h2, h3 { color: #102a43; line-height: 1.25; }
      h1 { font-size: 28px; margin: 10px 0; }
      h2 { font-size: 20px; margin: 0 0 14px; }
      h3 { font-size: 15px; margin: 18px 0 8px; }
      p { margin: 0 0 10px; text-align: justify; }
      ul { margin: 8px 0 0 18px; padding: 0; }
      li { margin-bottom: 6px; }
      table { border-collapse: collapse; margin: 10px 0 16px; width: 100%; }
      th { background: #176b7c; color: white; padding: 9px; text-align: left; }
      td { border: 1px solid #d9e2ec; padding: 8px 9px; vertical-align: top; }
      tr:nth-child(even) td { background: #f8fafc; }
      .page { page-break-after: always; min-height: 245mm; }
      .page:last-child { page-break-after: auto; }
      .center { text-align: center; }
      .muted { color: #627d98; }
      .title-page {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 245mm;
        text-align: center;
      }
      .title-box {
        border: 2px solid #176b7c;
        padding: 34px;
        width: 100%;
      }
      .label { color: #627d98; font-size: 10px; font-weight: 700; text-transform: uppercase; }
      .details { display: grid; gap: 8px; grid-template-columns: 1fr 1fr; margin-top: 18px; }
      .detail { background: #f5f8fa; border: 1px solid #d9e2ec; border-radius: 6px; padding: 10px; }
      .detail strong, .detail span { display: block; }
      .toc a { color: #102a43; text-decoration: none; }
      .toc-row { border-bottom: 1px dotted #9fb3c8; display: flex; justify-content: space-between; padding: 5px 0; }
      .note { background: #eef7f9; border-left: 4px solid #176b7c; padding: 12px; }
      .signature { display: grid; gap: 40px; grid-template-columns: 1fr 1fr; margin-top: 46px; }
      .line { border-top: 1px solid #9fb3c8; padding-top: 8px; }
      .chapter { page-break-before: always; }
      code { background: #f1f5f9; border-radius: 4px; padding: 1px 4px; }
    </style>
  </head>
  <body>
    ${titlePage()}
    ${certificatePage()}
    ${declarationPage()}
    ${acknowledgementPage()}
    ${abstractPage()}
    ${tocPage()}
    ${chapters.map(chapterHtml).join('\n')}
    ${referencesPage()}
    ${appendixPage()}
  </body>
</html>`;

fs.writeFileSync(outputPath, html);
console.log(`Generated ${outputPath}`);

function titlePage() {
  return `<section class="page title-page">
    <div class="title-box">
      <div class="label">Project Report</div>
      <h1>${escapeHtml(student.projectTitle)}</h1>
      <p class="center">Submitted in partial fulfillment of the requirements for the award of the degree of</p>
      <h2 class="center">Master of Computer Application</h2>
      <p class="center">Full Stack Development</p>
      <div class="details">
        ${detail('Student Name', student.name)}
        ${detail('Enrollment No.', student.enrollment)}
        ${detail('Guide / Mentor', student.mentor)}
        ${detail('Academic Year', student.academicYear)}
        ${detail('University', student.university)}
        ${detail('Repository', student.repo)}
      </div>
    </div>
  </section>`;
}

function certificatePage() {
  return `<section class="page">
    <h2>Certificate</h2>
    <p>This is to certify that the project report titled <strong>${escapeHtml(student.projectTitle)}</strong> has been prepared and submitted by <strong>${escapeHtml(student.name)}</strong>, Enrollment No. <strong>${escapeHtml(student.enrollment)}</strong>, in partial fulfillment of the requirements for the award of the degree of Master of Computer Application.</p>
    <p>The project work has been carried out under the guidance of <strong>${escapeHtml(student.mentor)}</strong> during the academic year <strong>${escapeHtml(student.academicYear)}</strong>.</p>
    <div class="note">Copy of the certificate received from Qollabb or the concerned authority may be pasted here if required by the submission portal.</div>
    <div class="signature">
      <div class="line">Guide / Mentor Signature<br />${escapeHtml(student.mentor)}</div>
      <div class="line">Student Signature<br />${escapeHtml(student.name)}</div>
    </div>
  </section>`;
}

function declarationPage() {
  return `<section class="page">
    <h2>Declaration</h2>
    <p>I, <strong>${escapeHtml(student.name)}</strong>, hereby solemnly declare that the project report titled <strong>${escapeHtml(student.projectTitle)}</strong> submitted in partial fulfillment of the requirements for the award of the degree of Master of Computer Application is my original work.</p>
    <p>This project has been carried out by me during the academic year <strong>${escapeHtml(student.academicYear)}</strong> under the supervision of <strong>${escapeHtml(student.mentor)}</strong>. The work has not been submitted previously to any other university, institution, or examination body for the award of any degree, diploma, or certification.</p>
    <p>All sources of information used in this report have been duly acknowledged and referenced in accordance with academic ethics and plagiarism norms.</p>
    <div class="signature">
      <div class="line">Place: Chandigarh<br />Date: ${escapeHtml(student.date)}</div>
      <div class="line">Student Signature<br />${escapeHtml(student.name)}<br />${escapeHtml(student.enrollment)}</div>
    </div>
  </section>`;
}

function acknowledgementPage() {
  return `<section class="page">
    <h2>Acknowledgement</h2>
    <p>I would like to express my sincere gratitude to my guide and mentor, <strong>${escapeHtml(student.mentor)}</strong>, for valuable guidance and support throughout this project. I also thank the faculty members of <strong>${escapeHtml(student.university)}</strong> for their encouragement and academic support.</p>
    <p>I am thankful to all individuals who helped me complete this project successfully. Their support, feedback, and motivation helped me improve the quality of the application and documentation.</p>
  </section>`;
}

function abstractPage() {
  return `<section class="page">
    <h2>Abstract / Executive Summary</h2>
    <p>The MERN Stack Employee Management System is a web-based application designed to help companies manage employee information efficiently. The system provides secure user authentication, role-based access control, and CRUD operations for employee records such as name, contact details, department, job title, and employment status.</p>
    <p>The backend is developed using Node.js and Express.js with MongoDB as the database. The frontend is developed using React. JWT authentication protects private routes and ensures that only authorized users can access employee data. Admin users can manage user roles, while employee data access is controlled according to user role.</p>
    <p>The system includes dashboard summaries, employee search, filtering, sorting, pagination, CSV import with validation, CSV export, department summaries, profile management, activity logs, and Playwright testing. The project demonstrates database design, system analysis, REST API development, frontend integration, authentication, testing, and deployment readiness.</p>
  </section>`;
}

function tocPage() {
  const rows = [
    'Certificate',
    'Declaration',
    'Acknowledgement',
    'Abstract / Executive Summary',
    ...chapters.map((chapter) => chapter.title),
    'Chapter 9: References',
    'Chapter 10: Appendices'
  ];

  return `<section class="page">
    <h2>Table of Contents</h2>
    <div class="toc">
      ${rows.map((row, index) => `<div class="toc-row"><span>${escapeHtml(row)}</span><span>${index + 1}</span></div>`).join('\n')}
    </div>
  </section>`;
}

function chapterHtml(chapter) {
  return `<section class="page chapter">
    <h2>${escapeHtml(chapter.title)}</h2>
    ${chapter.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
    ${chapter.bullets ? `<h3>${escapeHtml(chapter.bulletsTitle || 'Key Points')}</h3><ul>${chapter.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    ${chapter.extraBullets ? `<h3>${escapeHtml(chapter.extraTitle || 'Additional Points')}</h3><ul>${chapter.extraBullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
    ${chapter.table ? tableHtml(chapter.tableTitle, chapter.table) : ''}
  </section>`;
}

function tableHtml(title, rows) {
  const [head, ...body] = rows;
  return `<h3>${escapeHtml(title)}</h3><table><thead><tr>${head.map((cell) => `<th>${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function referencesPage() {
  return `<section class="page chapter">
    <h2>Chapter 9: References</h2>
    <ol>
      ${references.map((reference) => `<li>${escapeHtml(reference)}</li>`).join('\n')}
    </ol>
  </section>`;
}

function appendixPage() {
  return `<section class="page chapter">
    <h2>Chapter 10: Appendices</h2>
    <h3>Appendix A: Source Code Repository</h3>
    <p>The complete source code is maintained in the GitHub repository: <strong>${escapeHtml(student.repo)}</strong></p>
    <h3>Appendix B: Important Local URLs</h3>
    <table>
      <tbody>
        <tr><td>Frontend</td><td>http://localhost:5173</td></tr>
        <tr><td>Backend Health</td><td>http://localhost:5000/api/health</td></tr>
      </tbody>
    </table>
    <h3>Appendix C: Important Commands</h3>
    <table>
      <tbody>
        <tr><td>Install dependencies</td><td><code>npm run install-all</code></td></tr>
        <tr><td>Start development servers</td><td><code>npm run dev</code></td></tr>
        <tr><td>Stop development servers</td><td><code>npm run stop:dev</code></td></tr>
        <tr><td>Run Playwright smoke test</td><td><code>npm run test:e2e</code></td></tr>
      </tbody>
    </table>
    <h3>Appendix D: Screenshots To Attach</h3>
    <ul>
      <li>Login page and dashboard.</li>
      <li>Employee list with search, filters, and pagination.</li>
      <li>Add employee, edit employee, and employee details pages.</li>
      <li>CSV import page with valid preview and validation errors.</li>
      <li>Departments, activity, profile, and admin users pages.</li>
      <li>MongoDB collections and GitHub repository.</li>
    </ul>
  </section>`;
}

function detail(label, value) {
  return `<div class="detail"><span class="label">${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
