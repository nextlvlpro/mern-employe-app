# API Test Cases

## Authentication

| Test Case | Endpoint | Input | Expected Result |
| --- | --- | --- | --- |
| Register user | `POST /api/auth/register` | name, email, password | 201 response with user and token |
| Register duplicate email | `POST /api/auth/register` | existing email | 409 duplicate message |
| Login valid user | `POST /api/auth/login` | valid email and password | 200 response with user and token |
| Login invalid user | `POST /api/auth/login` | wrong password | 401 invalid credentials |
| Get current user | `GET /api/auth/me` | valid Bearer token | 200 current user |
| Missing token | `GET /api/auth/me` | no token | 401 unauthorized |

## Employees

| Test Case | Endpoint | Input | Expected Result |
| --- | --- | --- | --- |
| Create employee | `POST /api/employees` | employee form data | 201 employee record |
| List employees | `GET /api/employees` | valid token | 200 employee array |
| Search employees | `GET /api/employees?search=hr` | valid token | filtered employee array |
| Filter status | `GET /api/employees?status=Active` | valid token | active employees only |
| Update employee | `PUT /api/employees/:id` | updated fields | 200 updated record |
| Delete employee | `DELETE /api/employees/:id` | employee id | 200 success message |
| Access other user's employee | any employee id route | normal user token | 404 not found |

## Frontend Scenarios

- Register a new user and confirm dashboard opens.
- Log out and log back in.
- Add one employee and confirm it appears in the table.
- Edit employee department or status.
- Search by department.
- Delete employee and confirm count updates.
