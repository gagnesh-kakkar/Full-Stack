import { useEffect, useState } from 'react'
import { grievanceApi, reportApi } from '../api/client'

type Grievance = { id: number; subject: string; description: string; status: string }

export default function AdminDashboard() {
  const [list, setList] = useState<Grievance[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [stats, setStats] = useState<any>(null)

  async function refresh() {
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    const { data } = await grievanceApi.get(`/grievances?${params.toString()}`)
    setList(data)
    const statsRes = await reportApi.get('/grievances/stats')
    setStats(statsRes.data)
  }

  useEffect(() => { refresh() }, [statusFilter])

  async function setStatus(id: number, status: string) {
    await grievanceApi.put(`/grievances/${id}/status`, { status })
    refresh()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <label>
        Filter by status:
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="NEW">NEW</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </label>
      <div style={{ margin: '12px 0' }}>
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      </div>
      <ul>
        {list.map(g => (
          <li key={g.id}>
            <b>{g.subject}</b> - {g.status}
            <select value={g.status} onChange={e => setStatus(g.id, e.target.value)} style={{ marginLeft: 8 }}>
              <option value="NEW">NEW</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}


