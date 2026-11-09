import { useEffect } from 'react'
import { useClientStore } from '../../store/clientStore'
import { Users, MessageSquare, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../../components/ui/Badge'

export default function AdminDashboard() {
  const { clients, fetchClients, loading } = useClientStore()

  useEffect(() => { fetchClients() }, [])

  const total    = clients.length
  const active   = clients.filter(c => c.status === 'active').length
  const pending  = clients.filter(c => c.status === 'pending').length
  const inactive = clients.filter(c => c.status === 'inactive').length

  const kpis = [
    { label: 'Total Clients',   value: total,    icon: Users,          color: 'bg-violet-50 text-violet-600' },
    { label: 'Active',          value: active,   icon: CheckCircle,    color: 'bg-green-50 text-green-600'   },
    { label: 'Pending Setup',   value: pending,  icon: Clock,          color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Total Messages',  value: '—',      icon: MessageSquare,  color: 'bg-blue-50 text-blue-600'     },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your SaaS platform</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-800">Recent Clients</h2>
          <Link to="/admin/clients" className="text-sm text-violet-600 hover:underline font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center">
            <Users size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No clients yet</p>
            <p className="text-gray-400 text-sm mt-1">Add your first client to get started</p>
            <Link to="/admin/clients/new" className="inline-block mt-4 px-4 py-2 bg-violet-600 text-white text-sm rounded-lg font-medium hover:bg-violet-700 transition">
              + Add Client
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3">Client</th>
                <th className="text-left px-6 py-3">Company</th>
                <th className="text-left px-6 py-3">WhatsApp</th>
                <th className="text-left px-6 py-3">Plan</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clients.slice(0, 5).map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
                        {client.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{client.name}</p>
                        <p className="text-xs text-gray-400">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client.company || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client.whatsapp_number || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full capitalize">
                      {client.plan || 'free'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={client.status || 'pending'} />
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/clients/${client.id}`} className="text-violet-600 hover:underline text-sm font-medium">
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}
