import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClientStore } from '../../store/clientStore'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { Plus, Search, Trash2, ExternalLink } from 'lucide-react'

export default function Clients() {
  const { clients, fetchClients, deleteClient, loading } = useClientStore()
  const [search, setSearch] = useState('')

  useEffect(() => { fetchClients() }, [])

  const filtered = clients.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete client "${name}"? This cannot be undone.`)) return
    await deleteClient(id)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 text-sm mt-1">{clients.length} total clients</p>
        </div>
        <Link to="/admin/clients/new">
          <Button>
            <Plus size={16} /> Add Client
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Loading clients...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 font-medium">No clients found</p>
            <Link to="/admin/clients/new" className="inline-block mt-4">
              <Button><Plus size={16} /> Add First Client</Button>
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3">Client</th>
                <th className="text-left px-6 py-3">Company</th>
                <th className="text-left px-6 py-3">WhatsApp</th>
                <th className="text-left px-6 py-3">Plan</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Joined</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
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
                  <td className="px-6 py-4"><Badge status={client.status || 'pending'} /></td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/clients/${client.id}`}>
                        <button className="p-1.5 rounded-lg hover:bg-violet-50 text-violet-600 transition" title="Manage">
                          <ExternalLink size={15} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(client.id, client.name)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
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
