import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Types
// States
interface States {
  isSignedIn: boolean;
  token: string | undefined;
  tokenExpiredAt: string | undefined;
}

// Actions
interface Actions {
  setToken: (token: string) => void;
  setTokenExpiredAt: (tokenExpiredAt: string) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  reset: () => void;
}

// Store
export type AuthStore = States & Actions;

// Constants
export const defaultInitialState: States = {
  isSignedIn: false,
  token: undefined,
  tokenExpiredAt: undefined,
};

// Define store
const authStore: StateCreator<AuthStore> = (set) => ({
  // States
  ...defaultInitialState,

  // Actions
  setToken: (token) => set({ token }),
  setTokenExpiredAt: (tokenExpiredAt) => set({ tokenExpiredAt }),
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  reset: () => set({ ...defaultInitialState }),
});

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(authStore, {
      name: "auth-store",
    })
  )
);

export default useAuthStore;
