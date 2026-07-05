# Deployment Guide

## MongoDB Atlas

1. Create a free MongoDB Atlas cluster.
2. Create a database user and password.
3. Allow network access from Render or use `0.0.0.0/0` for demo deployment.
4. Copy the connection string and replace username, password, and database name.

## Backend On Render

1. Create a new Web Service.
2. Connect the GitHub repository.
3. Set root directory to `server`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `CLIENT_URL`
   - `ADMIN_INVITE_CODE`
7. Deploy and verify `/api/health`.

## Frontend On Vercel Or Netlify

1. Create a new frontend project from the GitHub repository.
2. Set root directory to `client`.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-render-service.onrender.com/api`
6. Deploy and test login and employee CRUD.

## Final Submission Checklist

- GitHub repository link added to report.
- Frontend deployed URL added to report.
- Backend health URL added to report.
- Screenshots added for login, dashboard, employee list, add/edit, database, deployment, and GitHub.
