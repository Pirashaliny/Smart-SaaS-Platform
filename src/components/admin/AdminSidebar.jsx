import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, BarChart2,
  Settings, LogOut, MessageSquare
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const navItems = [
  { to: '/admin',           icon: LayoutDashboard, label: 'Dashboard',  end: true },
  { to: '/admin/clients',   icon: Users,           label: 'Clients'              },
  { to: '/admin/analytics', icon: BarChart2,        label: 'Analytics'            },
  { to: '/admin/settings',  icon: Settings,         label: 'Settings'             },
]

export default function AdminSidebar() {
  const clearUser = useAuthStore(s => s.clearUser)

  return (
    <aside className="w-60 min-w-[240px] bg-[#0f0920] flex flex-col h-screen">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
          <MessageSquare size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">AI Platform</p>
          <p className="text-violet-400 text-xs">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive
                ? 'bg-violet-600 text-white'
                : 'text-violet-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={clearUser}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-violet-300 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut size={17} />
          Logout
        </button>
        <p className="text-center text-violet-600 text-xs mt-3">v1.0 SaaS</p>
      </div>
    </aside>
  )
}
