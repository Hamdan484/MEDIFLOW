import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      patient: null,
      pharmacist: null,

      setPatient: (patient) => set({ patient }),
      setPharmacist: (pharmacist) => set({ pharmacist }),

      logoutPatient: () => set({ patient: null }),
      logoutPharmacist: () => set({ pharmacist: null }),
    }),
    {
      name: "mediflow-auth",
    }
  )
);