import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../api'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      localStorage.setItem('sgp_user', JSON.stringify(user))
      onLogin(user)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p className="subtitle">Sign in as Student or Admin</p>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        <button className="btn primary" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
      </form>
      <div className="muted">New here? <Link to="/register">Create a student account</Link></div>
      <div className="tip">
        <strong>Admin demo:</strong> admin@portal.com / admin123
      </div>
    </div>
  )
}




