import { User } from "types/User";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: any) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  user: JSON.parse(localStorage.getItem("user-info") || "{}"),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
