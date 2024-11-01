import { create } from "zustand";

interface AuthState {
    user: any;
    repositories: any[];
    setUser: (user: any) => void;
    setRepositories: (repos: any[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    repositories: [],
    setUser: (user) => set({ user }),
    setRepositories: (repos) => set({ repositories: repos }),
}));
