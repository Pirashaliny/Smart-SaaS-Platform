import { create } from 'zustand'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'clients'

export const useClientStore = create((set, get) => ({
  clients: [],
  loading: false,
  error: null,

  fetchClients: async () => {
    set({ loading: true, error: null })
    try {
      const q = query(collection(db, COLLECTION), orderBy('created_at', 'desc'))
      const snapshot = await getDocs(q)
      const clients = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      set({ clients, loading: false })
    } catch (err) {
      console.error('fetchClients error:', err)
      set({ error: err.message, loading: false })
    }
  },

  addClient: async (clientData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        // Basic
        name: clientData.name || '',
        email: clientData.email || '',
        company: clientData.company || '',
        plan: clientData.plan || 'free',
        status: clientData.status || 'pending',
        ai_personality: clientData.ai_personality || '',
        // WhatsApp
        whatsapp_enabled: clientData.whatsapp_enabled || false,
        whatsapp_number: clientData.whatsapp_number || '',
        whatsapp_phone_number_id: clientData.whatsapp_phone_number_id || '',
        whatsapp_access_token: clientData.whatsapp_access_token || '',
        whatsapp_webhook: clientData.whatsapp_webhook || '',
        // Instagram
        instagram_enabled: clientData.instagram_enabled || false,
        instagram_account_id: clientData.instagram_account_id || '',
        instagram_access_token: clientData.instagram_access_token || '',
        instagram_webhook: clientData.instagram_webhook || '',
        // Facebook
        facebook_enabled: clientData.facebook_enabled || false,
        facebook_page_id: clientData.facebook_page_id || '',
        facebook_access_token: clientData.facebook_access_token || '',
        facebook_webhook: clientData.facebook_webhook || '',
        // Timestamp
        created_at: serverTimestamp(),
      })
      const newClient = { id: docRef.id, ...clientData, created_at: new Date().toISOString() }
      set({ clients: [newClient, ...get().clients] })
      return { data: newClient, error: null }
    } catch (err) {
      console.error('addClient error:', err)
      return { data: null, error: err }
    }
  },

  updateClient: async (id, updates) => {
    try {
      const ref = doc(db, COLLECTION, id)
      await updateDoc(ref, { ...updates })
      const clients = get().clients.map(c => c.id === id ? { ...c, ...updates } : c)
      set({ clients })
      return { error: null }
    } catch (err) {
      console.error('updateClient error:', err)
      return { error: err }
    }
  },

  deleteClient: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION, id))
      const clients = get().clients.filter(c => c.id !== id)
      set({ clients })
      return { error: null }
    } catch (err) {
      console.error('deleteClient error:', err)
      return { error: err }
    }
  },
}))
