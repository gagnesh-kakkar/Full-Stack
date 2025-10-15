import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { messageApi } from '../api/client'

type Message = { id: number; senderId: number; content: string; timestamp: string }

export default function GrievanceDetail() {
  const { id } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')

  async function load() {
    const { data } = await messageApi.get(`/grievances/${id}/messages`)
    setMessages(data)
  }

  useEffect(() => { load() }, [id])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    await messageApi.post(`/grievances/${id}/messages`, { content: text })
    setText('')
    load()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Grievance {id}</h2>
      <ul>
        {messages.map(m => (
          <li key={m.id}>{m.senderId}: {m.content}</li>
        ))}
      </ul>
      <form onSubmit={send} style={{ display: 'flex', gap: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}


