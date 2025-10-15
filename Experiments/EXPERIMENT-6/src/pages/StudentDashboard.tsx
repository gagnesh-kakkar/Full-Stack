import { useEffect, useState } from 'react'
import { grievanceApi } from '../api/client'
import { Link } from 'react-router-dom'

type Grievance = { id: number; subject: string; description: string; status: string }

export default function StudentDashboard() {
  const [list, setList] = useState<Grievance[]>([])
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  async function refresh() {
    const studentId = localStorage.getItem('userId')
    if (!studentId) return
    const { data } = await grievanceApi.get(`/grievances/student/${studentId}`)
    setList(data)
  }

  useEffect(() => { refresh() }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    await grievanceApi.post('/grievances', { subject, description })
    setSubject(''); setDescription(''); refresh()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>My Grievances</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {list.map(g => (
          <li key={g.id}>
            <Link to={`/grievances/${g.id}`}>{g.subject}</Link> - {g.status}
          </li>
        ))}
      </ul>
    </div>
  )
}


