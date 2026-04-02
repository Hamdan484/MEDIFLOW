import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { name: string }
      role: null, // 'buyer' | 'seller' | 'admin'
      token: null, // JWT Token from Python Backend

      login: (userData, role, token) => set({ user: userData, role, token }),
      logout: () => set({ user: null, role: null, token: null }),

      // Backwards compatibility for existing codebase
      patient: null,
      pharmacist: null,
      setPatient: (patient) => set({ patient }),
      setPharmacist: (pharmacist) => set({ pharmacist }),
      logoutPatient: () => set({ user: null, role: null }),
      logoutPharmacist: () => set({ user: null, role: null }),
    }),
    {
      name: "mediflow-auth",
    }
  )
);