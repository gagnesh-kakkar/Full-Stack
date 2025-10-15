import { useState } from 'react'
import { authApi } from '../api/client'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'STUDENT'|'ADMIN'>('STUDENT')
  const [msg, setMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    await authApi.post('/auth/register', { username, password, role })
    setMsg('Registered. You can login now.')
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: 24, display: 'grid', gap: 12 }}>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value as any)}>
        <option value="STUDENT">STUDENT</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button type="submit">Register</button>
      {msg && <div>{msg}</div>}
    </form>
  )
}


