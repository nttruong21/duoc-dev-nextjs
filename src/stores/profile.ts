import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Types
// States
interface States {
  isHydrated: boolean;
  id?: number;
  name?: string;
  email?: string;
}

// Actions
interface Actions {
  set: (value: Omit<States, "isHydrated">) => void;
  reset: () => void;
  setIsHydrated: (value: boolean) => void;
}

// Store
export type ProfileStore = States & Actions;

// Constants
export const defaultInitialState: States = {
  isHydrated: false,
  id: undefined,
  name: undefined,
  email: undefined,
};

// Define store
const profileStore: StateCreator<ProfileStore> = (set) => ({
  // States
  ...defaultInitialState,

  // Actions
  set: (value) =>
    set((state) => ({
      id: value.id !== undefined ? value.id : state.id,
      name: value.name !== undefined ? value.name : state.name,
      email: value.email !== undefined ? value.email : state.email,
    })),
  reset: () => set({ ...defaultInitialState }),
  setIsHydrated: (value) => set({ isHydrated: value }),
});

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(profileStore, {
      name: "profile-store",
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            throw new Error(
              "An error happened during profile store hydration",
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

export default useProfileStore;
