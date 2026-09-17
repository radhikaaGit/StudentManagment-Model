import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser, isAdmin } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();
  const admin = isAdmin();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Courses", path: "/courses" },
    // Admin Panel sirf Admin ko dikhta hai
    ...(admin ? [{ name: "Admin Panel", path: "/admin-panel" }] : []),
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">

      <div className="h-20 px-6 flex items-center border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold">STUDIFY</h1>
          <p className="text-[10px] text-slate-500 tracking-wider">
            STUDENT MANAGEMENT
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-slate-800 hover:text-white text-left"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;