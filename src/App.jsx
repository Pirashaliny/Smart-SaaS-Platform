import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

// Admin pages
import AdminLogin    from './pages/admin/Login'
import AdminLayout   from './components/admin/AdminLayout'
import Dashboard     from './pages/admin/Dashboard'
import Clients       from './pages/admin/Clients'
import NewClient     from './pages/admin/NewClient'
import ClientDetail  from './pages/admin/ClientDetail'
import Analytics     from './pages/admin/Analytics'
import Settings      from './pages/admin/Settings'

function RequireAdmin({ children }) {
  const { user, role } = useAuthStore()
  if (!user || role !== 'admin') return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin panel (protected) */}
        <Route path="/admin" element={
          <RequireAdmin><AdminLayout /></RequireAdmin>
        }>
          <Route index            element={<Dashboard />} />
          <Route path="clients"   element={<Clients />} />
          <Route path="clients/new" element={<NewClient />} />
          <Route path="clients/:id" element={<ClientDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings"  element={<Settings />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />

      </Routes>
    </BrowserRouter>
  )
}
