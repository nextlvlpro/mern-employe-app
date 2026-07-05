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
  repo: 'https://github.com/nextlvlpro/mern-employe-app',
  deploymentUrl: 'https://bluepeak-hr.onrender.com',
  healthUrl: 'https://bluepeak-hr.onrender.com/api/health'
};

const chapters = [
  {
    title: 'Chapter 1: Introduction',
    body: [
      'Employee data management is an important operational requirement for every organization. Companies need to maintain accurate employee information such as personal contact details, department, job title, employment status, and account-level access. If this data is stored only in spreadsheets or paper records, it becomes difficult to search, update, secure, and audit.',
      'The MERN Stack Employee Management System is a web application developed to solve this problem using MongoDB, Express.js, React, and Node.js. The project provides a secure interface for managing employee records and includes authentication, role-based authorization, search, filtering, CSV import/export, activity tracking, and a dashboard for summary information.',
      'The application uses a company-style interface named BluePeak HR / PeopleDesk so that the project looks and behaves like a real workplace system. Instead of keeping all functionality on a single page, the application is divided into separate pages for dashboard, employees, employee details, add employee, edit employee, departments, CSV import, profile, users, and activity logs.',
      'The main purpose of the project is to demonstrate a complete full-stack workflow: database design, backend API development, frontend implementation, authentication, authorization, testing, documentation, and cloud deployment.'
    ],
    bulletsTitle: 'Objectives',
    bullets: [
      'To design a MongoDB database schema for storing user, employee, and activity log information.',
      'To develop RESTful APIs using Node.js and Express.js.',
      'To create a user-friendly React frontend for interacting with backend services.',
      'To implement JWT authentication and role-based access control.',
      'To provide employee CRUD, search, filtering, pagination, CSV import, and CSV export.',
      'To verify the application using build checks, audits, and Playwright browser testing.',
      'To deploy the application using MongoDB Atlas and Render.'
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
      'The system has three major roles: admin, department head, and user. Admin users can manage all employee and user records. Department heads can manage employees and staff users only inside their own department. Normal users can view department-related information in read-only mode. This role-based design improves privacy and prevents unauthorized access.',
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
      'Admin and department-head user management.',
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
      'User APIs: department-scoped user list, user creation, role update, and department update.',
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
      'Users page with admin, department-head, and read-only user views.',
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
      'The final result is a working deployed application with GitHub source code, documentation, milestone reports, testing support, screenshots, and Render deployment configuration.'
    ],
    bulletsTitle: 'Major Outcomes',
    bullets: [
      'Centralized employee record management.',
      'Secure authentication and authorization.',
      'Improved usability with separate pages and a collapsible sidebar.',
      'Bulk CSV import with validation.',
      'Activity logs for administrative tracking.',
      'Testing, documentation, screenshots, and deployment support for project submission.'
    ]
  },
  {
    title: 'Chapter 8: Conclusion And Future Scope',
    body: [
      'The MERN Stack Employee Management System meets the major objectives of the project. It demonstrates database design, RESTful API development, frontend implementation, authentication, authorization, testing, and cloud deployment. The system can be used by a company to manage employee information in a structured and secure way.',
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
  'MDN Web Docs - JavaScript, https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'MDN Web Docs - Fetch and HTTP Concepts, https://developer.mozilla.org/',
  'OWASP Authentication Cheat Sheet, https://cheatsheetseries.owasp.org/',
  'npm Documentation, https://docs.npmjs.com/',
  'GitHub Docs, https://docs.github.com/'
];

const screenshots = [
  ['Login Page', 'screenshots/01-login-page.png', 'Demo login screen with admin, department head, and staff credentials.'],
  ['Admin Dashboard', 'screenshots/02-admin-dashboard.png', 'Dashboard summary shown after admin login.'],
  ['Employee List', 'screenshots/03-admin-employees.png', 'Employee records page with search, filters, pagination, and management actions.'],
  ['Add Employee', 'screenshots/04-add-employee.png', 'Separate add employee page with form-based input.'],
  ['CSV Import', 'screenshots/05-import-csv.png', 'CSV import page for bulk employee upload.'],
  ['Admin Users', 'screenshots/06-admin-users.png', 'Admin user management screen with role and department controls.'],
  ['Department Head Users', 'screenshots/07-department-head-users.png', 'Department head view where new staff users are limited to the same department.'],
  ['Staff Read-Only View', 'screenshots/08-staff-read-only-employees.png', 'Regular staff view with read-only department employee records.']
];

const codeSnippets = [
  {
    title: 'Employee Schema',
    file: 'server/src/models/Employee.js',
    start: 1,
    end: 48
  },
  {
    title: 'Department-Based Employee Authorization',
    file: 'server/src/controllers/employeeController.js',
    start: 4,
    end: 31
  },
  {
    title: 'User Creation With Role Rules',
    file: 'server/src/controllers/userController.js',
    start: 14,
    end: 66
  },
  {
    title: 'Protected Routes In React',
    file: 'client/src/App.jsx',
    start: 18,
    end: 45
  },
  {
    title: 'User Service API Calls',
    file: 'client/src/services/userService.js',
    start: 1,
    end: 16
  }
];

const chapterExpansionPlans = {
  'Chapter 1: Introduction': [
    section('Background Of The Study', [
      point('Organizational record keeping', 'Employee records are used by almost every department, including human resources, finance, administration, and project management. A digital record system reduces the delay that occurs when information is stored in separate files.'),
      point('Need for web-based access', 'A browser-based application allows authorized users to access employee information from different devices without installing separate desktop software. This makes the system practical for academic demonstration and real organizational use.'),
      point('Growth of full-stack systems', 'Modern business applications often use separate frontend, backend, and database layers. The MERN stack follows this pattern and is suitable for projects where user interaction and database operations are equally important.')
    ]),
    section('Problem Context', [
      point('Manual dependency', 'Organizations that depend on spreadsheets must manually maintain formats, filters, copies, and backups. These activities consume time and can introduce mistakes when multiple people update the same data.'),
      point('Limited security', 'Simple files do not provide strong role-based access control. Anyone with file access may be able to view or change sensitive employee information without proper authorization.'),
      point('Difficulty in tracking changes', 'A manual system generally does not show who created, updated, imported, or deleted a record. Activity tracking is important because it improves accountability.')
    ]),
    section('Project Relevance', [
      point('Academic relevance', 'The project demonstrates important full-stack development concepts such as schema design, REST API development, frontend routing, authentication, authorization, testing, and deployment preparation.'),
      point('Industry relevance', 'Employee management is a common business requirement. Even a basic version of such a system helps demonstrate practical thinking about users, workflows, security, and data management.'),
      point('Skill development', 'The project supports hands-on learning in React, Express, MongoDB, Node.js, Git, GitHub, testing, and documentation. These are important skills for full-stack development.')
    ]),
    section('Scope Of The Project', [
      point('Employee operations', 'The project scope includes creating, viewing, updating, deleting, searching, filtering, sorting, importing, and exporting employee records. These operations cover the basic data lifecycle.'),
      point('User operations', 'The scope includes registration, login, profile update, admin user role management, department-head staff creation, and read-only department directory access for normal users. These features make the application more complete than an open public form.'),
      point('Reporting support', 'The project includes milestone reports, a project report, API test cases, deployment notes, and a submission checklist so that the implementation can be evaluated clearly.')
    ]),
    section('Expected Benefits', [
      point('Efficiency', 'The system reduces repeated manual work by providing forms, filters, pagination, CSV import, and CSV export. Users can manage many records more quickly.'),
      point('Accuracy', 'Validation rules reduce incorrect data entry. Required fields, email format checks, phone format checks, status values, and duplicate checks improve record quality.'),
      point('Maintainability', 'The codebase is divided into controllers, models, routes, pages, services, utilities, and components. This separation makes the project easier to understand and extend.')
    ])
  ],
  'Chapter 2: System Study': [
    section('Existing System Study', [
      point('Spreadsheet-based records', 'Many small organizations use spreadsheets because they are easy to start with. However, spreadsheets become difficult to manage when data grows and multiple people need access.'),
      point('Document-based storage', 'Employee details may also be stored in word processor files, scanned forms, or email attachments. This makes searching and updating records slow and unreliable.'),
      point('Communication delays', 'When records are not centralized, users must ask another person for updated information. This dependency increases delay and reduces productivity.')
    ]),
    section('User Study', [
      point('Administrator needs', 'Administrators need a complete view of employee records, user accounts, role permissions, and recent activity. The system provides dedicated admin features for this purpose.'),
      point('Regular user needs', 'Regular users need simple read-only access to department records that they are authorized to view. They should not see administrative controls that are outside their responsibility.'),
      point('Evaluation needs', 'For academic review, the system must clearly show implemented modules, database usage, frontend pages, API endpoints, testing, screenshots, and deployment.')
    ]),
    section('Operational Issues In Existing Approach', [
      point('Duplicate information', 'Duplicate employee records can appear when data is copied between files. Duplicate emails are especially problematic because email is often used as a unique contact identifier.'),
      point('Inconsistent formats', 'Departments, job titles, phone numbers, and statuses may be written in different formats. A structured application can enforce consistent input patterns.'),
      point('Weak accountability', 'Without activity history, it is difficult to understand what changed and who performed the change. This is a serious weakness in administrative systems.')
    ]),
    section('Feasibility Study', [
      point('Technical feasibility', 'The MERN stack is technically suitable because it supports JSON-based communication across frontend, backend, and database layers. It also works well with cloud deployment platforms.'),
      point('Operational feasibility', 'The interface is designed around common workflows such as login, viewing dashboard summaries, searching employees, adding employees, importing CSV records, and managing roles.'),
      point('Economic feasibility', 'The project can be developed and demonstrated using free or low-cost tools such as MongoDB Community/Atlas, Node.js, React, GitHub, and Render.')
    ]),
    section('Proposed System Study', [
      point('Centralized data', 'The proposed system stores employee records in MongoDB instead of scattered files. This improves consistency and enables structured queries.'),
      point('Secure access', 'JWT authentication and protected backend routes ensure that only logged-in users can access the application data. Role and department rules provide extra control.'),
      point('Improved workflows', 'Separate pages for dashboard, employees, departments, import, activity, profile, and users make the application easier to navigate and demonstrate.')
    ])
  ],
  'Chapter 3: System Analysis': [
    section('Requirement Analysis', [
      point('Functional clarity', 'Functional requirements define what the system must do. In this project, major functions include authentication, employee CRUD, CSV import, search, pagination, activity tracking, and role management.'),
      point('Input requirements', 'The system requires user input through forms and CSV files. Important employee inputs include name, email, phone, department, job title, and status.'),
      point('Output requirements', 'The system outputs dashboard summaries, employee tables, filtered search results, department summaries, activity logs, CSV exports, and validation messages.')
    ]),
    section('Actor Analysis', [
      point('Admin actor', 'The admin actor can access all employee records, manage user roles, view activity, and perform bulk operations. This role represents a trusted administrative user.'),
      point('Department head actor', 'The department head actor can manage employees and staff user accounts only within their own department. This role represents a middle level manager.'),
      point('Regular user actor', 'The regular user can view department information in read-only mode but does not receive create, edit, delete, import, export, or role management controls.'),
      point('System actor', 'The system itself validates data, hashes passwords, issues tokens, checks authorization, records activity, and returns structured responses to the frontend.')
    ]),
    section('Data Analysis', [
      point('User data', 'User data includes identity, email, password hash, role, and timestamps. Passwords are never stored as plain text.'),
      point('Employee data', 'Employee data includes personal contact and work-related details. The createdBy field connects employee records to the user who created them, while the department field supports scoped access.'),
      point('Activity data', 'Activity data records action type, message, entity type, related entity, user, and timestamps. This gives visibility into important system operations.')
    ]),
    section('Risk Analysis', [
      point('Invalid data risk', 'Invalid records reduce the usefulness of the system. The project reduces this risk through frontend and backend validation rules.'),
      point('Unauthorized access risk', 'Employee data is private. The project reduces unauthorized access risk using JWT tokens, protected routes, and admin authorization middleware.'),
      point('Deployment configuration risk', 'Cloud deployment can fail if environment variables or CORS origins are wrong. The project includes .env examples and deployment documentation to reduce this risk.')
    ]),
    section('Acceptance Criteria', [
      point('Authentication acceptance', 'A user should be able to register, log in, remain authenticated on reload, update profile details, and log out safely.'),
      point('Employee module acceptance', 'Authorized users should be able to add, search, filter, sort, paginate, view, edit, delete, import, and export employee records. Regular users should receive a read-only department view.'),
      point('Testing acceptance', 'The project should pass production build checks, dependency audits, and Playwright smoke testing for major workflows.')
    ])
  ],
  'Chapter 4: System Design': [
    section('Architecture Design', [
      point('Client-server architecture', 'The React frontend works as the client and the Express application works as the server. The client sends HTTP requests to backend APIs and receives JSON responses.'),
      point('Database layer', 'MongoDB stores persistent data, while Mongoose provides schema definitions, validation support, and query methods. This makes database operations more structured.'),
      point('Service separation', 'Frontend service files isolate API calls from page components. Backend route files isolate endpoint definitions from controller logic.')
    ]),
    section('Database Design Details', [
      point('User collection design', 'The user collection stores name, email, hashed password, role, and timestamps. The role field supports authorization decisions.'),
      point('Employee collection design', 'The employee collection stores name, email, phone, department, job title, status, creator, and timestamps. Text fields support search and display.'),
      point('Activity log collection design', 'The activity log collection stores action messages and related entity details. It supports audit-style visibility without changing the employee schema.')
    ]),
    section('API Design Details', [
      point('Authentication endpoints', 'Authentication endpoints handle registration, login, current user retrieval, and profile update. They return JWT-based user sessions.'),
      point('Employee endpoints', 'Employee endpoints follow REST principles for list, create, read, update, and delete operations. A separate bulk endpoint handles CSV import.'),
      point('Administrative endpoints', 'User-management endpoints allow admin role management and department-head staff creation. They are protected by authentication, authorization middleware, and department checks.')
    ]),
    section('Frontend Design Details', [
      point('Routing design', 'React Router provides separate URLs for major modules. This improves navigation, bookmarking, reload behavior, and project demonstration.'),
      point('Component design', 'Reusable components such as AppLayout, EmployeeForm, EmployeeTable, and ErrorBoundary reduce duplication and keep page files easier to read.'),
      point('Visual design', 'The UI uses a restrained company dashboard style with a sticky collapsible sidebar, cards, tables, forms, and status indicators.')
    ]),
    section('Security Design', [
      point('Password hashing', 'Passwords are hashed using bcryptjs before they are stored. This prevents plain-text password exposure in the database.'),
      point('Token protection', 'JWT tokens are required for private API routes. The backend verifies the token and attaches the current user to the request.'),
      point('Role authorization', 'Admin and department-level operations are protected using authorization middleware and controller checks. The frontend also adapts navigation and actions for each role.')
    ])
  ],
  'Chapter 5: System Implementation': [
    section('Backend Implementation', [
      point('Express server setup', 'The Express server configures security middleware, CORS, JSON parsing, logging, rate limiting, routes, and error handling.'),
      point('Controller implementation', 'Controllers contain the main business logic for authentication, employees, users, and activity logs. This keeps routes short and readable.'),
      point('Middleware implementation', 'Authentication middleware checks JWT tokens. Authorization middleware checks whether the logged-in user has the required role.')
    ]),
    section('Frontend Implementation', [
      point('React page implementation', 'Each major workflow is implemented as a separate React page. This improves readability and makes the app look like a real system.'),
      point('Context implementation', 'Authentication state is managed through AuthContext. It stores user details, login, register, profile update, and logout functions.'),
      point('Service implementation', 'Service files contain API calls for employees, users, and activity logs. Page components call these services instead of directly repeating Axios code.')
    ]),
    section('Employee Module Implementation', [
      point('CRUD implementation', 'The system provides forms and actions for creating, reading, updating, and deleting employee records. Each operation is connected to backend APIs.'),
      point('Search and pagination implementation', 'The employees page supports text search, department filter, status filter, sorting, rows per page, and previous/next page controls.'),
      point('Details implementation', 'The employee details page displays profile-style information such as department, job title, contact details, creator, status, and creation date.')
    ]),
    section('CSV Import And Export Implementation', [
      point('CSV parsing', 'The frontend parses CSV files, maps practical column names, validates rows, and separates valid records from rows with errors.'),
      point('Bulk import', 'The backend bulk import endpoint validates records again, rejects invalid rows, skips duplicates, and inserts valid employees.'),
      point('CSV export', 'The employee list can export currently displayed employee records to a CSV file for reporting or backup purposes.')
    ]),
    section('Developer Workflow Implementation', [
      point('Port cleanup', 'A stop-dev script releases common development ports before starting the app. This prevents confusing conflicts on ports 5000, 5173, and 5174.'),
      point('Strict frontend port', 'Vite is configured with strictPort so it does not silently change from port 5173 to another port. This avoids CORS confusion.'),
      point('Version control', 'The project is committed to GitHub with meaningful commits for major feature additions and documentation updates.')
    ])
  ],
  'Chapter 6: Testing': [
    section('Testing Strategy', [
      point('Build testing', 'Frontend build testing ensures that React code can be transformed into production-ready files without compile errors.'),
      point('Syntax testing', 'Backend syntax checks help catch JavaScript errors before the server is run. This is useful after controller or route changes.'),
      point('Browser testing', 'Playwright testing verifies actual user workflows in a browser environment, making it more realistic than only testing functions.')
    ]),
    section('Authentication Testing', [
      point('Login test', 'The smoke test logs in using seeded admin credentials and confirms that the dashboard loads after successful authentication.'),
      point('Protected route test', 'The app redirects unauthenticated users to the login page and allows authenticated users to access private pages.'),
      point('Session reload test', 'The authentication context safely parses stored user information and clears invalid sessions if needed.')
    ]),
    section('Employee Testing', [
      point('Create test', 'The Playwright test creates a temporary employee using the add employee page and waits for the employee to appear in the list.'),
      point('Search test', 'The test searches for the temporary employee by name to confirm that search returns the expected record.'),
      point('Delete cleanup test', 'Temporary test employees are deleted during cleanup so repeated test runs do not pollute the database.')
    ]),
    section('CSV Import Testing', [
      point('Valid row test', 'The test uploads a CSV containing a valid employee row and verifies that the record can be imported.'),
      point('Invalid row test', 'The same CSV contains an invalid row with a bad email and wrong status so validation errors are visible.'),
      point('Backend validation test', 'The backend bulk endpoint also validates rows, which protects the system if invalid data bypasses frontend checks.')
    ]),
    section('Audit And Regression Testing', [
      point('Dependency audit', 'npm audit is used for client and server dependencies. The final audit result showed zero vulnerabilities.'),
      point('Regression confidence', 'The smoke test covers multiple pages and repeated workflows, which gives confidence after feature additions.'),
      point('Manual verification', 'Manual checks were also performed for local URLs, health endpoint, Git status, and generated PDF documents.')
    ])
  ],
  'Chapter 7: Results And Discussion': [
    section('Functional Results', [
      point('Employee management result', 'The application successfully manages employee records through form-based and CSV-based workflows. Admins and department heads can perform CRUD operations according to their role.'),
      point('Dashboard result', 'The dashboard provides immediate summary information, including employee counts, active employees, department count, status overview, recent employees, and recent activity.'),
      point('Administration result', 'Admin users can view registered users and change roles, while department heads can add staff users only in their own department.')
    ]),
    section('Usability Results', [
      point('Navigation result', 'The application uses a collapsible sticky sidebar and separate pages, which makes navigation easier than a crowded single-screen interface.'),
      point('Search result', 'Search, filter, sort, and pagination tools make the employee list usable even when the number of records increases.'),
      point('Import result', 'CSV import reduces repetitive manual entry and provides clear validation feedback before records are saved.')
    ]),
    section('Security Results', [
      point('Authentication result', 'JWT authentication protects private routes and backend APIs. Users must log in before accessing employee data.'),
      point('Authorization result', 'Role-based authorization separates admin, department-head, and regular-user workflows. Regular users cannot create, edit, delete, import, or export employee records.'),
      point('Validation result', 'Backend validation protects employee creation and CSV import even if frontend validation is bypassed.')
    ]),
    section('Documentation Results', [
      point('Report result', 'The project includes a final project report, milestone reports, API test cases, deployment documentation, and a submission checklist.'),
      point('GitHub result', 'The source code is available in the GitHub repository with feature-based commits. This helps reviewers inspect project progress.'),
      point('Testing result', 'The Playwright smoke test and npm audit commands make verification repeatable for future changes.')
    ]),
    section('Limitations', [
      point('Deployment completed', 'The project has been deployed on Render as a single web service where the Express backend serves the built React frontend. MongoDB Atlas is used for the production database connection.'),
      point('Advanced HR modules', 'The current version does not include attendance, payroll, leave approval, or document upload modules. These can be added later.'),
      point('Advanced reporting', 'The current reporting is basic. Future versions can add charts, date filters, and printable reports.')
    ])
  ],
  'Chapter 8: Conclusion And Future Scope': [
    section('Conclusion', [
      point('Objective completion', 'The project completes the main objective of building a MERN stack employee management system with secure CRUD operations and a usable frontend.'),
      point('Learning outcome', 'The implementation demonstrates practical full-stack development skills across database design, API development, frontend routing, authentication, validation, and testing.'),
      point('Submission readiness', 'The project includes code, GitHub commits, milestone reports, final report, testing documentation, screenshots, and deployment instructions.')
    ]),
    section('Technical Conclusion', [
      point('MERN suitability', 'MongoDB, Express.js, React, and Node.js worked well together because data could move through the system as JSON.'),
      point('Modular structure', 'Separating routes, controllers, models, services, pages, and components made the codebase easier to maintain and extend.'),
      point('Testing value', 'Browser testing with Playwright helped verify that the application works from the user perspective, not only from the code perspective.')
    ]),
    section('Future Functional Scope', [
      point('Attendance module', 'A future version can include employee attendance tracking with date-wise records and monthly summaries.'),
      point('Payroll module', 'Salary details, allowances, deductions, and payslip generation can be added as a separate secure module.'),
      point('Leave module', 'Leave requests, approvals, balances, and status tracking can extend the system into a broader HR management platform.')
    ]),
    section('Future Technical Scope', [
      point('File uploads', 'Employee profile photos and document uploads can be added using secure file storage and validation.'),
      point('Advanced analytics', 'Charts, department trends, hiring patterns, and exportable reports can improve management decision-making.'),
      point('Production hardening', 'Future deployment can add stronger rate limits, monitoring, centralized logs, Docker support, and CI/CD pipelines.')
    ]),
    section('Final Remarks', [
      point('Project value', 'The system provides a strong foundation for a practical employee management solution and demonstrates end-to-end application development.'),
      point('Academic value', 'The project aligns with academic requirements by covering system study, system analysis, design, implementation, testing, results, and future scope.'),
      point('Professional value', 'The application can be presented as a portfolio project because it includes real workflows, role management, import/export, activity logs, and automated testing.')
    ])
  ]
};

function section(heading, points) {
  return { heading, points };
}

function point(topic, detail) {
  return { topic, detail };
}

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
      .chapter { page-break-before: always; }
      code { background: #f1f5f9; border-radius: 4px; padding: 1px 4px; }
      pre {
        background: #0f172a;
        border-radius: 6px;
        color: #e2e8f0;
        font-size: 9.5px;
        line-height: 1.45;
        margin: 10px 0 16px;
        overflow-wrap: anywhere;
        padding: 12px;
        white-space: pre-wrap;
      }
      .screenshot {
        border: 1px solid #d9e2ec;
        border-radius: 8px;
        margin: 10px 0 18px;
        padding: 8px;
        page-break-inside: avoid;
      }
      .screenshot img {
        display: block;
        max-width: 100%;
        width: 100%;
      }
      .caption {
        color: #627d98;
        font-size: 11px;
        margin-top: 6px;
        text-align: center;
      }
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
  </section>`;
}

function declarationPage() {
  return `<section class="page">
    <h2>Declaration</h2>
    <p>I, <strong>${escapeHtml(student.name)}</strong>, hereby solemnly declare that the project report titled <strong>${escapeHtml(student.projectTitle)}</strong> submitted in partial fulfillment of the requirements for the award of the degree of Master of Computer Application is my original work.</p>
    <p>This project has been carried out by me during the academic year <strong>${escapeHtml(student.academicYear)}</strong> under the supervision of <strong>${escapeHtml(student.mentor)}</strong>. The work has not been submitted previously to any other university, institution, or examination body for the award of any degree, diploma, or certification.</p>
    <p>All sources of information used in this report have been duly acknowledged and referenced in accordance with academic ethics and plagiarism norms.</p>
    <p><strong>Place:</strong> Chandigarh<br /><strong>Date:</strong> ${escapeHtml(student.date)}</p>
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
    <p>The system includes dashboard summaries, employee search, filtering, sorting, pagination, CSV import with validation, CSV export, department summaries, profile management, activity logs, role-based user views, screenshots, deployment on Render, and Playwright testing. The project demonstrates database design, system analysis, REST API development, frontend integration, authentication, testing, and cloud deployment.</p>
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
    ${expandedChapterHtml(chapter.title)}
  </section>`;
}

function expandedChapterHtml(title) {
  const sections = chapterExpansionPlans[title] || [];

  return sections.map((currentSection) => {
    return `<h3>${escapeHtml(currentSection.heading)}</h3>
      ${currentSection.points.map((currentPoint) => expandedPointHtml(title, currentSection.heading, currentPoint)).join('\n')}`;
  }).join('\n');
}

function expandedPointHtml(chapterTitle, heading, currentPoint) {
  return `<p>${escapeHtml(expandedParagraphOne(chapterTitle, heading, currentPoint))}</p>
    <p>${escapeHtml(expandedParagraphTwo(chapterTitle, heading, currentPoint))}</p>`;
}

function expandedParagraphOne(chapterTitle, heading, currentPoint) {
  return `In relation to ${chapterTitle.replace('Chapter ', 'chapter ')}, the topic of ${currentPoint.topic.toLowerCase()} is important because it connects the academic discussion with the actual implementation of the MERN Stack Employee Management System. ${currentPoint.detail} In this project, this point is not treated only as theory; it is reflected in the way the application stores records, protects routes, validates input, and presents information through separate pages. This helps demonstrate that the system was designed around practical organizational needs rather than only around a basic CRUD checklist.`;
}

function expandedParagraphTwo(chapterTitle, heading, currentPoint) {
  return `From the perspective of ${heading.toLowerCase()}, ${currentPoint.topic.toLowerCase()} also supports maintainability and evaluation. A project reviewer can identify how the requirement is handled by checking the database models, backend controllers, React pages, service files, and documentation. This makes the report traceable to the codebase. It also makes future improvement easier because every important feature has a clear place in the system. The same approach can be extended later for attendance, payroll, leave management, reporting, notifications, and other HR modules without changing the basic architecture.`;
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
    <h3>Appendix B: Deployment URL</h3>
    <table>
      <tbody>
        <tr><td>Live Application</td><td>${escapeHtml(student.deploymentUrl)}</td></tr>
        <tr><td>Health Check</td><td>${escapeHtml(student.healthUrl)}</td></tr>
      </tbody>
    </table>
    <h3>Appendix C: Important Local URLs</h3>
    <table>
      <tbody>
        <tr><td>Frontend</td><td>http://localhost:5173</td></tr>
        <tr><td>Backend Health</td><td>http://localhost:5000/api/health</td></tr>
      </tbody>
    </table>
    <h3>Appendix D: Important Commands</h3>
    <table>
      <tbody>
        <tr><td>Install dependencies</td><td><code>npm run install-all</code></td></tr>
        <tr><td>Start development servers</td><td><code>npm run dev</code></td></tr>
        <tr><td>Stop development servers</td><td><code>npm run stop:dev</code></td></tr>
        <tr><td>Run Playwright smoke test</td><td><code>npm run test:e2e</code></td></tr>
        <tr><td>Capture screenshots</td><td><code>node scripts/capture-ui-screenshots.js</code></td></tr>
        <tr><td>Record admin tour</td><td><code>node scripts/record-admin-tour.js</code></td></tr>
      </tbody>
    </table>
    <h3>Appendix E: UI Screenshots</h3>
    ${screenshots.map(screenshotHtml).join('\n')}
    <h3>Appendix F: Code Snippets</h3>
    ${codeSnippets.map(codeSnippetHtml).join('\n')}
    <h3>Appendix G: Website Tour Video</h3>
    <table>
      <tbody>
        <tr><td>Admin Tour Video</td><td><code>docs/tour/bluepeak-admin-tour.webm</code></td></tr>
        <tr><td>Subtitle File</td><td><code>docs/tour/bluepeak-admin-tour.vtt</code></td></tr>
        <tr><td>Video Player Page</td><td><code>docs/tour/bluepeak-admin-tour.html</code></td></tr>
      </tbody>
    </table>
    <p>The website tour was recorded from the deployed Render application using the admin demo account. Captions are shown inside the video and are also provided as a subtitle file.</p>
  </section>`;
}

function screenshotHtml([title, imagePath, caption]) {
  const fullPath = path.join(__dirname, '..', 'docs', imagePath);
  if (!fs.existsSync(fullPath)) {
    return `<div class="note"><strong>${escapeHtml(title)}:</strong> Screenshot will be attached after running the screenshot capture script.</div>`;
  }

  return `<div class="screenshot">
    <h4>${escapeHtml(title)}</h4>
    <img src="${escapeHtml(imagePath.replaceAll('\\', '/'))}" alt="${escapeHtml(title)}" />
    <div class="caption">${escapeHtml(caption)}</div>
  </div>`;
}

function codeSnippetHtml(snippet) {
  return `<h4>${escapeHtml(snippet.title)}</h4>
    <p><strong>File:</strong> <code>${escapeHtml(snippet.file)}</code></p>
    <pre><code>${escapeHtml(readSnippet(snippet.file, snippet.start, snippet.end))}</code></pre>`;
}

function readSnippet(filePath, start, end) {
  const fullPath = path.join(__dirname, '..', filePath);
  const lines = fs.readFileSync(fullPath, 'utf8').split(/\r?\n/);
  return lines
    .slice(start - 1, end)
    .map((line, index) => `${String(start + index).padStart(3, ' ')}  ${line}`)
    .join('\n');
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
