import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  role: null, // 'admin' | 'client'
  loading: true,

  setUser: (user, role) => set({ user, role, loading: false }),
  clearUser: () => set({ user: null, role: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}))
