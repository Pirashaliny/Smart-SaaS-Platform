import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useClientStore } from '../../store/clientStore'
import Button from '../../components/ui/Button'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const plans = ['free', 'starter', 'basic', 'pro']

const inputCls = "px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition w-full"
const sectionCls = "text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-50"

function Toggle({ enabled, onChange, label }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button type="button" onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-violet-600' : 'bg-gray-200'}`}>
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}

export default function NewClient() {
  const { addClient } = useClientStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', company: '',
    plan: 'free',
    status: 'pending',
    ai_personality: 'You are a helpful AI assistant for this business. Respond professionally in Tamil and English.',
    // WhatsApp
    whatsapp_number: '',
    whatsapp_phone_number_id: '',
    whatsapp_access_token: '',
    whatsapp_webhook: '',
    whatsapp_enabled: false,
    // Instagram
    instagram_account_id: '',
    instagram_access_token: '',
    instagram_webhook: '',
    instagram_enabled: false,
    // Facebook
    facebook_page_id: '',
    facebook_access_token: '',
    facebook_webhook: '',
    facebook_enabled: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) { setError('Name and Email required.'); return }
    setLoading(true)
    setError('')

    const { error: err } = await addClient({
      ...form,
      created_at: new Date().toISOString()
    })

    if (err) {
      setError('Failed to create client: ' + err.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/admin/clients'), 1500)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
          <p className="text-lg font-bold text-gray-800">Client Created!</p>
          <p className="text-gray-500 text-sm">Redirecting to clients list...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/clients">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
          <p className="text-gray-500 text-sm">Fill in client details and activate their service</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">

        {/* Basic Info */}
        <div>
          <h3 className={sectionCls}>👤 Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="John Smith" required className={inputCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="john@company.com" required className={inputCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <input value={form.company} onChange={e => set('company', e.target.value)}
                placeholder="Company Name" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Plan</label>
              <select value={form.plan} onChange={e => set('plan', e.target.value)}
                className={inputCls + ' bg-white capitalize'}>
                {plans.map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className={inputCls + ' bg-white'}>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="border border-gray-100 rounded-xl p-4">
          <Toggle enabled={form.whatsapp_enabled} onChange={v => set('whatsapp_enabled', v)}
            label="📱 WhatsApp Business" />
          {form.whatsapp_enabled && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input value={form.whatsapp_number} onChange={e => set('whatsapp_number', e.target.value)}
                  placeholder="+94771234567" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Phone Number ID</label>
                <input value={form.whatsapp_phone_number_id} onChange={e => set('whatsapp_phone_number_id', e.target.value)}
                  placeholder="126867421966..." className={inputCls} />
                <p className="text-xs text-gray-400">From Meta Developer Console</p>
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">Access Token</label>
                <input type="password" value={form.whatsapp_access_token} onChange={e => set('whatsapp_access_token', e.target.value)}
                  placeholder="EAAxxxxxxx..." className={inputCls} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">n8n Webhook URL</label>
                <input value={form.whatsapp_webhook} onChange={e => set('whatsapp_webhook', e.target.value)}
                  placeholder="https://pirasha.app.n8n.cloud/webhook/wa-clientid" className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* Instagram */}
        <div className="border border-gray-100 rounded-xl p-4">
          <Toggle enabled={form.instagram_enabled} onChange={v => set('instagram_enabled', v)}
            label="📸 Instagram" />
          {form.instagram_enabled && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Instagram Account ID</label>
                <input value={form.instagram_account_id} onChange={e => set('instagram_account_id', e.target.value)}
                  placeholder="17841xxxxxxx" className={inputCls} />
                <p className="text-xs text-gray-400">From Meta → Instagram → API Setup</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Access Token</label>
                <input type="password" value={form.instagram_access_token} onChange={e => set('instagram_access_token', e.target.value)}
                  placeholder="EAAxxxxxxx..." className={inputCls} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">n8n Webhook URL</label>
                <input value={form.instagram_webhook} onChange={e => set('instagram_webhook', e.target.value)}
                  placeholder="https://pirasha.app.n8n.cloud/webhook/ig-clientid" className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* Facebook */}
        <div className="border border-gray-100 rounded-xl p-4">
          <Toggle enabled={form.facebook_enabled} onChange={v => set('facebook_enabled', v)}
            label="📘 Facebook Page" />
          {form.facebook_enabled && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Facebook Page ID</label>
                <input value={form.facebook_page_id} onChange={e => set('facebook_page_id', e.target.value)}
                  placeholder="1234567890" className={inputCls} />
                <p className="text-xs text-gray-400">From Facebook Page → About</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Page Access Token</label>
                <input type="password" value={form.facebook_access_token} onChange={e => set('facebook_access_token', e.target.value)}
                  placeholder="EAAxxxxxxx..." className={inputCls} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm font-medium text-gray-700">n8n Webhook URL</label>
                <input value={form.facebook_webhook} onChange={e => set('facebook_webhook', e.target.value)}
                  placeholder="https://pirasha.app.n8n.cloud/webhook/fb-clientid" className={inputCls} />
              </div>
            </div>
          )}
        </div>

        {/* AI Personality */}
        <div>
          <h3 className={sectionCls}>🤖 AI Personality</h3>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">System Message</label>
            <textarea
              value={form.ai_personality}
              onChange={e => set('ai_personality', e.target.value)}
              rows={4}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition resize-none w-full"
              placeholder="Describe how the AI should behave for this client..."
            />
            <p className="text-xs text-gray-400">This becomes the AI's system message for all platforms</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? 'Creating...' : '✓ Create Client'}
          </Button>
          <Link to="/admin/clients">
            <Button variant="secondary" size="lg">Cancel</Button>
          </Link>
        </div>

      </form>
    </div>
  )
}
