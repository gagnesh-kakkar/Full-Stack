import { useEffect, useState } from 'react'
import { getAllGrievances, updateGrievanceStatus } from '../api'

export default function AdminDashboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState(null)

  const load = async () => {
    try {
      setError('')
      const data = await getAllGrievances()
      setItems(data)
    } catch (e) {
      setError(e.message || 'Failed to load grievances')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="dash">
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>All Grievances</h3>
        {error && <div className="alert error">{error}</div>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
          {items.map(g => (
            <li key={g.id} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 700 }}>{g.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{new Date(g.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ color: 'var(--muted)' }}>{g.description}</div>
              <div style={{ marginTop: 6, fontSize: 13 }}>
                <strong>Status:</strong> {g.status} · <strong>Student:</strong> {g.studentName} (#{g.studentId})
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  className="btn secondary"
                  onClick={async () => { setSavingId(g.id); setError(''); try { await updateGrievanceStatus(g.id, 'IN_PROGRESS'); await load(); } catch(e){ setError(e.message || 'Update failed'); } finally { setSavingId(null); } }}
                  disabled={savingId === g.id || g.status === 'IN_PROGRESS' || g.status === 'RESOLVED'}
                >{savingId === g.id ? 'Saving…' : 'Mark In Progress'}</button>
                <button
                  className="btn primary"
                  onClick={async () => { setSavingId(g.id); setError(''); try { await updateGrievanceStatus(g.id, 'RESOLVED'); await load(); } catch(e){ setError(e.message || 'Update failed'); } finally { setSavingId(null); } }}
                  disabled={savingId === g.id || g.status === 'RESOLVED'}
                >{savingId === g.id ? 'Saving…' : 'Mark Resolved'}</button>
              </div>
            </li>
          ))}
          {items.length === 0 && <li className="muted">No grievances yet.</li>}
        </ul>
      </div>
    </div>
  )
}



