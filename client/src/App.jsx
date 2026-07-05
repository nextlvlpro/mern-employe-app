import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { useAuth } from './context/AuthContext.jsx';
import ActivityPage from './pages/ActivityPage.jsx';
import AddEmployeePage from './pages/AddEmployeePage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage.jsx';
import EditEmployeePage from './pages/EditEmployeePage.jsx';
import EmployeesPage from './pages/EmployeesPage.jsx';
import ImportEmployeesPage from './pages/ImportEmployeesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UsersPage from './pages/UsersPage.jsx';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <main className="center-screen">Loading...</main>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={(
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          )}
        />
        <Route
          path="/register"
          element={(
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          )}
        />
        <Route
          element={(
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          )}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/new" element={<AddEmployeePage />} />
          <Route path="/employees/import" element={<ImportEmployeesPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/activity" element={<ActivityPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
