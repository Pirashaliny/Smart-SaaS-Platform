import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { Bell, HelpCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export default function AdminLayout() {
  const user = useAuthStore(s => s.user)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 flex-shrink-0">
          <div className="flex-1" />
          <button className="relative w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition">
            <Bell size={17} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition">
            <HelpCircle size={17} className="text-gray-500" />
          </button>
          <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
            A
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
