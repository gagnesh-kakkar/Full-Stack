import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { setAuthToken } from './api/client'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import GrievanceDetail from './pages/GrievanceDetail'

// hydrate auth header from existing token
setAuthToken(localStorage.getItem('token') || undefined)

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/student', element: <StudentDashboard /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/grievances/:id', element: <GrievanceDetail /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


