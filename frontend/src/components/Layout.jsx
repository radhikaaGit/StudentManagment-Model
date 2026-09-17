import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="pt-20 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;