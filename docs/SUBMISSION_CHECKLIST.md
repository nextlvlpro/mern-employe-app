# Submission Checklist

## App Screenshots

- Login page
- Register page
- Dashboard with stats and recent activity
- Employee list with search/filter/pagination
- Add employee page
- Employee details page
- Edit employee page
- CSV import page with valid preview and validation errors
- Departments page
- Activity page
- Profile page
- Admin users page

## Backend And Database Screenshots

- MongoDB Compass or Atlas database collections
- `users` collection
- `employees` collection
- `activitylogs` collection
- Backend health URL: `http://localhost:5000/api/health`

## GitHub And Deployment Screenshots

- GitHub repository home page
- Latest commit history
- Render backend service dashboard
- Render web service dashboard
- MongoDB Atlas cluster dashboard

## Final Checks

- Run `npm run stop:dev`
- Run `npm run dev`
- Open `http://localhost:5173`
- Login with `admin@example.com` and `password123`
- Run `npm run test:e2e`
- Confirm `.env`, `node_modules/`, and `dist/` are not committed
