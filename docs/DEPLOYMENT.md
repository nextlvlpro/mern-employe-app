# Deployment Guide

## MongoDB Atlas

1. Create a free MongoDB Atlas cluster.
2. Create a database user and password.
3. Allow network access from Render or use `0.0.0.0/0` for demo deployment.
4. Copy the connection string and replace username, password, and database name.

## Render Blueprint Deployment

The repository includes `render.yaml`, which creates one Render Web Service:

- `bluepeak-hr`: Node/Express backend that also serves the built React frontend.

1. Open Render Dashboard.
2. Click **New +**.
3. Select **Blueprint**.
4. Connect GitHub repository: `nextlvlpro/mern-employe-app`.
5. Render will detect `render.yaml`.
6. During setup, enter:
   - `MONGO_URI`: MongoDB Atlas connection string.
   - `ADMIN_INVITE_CODE`: admin registration code, for example `admin123`.
7. Let Render generate `JWT_SECRET`.
8. Deploy the Blueprint.
9. Verify backend health:
   - `https://bluepeak-hr.onrender.com/api/health`
10. Open the same service URL and test login/register:
   - `https://bluepeak-hr.onrender.com`

In production, React uses the same origin API path `/api`, so no separate frontend deployment or production CORS setup is required.

## Final Submission Checklist

- GitHub repository link added to report.
- Frontend deployed URL added to report.
- Backend health URL added to report.
- Screenshots added for login, dashboard, employee list, add/edit, database, deployment, and GitHub.
