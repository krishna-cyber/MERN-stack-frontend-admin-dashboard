import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logOut: () => set({ user: null }),
  }))
);
