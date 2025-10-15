import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Student Grievance Portal</h1>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/student">Student</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </div>
  )
}


