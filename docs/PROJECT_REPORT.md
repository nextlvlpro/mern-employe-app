# MERN Stack Employee Management System

Submitted in partial fulfillment of the requirements for the award of the degree of Master of Computer Application, Full Stack Development.

## Student Details

- Student Name: Bhanu Sharma
- Enrollment No: O24MCA112292
- Guide/Mentor Name: Alok Srivastva
- University: Chandigarh University
- Academic Year: 2024-2026

## Certificate

Certificate copy received from Qollabb or the concerned authority should be pasted here.

## Declaration

I, Bhanu Sharma, hereby solemnly declare that the project report titled "MERN Stack Employee Management System" submitted in partial fulfillment of the requirements for the award of the degree of Master of Computer Application is my original work. This project has been carried out during the academic year 2024-2026 under the supervision of Alok Srivastva. The work has not been submitted previously to any other university, institution, or examination body for the award of any degree, diploma, or certification.

## Acknowledgement

I would like to express my sincere gratitude to my guide and mentor, Alok Srivastva, for valuable guidance and support throughout this project. I also thank the faculty members of Chandigarh University for their encouragement and academic support. I am thankful to all individuals who helped me complete this project successfully.

## Abstract

The MERN Stack Employee Management System is a web-based application designed to help companies manage employee information efficiently. The system provides secure user authentication, role-based access control, and CRUD operations for employee records such as name, contact details, department, job title, and employment status. The backend is developed using Node.js and Express.js with MongoDB as the database, while the frontend is developed using React. JWT authentication protects private routes and ensures that only authorized users can access employee data. Admin users can manage all employee records, department heads can manage records and users only within their own department, and normal users receive read-only access to department information. The project demonstrates database design, RESTful API development, frontend integration, authentication, testing, and cloud deployment on Render. The application is suitable for small and medium organizations that need a simple digital solution for employee record management.

## Chapter 1: Introduction

Employee information management is an important activity for every organization. Traditional manual record keeping can lead to data duplication, slow search, poor security, and difficulty in updating information. This project solves these issues by creating a web application where employee records can be stored, searched, updated, and deleted from a centralized system.

The project is developed using the MERN stack. MongoDB stores employee and user data, Express.js and Node.js provide backend APIs, and React provides an interactive user interface. The system supports authentication using JSON Web Tokens so that only logged-in users can access employee information.

## Chapter 2: System Study

The existing manual or spreadsheet-based employee management process has several limitations. It is difficult to enforce access control, maintain updated records, and search employee information quickly. A web-based system improves availability and usability by allowing authorized users to access data from any supported browser.

The proposed system includes a secure login/register module, employee CRUD module, dashboard summary, search and filter functionality, CSV import/export, department summary, user profile management, activity logs, pagination, and role-based access control. It reduces manual effort and improves the reliability of employee information.

## Chapter 3: System Analysis

### Functional Requirements

- Users can register and log in securely.
- Admin users and department heads can create employee records.
- Users can view employee records.
- Admin users and department heads can update employee details.
- Admin users and department heads can delete employee records.
- Users can search and filter employee records.
- Admin users can access all records.
- Department heads can manage only their own department.
- Normal users can view only department-related records in read-only mode.
- Admin users and department heads can import employees in bulk using CSV validation.
- Admin users and department heads can export employee records to CSV.
- Admin users can manage roles and departments.
- Department heads can add normal users only in their own department.
- The system records important actions in an activity log.

### Non-Functional Requirements

- The application should be responsive.
- The APIs should return clear success and error responses.
- Passwords should be stored securely using hashing.
- The system should be deployable on a cloud platform.
- Environment variables should protect secrets.

## Chapter 4: System Design

### Database Design

The system uses two main MongoDB collections.

User collection:

- name
- email
- password
- role
- department
- createdAt
- updatedAt

Employee collection:

- name
- email
- phone
- department
- jobTitle
- status
- createdBy
- createdAt
- updatedAt

### API Design

Authentication APIs:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Employee APIs:

- `GET /api/employees`
- `POST /api/employees`
- `POST /api/employees/bulk`
- `GET /api/employees/:id`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

Additional APIs:

- `GET /api/activity`
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id/role`

## Chapter 5: System Implementation

The backend is implemented with Node.js and Express.js. MongoDB connection is handled through Mongoose. User passwords are hashed with bcryptjs before saving. JWT tokens are generated during login and registration. Protected middleware validates tokens before allowing access to private routes.

The frontend is implemented with React and Vite. React Router manages public and protected routes. Axios handles API communication. The dashboard provides employee statistics, recent activity, status summaries, and department summaries. Separate pages are provided for employee listing, employee details, employee creation, employee editing, CSV import, departments, profile, users, and activity logs.

## Chapter 6: Testing

Testing includes authentication testing, route protection testing, employee CRUD testing, role-based access testing, frontend workflow testing, and deployment verification. Important scenarios include invalid login, missing token, adding a valid employee, editing employee details, deleting records, verifying department-head restrictions, and verifying normal user read-only restrictions.

## Chapter 7: Results And Discussion

The system successfully provides a centralized employee management workflow. The dashboard allows users to view employee counts and navigate to the required modules. JWT authentication improves security, while role-based and department-based controls protect data privacy. The application is deployed using MongoDB Atlas and Render.

## Chapter 8: Conclusion And Future Scope

The project demonstrates a complete MERN stack application with authentication, authorization, CRUD operations, testing, documentation, and cloud deployment. It meets the main requirements of an employee management system for basic company operations.

Future improvements can include password reset, employee profile photos, attendance management, salary records, department reports, export to Excel/PDF, advanced admin dashboard, and audit logs.

## Chapter 9: References

1. MongoDB Documentation: https://www.mongodb.com/docs/
2. Mongoose Documentation: https://mongoosejs.com/docs/
3. Express.js Documentation: https://expressjs.com/
4. Node.js Documentation: https://nodejs.org/docs/
5. React Documentation: https://react.dev/
6. Vite Documentation: https://vitejs.dev/
7. JSON Web Token Introduction: https://jwt.io/introduction
8. bcryptjs Package: https://www.npmjs.com/package/bcryptjs
9. Render Documentation: https://render.com/docs
10. MongoDB Atlas Documentation: https://www.mongodb.com/docs/atlas/

## Chapter 10: Appendices

Appendix material includes screenshots of the login page, dashboard, employee records page, add form, CSV import, user management, deployed application, and GitHub repository. Source code is maintained in the GitHub repository.
