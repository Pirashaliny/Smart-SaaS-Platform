import { useClientStore } from '../../store/clientStore'
import { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const mockData = [
  { day: 'Mon', messages: 42 },
  { day: 'Tue', messages: 68 },
  { day: 'Wed', messages: 55 },
  { day: 'Thu', messages: 91 },
  { day: 'Fri', messages: 73 },
  { day: 'Sat', messages: 38 },
  { day: 'Sun', messages: 29 },
]

export default function Analytics() {
  const { clients, fetchClients } = useClientStore()
  useEffect(() => { fetchClients() }, [])

  const active = clients.filter(c => c.status === 'active').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform-wide performance overview</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {[
          { label: 'Total Clients', value: clients.length },
          { label: 'Active Clients', value: active },
          { label: 'Messages This Week', value: '396' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-5">Messages Per Day (This Week)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="messages" fill="#7c3aed" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
