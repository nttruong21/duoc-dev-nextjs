import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Types
// States
interface States {
  isHydrated: boolean;
  isSignedIn: boolean;
  token: string | undefined;
  tokenExpiredAt: string | undefined;
}

// Actions
interface Actions {
  setToken: (value: string) => void;
  setTokenExpiredAt: (value: string) => void;
  setIsSignedIn: (value: boolean) => void;
  reset: () => void;
  setIsHydrated: (value: boolean) => void;
}

// Store
export type AuthStore = States & Actions;

// Constants
export const defaultInitialState: States = {
  isHydrated: false,
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
  setIsHydrated: (isHydrated) => set({ isHydrated }),
});

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(authStore, {
      name: "auth-store",
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            throw new Error(
              "An error happened during auth store hydration",
              error
            );
          } else {
            state?.setIsHydrated(true);
          }
        };
      },
    })
  )
);

export default useAuthStore;
