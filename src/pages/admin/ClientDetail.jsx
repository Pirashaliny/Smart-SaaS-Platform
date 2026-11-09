import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useClientStore } from '../../store/clientStore'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { ArrowLeft, Save, Trash2, CheckCircle, XCircle } from 'lucide-react'

const inputCls = "px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition w-full"

function Toggle({ enabled, onChange, label }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <button type="button" onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-violet-600' : 'bg-gray-200'}`}>
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

export default function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { clients, fetchClients, updateClient, deleteClient } = useClientStore()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)

  useEffect(() => {
    if (clients.length === 0) fetchClients()
  }, [])

  useEffect(() => {
    const client = clients.find(c => c.id === id)
    if (client) setForm({ ...client })
  }, [clients, id])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    await updateClient(id, form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleActivate = () => set('status', 'active')
  const handleSuspend  = () => set('status', 'suspended')

  const handleDelete = async () => {
    if (!confirm(`Delete client "${form?.name}"? This cannot be undone.`)) return
    await deleteClient(id)
    navigate('/admin/clients')
  }

  if (!form) return (
    <div className="p-8 text-center text-gray-400">Loading client...</div>
  )

  return (
    <div className="max-w-2xl space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/clients">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
              <Badge status={form.status || 'pending'} />
            </div>
            <p className="text-gray-400 text-sm">{form.email} · {form.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {form.status !== 'active' ? (
            <Button onClick={handleActivate} variant="primary" size="sm">
              <CheckCircle size={14} /> Activate
            </Button>
          ) : (
            <Button onClick={handleSuspend} variant="danger" size="sm">
              <XCircle size={14} /> Suspend
            </Button>
          )}
          <Button onClick={handleDelete} variant="danger" size="sm">
            <Trash2 size={14} /> Delete
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">

        {/* Basic */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-50">👤 Client Info</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'name', label: 'Full Name' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'company', label: 'Company' },
            ].map(({ key, label, type = 'text' }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <input type={type} value={form[key] || ''} onChange={e => set(key, e.target.value)}
                  className={inputCls} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Plan</label>
              <select value={form.plan || 'free'} onChange={e => set('plan', e.target.value)}
                className={inputCls + ' bg-white'}>
                {['free','starter','basic','pro'].map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="border border-gray-100 rounded-xl p-4">
          <Toggle enabled={!!form.whatsapp_enabled} onChange={v => set('whatsapp_enabled', v)} label="📱 WhatsApp Business" />
          {form.whatsapp_enabled && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input value={form.whatsapp_number || ''} onChange={e => set('whatsapp_number', e.target.value)}
                  placeholder="+94771234567" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone Number ID</label>
                <input value={form.whatsapp_phone_number_id || ''} onChange={e => set('whatsapp_phone_number_id', e.target.value)}
                  placeholder="126867421966..." className={inputCls} />
                <p className="text-xs text-gray-400">From Meta Developer Console</p>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">Access Token</label>
                <input type="password" value={form.whatsapp_access_token || ''} onChange={e => set('whatsapp_access_token', e.target.value)}
                  placeholder="EAAxxxxxxx..." className={inputCls} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">n8n Webhook URL</label>
                <input value={form.whatsapp_webhook || ''} onChange={e => set('whatsapp_webhook', e.target.value)}
                  placeholder="https://pirasha.app.n8n.cloud/webhook/wa-clientid" className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* Instagram */}
        <div className="border border-gray-100 rounded-xl p-4">
          <Toggle enabled={!!form.instagram_enabled} onChange={v => set('instagram_enabled', v)} label="📸 Instagram" />
          {form.instagram_enabled && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Instagram Account ID</label>
                <input value={form.instagram_account_id || ''} onChange={e => set('instagram_account_id', e.target.value)}
                  placeholder="17841xxxxxxx" className={inputCls} />
                <p className="text-xs text-gray-400">From Meta → Instagram → API Setup</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Access Token</label>
                <input type="password" value={form.instagram_access_token || ''} onChange={e => set('instagram_access_token', e.target.value)}
                  placeholder="EAAxxxxxxx..." className={inputCls} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">n8n Webhook URL</label>
                <input value={form.instagram_webhook || ''} onChange={e => set('instagram_webhook', e.target.value)}
                  placeholder="https://pirasha.app.n8n.cloud/webhook/ig-clientid" className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* Facebook */}
        <div className="border border-gray-100 rounded-xl p-4">
          <Toggle enabled={!!form.facebook_enabled} onChange={v => set('facebook_enabled', v)} label="📘 Facebook Page" />
          {form.facebook_enabled && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Facebook Page ID</label>
                <input value={form.facebook_page_id || ''} onChange={e => set('facebook_page_id', e.target.value)}
                  placeholder="1234567890" className={inputCls} />
                <p className="text-xs text-gray-400">From Facebook Page → About</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Page Access Token</label>
                <input type="password" value={form.facebook_access_token || ''} onChange={e => set('facebook_access_token', e.target.value)}
                  placeholder="EAAxxxxxxx..." className={inputCls} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">n8n Webhook URL</label>
                <input value={form.facebook_webhook || ''} onChange={e => set('facebook_webhook', e.target.value)}
                  placeholder="https://pirasha.app.n8n.cloud/webhook/fb-clientid" className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* AI Personality */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-50">🤖 AI Personality</h3>
          <textarea value={form.ai_personality || ''} onChange={e => set('ai_personality', e.target.value)}
            rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition resize-none"
            placeholder="System message for this client's AI..." />
          <p className="text-xs text-gray-400 mt-1">This prompt is used across WhatsApp, Instagram and Facebook</p>
        </div>

        <Button onClick={handleSave} disabled={saving} size="lg">
          {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
        </Button>

      </div>
    </div>
  )
}
