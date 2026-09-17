import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

// Login kiye bina /dashboard, /students, /courses jaise pages
// directly URL se access nahi ho sakte - isLoggedIn() false hone par
// wapas /login par bhej diya jayega.
function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;