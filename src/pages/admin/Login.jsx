import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Lock, Mail } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

// Temporary admin credentials (replace with Supabase auth later)
const ADMIN_EMAIL    = 'admin@pirasha.ai'
const ADMIN_PASSWORD = 'admin123'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const setUser    = useAuthStore(s => s.setUser)
  const navigate   = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simple auth check (replace with Supabase later)
    await new Promise(r => setTimeout(r, 800))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ email, name: 'Admin' }, 'admin')
      navigate('/admin')
    } else {
      setError('Invalid email or password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0920] to-[#1e1133] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
            <MessageSquare size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">AI Platform</h1>
          <p className="text-violet-400 text-sm mt-1">Admin Panel — Sign in</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@pirasha.ai"
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full justify-center mt-2" size="lg">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

          </form>
        </div>

        <p className="text-center text-violet-600 text-xs mt-6">
          AI Platform v1.0 · Admin Access Only
        </p>
      </div>
    </div>
  )
}
