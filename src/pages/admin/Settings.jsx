import { useState } from 'react'
import Button from '../../components/ui/Button'
import { Save, CheckCircle } from 'lucide-react'

export default function Settings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Platform configuration</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-50">🔧 Platform Config</h3>

        {[
          { label: 'Platform Name', placeholder: 'AI Platform', key: 'name' },
          { label: 'Admin Email',   placeholder: 'admin@pirasha.ai', key: 'email' },
          { label: 'n8n Base URL',  placeholder: 'https://pirasha.app.n8n.cloud', key: 'n8n' },
          { label: 'OpenAI API Key', placeholder: 'sk-...', key: 'openai', type: 'password' },
        ].map(({ label, placeholder, key, type = 'text' }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input type={type} placeholder={placeholder}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition" />
          </div>
        ))}

        <Button onClick={handleSave} size="lg">
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Settings</>}
        </Button>
      </div>
    </div>
  )
}
