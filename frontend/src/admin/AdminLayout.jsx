// src/admin/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavBar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-[#42f5e6] p-4">
        <h2 className="text-2xl font-bold text-[#42f5e6] mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "text-[#42f5e6] font-semibold" : "text-white"
            }
          >
            Dashboard
          </NavLink>
          <NavLink to="/admin/transport">Manage Transport</NavLink>
          <NavLink to="/admin/routes">Manage Routes</NavLink>
          <NavLink to="/admin/voice-logs">Voice Query Logs</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-6 overflow-y-auto bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
