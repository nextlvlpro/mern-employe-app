# BluePeak HR - Employee Management System

Academic employee management project built with the MERN stack. The running app uses a fictional company brand, **BluePeak HR**, so the interface looks like a normal workplace system instead of a project template.

## Student Details

- Student: Bhanu Sharma
- Enrollment: O24MCA112292
- Course: MCA Full Stack Development
- University: Chandigarh University
- Academic Year: 2024-2026
- Guide/Mentor: Alok Srivastva

## Features

- User registration and login with JWT authentication
- Role-based authorization for admin and user accounts
- Employee create, read, update, and delete operations
- Search/filter employees by name, email, department, and job title
- Separate pages for dashboard, employee list, add employee, and edit employee
- Refresh-safe frontend routes for Netlify and Vercel deployment
- MongoDB database with Mongoose models

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, bcryptjs
- Deployment target: Render + MongoDB Atlas + Vercel/Netlify

## Local Setup

Install Node.js LTS and Git first. Then run:

```bash
npm run install-all
```

Create `server/.env` from `server/.env.example` and `client/.env` from `client/.env.example`.

Run both apps:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Main app routes:

- `/login`
- `/register`
- `/dashboard`
- `/employees`
- `/employees/new`
- `/employees/:id/edit`

## API Overview

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Employees:

- `GET /api/employees`
- `POST /api/employees`
- `GET /api/employees/:id`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

## Deployment Notes

1. Create a MongoDB Atlas cluster and copy the connection string.
2. Deploy `server/` on Render as a Web Service.
3. Set backend environment variables from `server/.env.example`.
4. Deploy `client/` on Vercel or Netlify.
5. Set `VITE_API_URL` to the deployed backend URL.
6. Update this README with final deployed links.
