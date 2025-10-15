import { useState } from 'react'
import { authApi } from '../api/client'
import { useNavigate } from 'react-router-dom'
import { setAuthToken } from '../api/client'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const { data } = await authApi.post('/auth/login', { username, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      localStorage.setItem('userId', String(data.user.id))
      setAuthToken(data.token)
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/student')
    } catch (err: any) {
      setError('Invalid credentials')
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: 24, display: 'grid', gap: 12 }}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  )
}


