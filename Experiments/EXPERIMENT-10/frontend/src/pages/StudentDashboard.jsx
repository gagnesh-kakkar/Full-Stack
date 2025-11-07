import { useEffect, useState } from 'react'
import { getMyGrievances, submitGrievance } from '../api'

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem('sgp_user'))
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [items, setItems] = useState([])

  const load = async () => {
    try {
      const data = await getMyGrievances(user.id)
      setItems(data)
    } catch (e) {
      // ignore minor errors here
    }
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await submitGrievance(user.id, title, description)
      setTitle('')
      setDescription('')
      setSuccess('Grievance submitted successfully')
      await load()
    } catch (err) {
      setError(err.message || 'Failed to submit grievance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash">
      <h2>Student Dashboard</h2>
      <div className="grid">
        <div className="card">
          <h3>Submit Grievance</h3>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          <form className="form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Short summary" required />
            <label>Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your issue" required />
            <button className="btn primary" disabled={loading}>{loading ? 'Submitting…' : 'Submit'}</button>
          </form>
        </div>
        <div className="card">
          <h3>My Submissions</h3>
          {items.length === 0 && <p className="muted">No grievances yet.</p>}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
            {items.map(g => (
              <li key={g.id} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{g.title}</div>
                <div style={{ color: 'var(--muted)' }}>{g.description}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>Status: {g.status} · {new Date(g.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}



