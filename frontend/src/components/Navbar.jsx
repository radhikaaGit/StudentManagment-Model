import React from "react";
import { getRole } from "../services/authService";

function Navbar() {
  const role = getRole() || "User";

  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Student Management
        </h2>
        <p className="text-xs text-slate-500">
          Manage your students and courses
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            {role === "ADMIN" ? "Admin" : "User"}
          </p>
          <p className="text-xs text-slate-500">
            {role === "ADMIN" ? "Administrator" : "Standard User"}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
          {role === "ADMIN" ? "A" : "U"}
        </div>
      </div>
    </header>
  );
}

export default Navbar;