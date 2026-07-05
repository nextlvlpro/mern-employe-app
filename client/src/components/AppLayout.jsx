import { Building2, FileSpreadsheet, LayoutDashboard, LogOut, Menu, Network, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={collapsed ? 'layout sidebar-collapsed' : 'layout'}>
      <aside className="sidebar">
        <div className="sidebar-head">
          <div className="company-logo">
            <Building2 size={24} />
            <div className="sidebar-text">
              <strong>BluePeak HR</strong>
              <span>PeopleDesk</span>
            </div>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="nav-menu">
          <NavLink to="/dashboard" title="Dashboard">
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/employees" title="Employees">
            <Users size={18} /> <span>Employees</span>
          </NavLink>
          <NavLink to="/departments" title="Departments">
            <Network size={18} /> <span>Departments</span>
          </NavLink>
          <NavLink to="/employees/new" title="Add Employee">
            <UserPlus size={18} /> <span>Add Employee</span>
          </NavLink>
          <NavLink to="/employees/import" title="Import CSV">
            <FileSpreadsheet size={18} /> <span>Import CSV</span>
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
