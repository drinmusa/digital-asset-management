import { create } from "zustand";
import { getToken } from "../utils/auth";
import api from "../utils/axios";

interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  role: localStorage.getItem("role"),
  isAuthenticated: false,
  isAuthChecked: false,

  login: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    set({ token, role, isAuthenticated: true, isAuthChecked: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({
      token: null,
      role: null,
      isAuthenticated: false,
      isAuthChecked: true,
    });
  },

  checkAuth: async () => {
    set({ isAuthChecked: false });
    const token = getToken();

    if (!token) {
      set({
        token: null,
        role: null,
        isAuthenticated: false,
        isAuthChecked: true,
      });
      return;
    }

    try {
      const response = await api.get("/auth/verify");
      const { role, valid } = response.data;
      if (!valid) {
        // Token invalid or expired
        set({
          token: null,
          role: null,
          isAuthenticated: false,
          isAuthChecked: true,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return;
      }

      set({
        token,
        role,
        isAuthenticated: true,
        isAuthChecked: true,
      });
    } catch (error) {
      console.error("Auth verification failed", error);
      set({
        token: null,
        role: null,
        isAuthenticated: false,
        isAuthChecked: true,
      });
    }
  },
}));
