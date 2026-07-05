import { Building2, LayoutDashboard, LogOut, Network, UserPlus, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="company-logo">
          <Building2 size={24} />
          <div>
            <strong>BluePeak HR</strong>
            <span>PeopleDesk</span>
          </div>
        </div>

        <nav className="nav-menu">
          <NavLink to="/dashboard">
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/employees">
            <Users size={18} /> Employees
          </NavLink>
          <NavLink to="/departments">
            <Network size={18} /> Departments
          </NavLink>
          <NavLink to="/employees/new">
            <UserPlus size={18} /> Add Employee
          </NavLink>
        </nav>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <span className="eyebrow">BluePeak Technologies</span>
            <h1>PeopleDesk</h1>
          </div>
          <div className="user-actions">
            <span>{user?.name} - {user?.role}</span>
            <button className="icon-button" onClick={logout} title="Logout" type="button">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
