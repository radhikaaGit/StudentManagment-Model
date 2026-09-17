import React from 'react'
import { BrowserRouter, Routes , Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Courses from './pages/Courses'
import AdminPanel from './pages/AdminPanel'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
  <>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Navigate to="/login" />}/>
   <Route path="/login" element={<Login />}/>

   <Route path="/register" element={<Register />} />

    {/* Application - login ke bina access nahi hoga */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/students"
      element={
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      }
    />
    <Route
      path="/courses"
      element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin-panel"
      element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      }
    />

    {/* Wrong URL */}
    <Route path="*" element={<NotFound />} />
     
   

  </Routes>
   </BrowserRouter>
  </>
  );
  
}

export default App