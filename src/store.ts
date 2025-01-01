import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Tenant {
  _id: string;
  name: string;
  address: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  tenantId?: Tenant;
}

interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
    logOut: () => set({ user: null }),
  }))
);
