"use client";

// Core
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// App
import { isServerSide } from "@/lib/utils";
import { Profile } from "@/services/account";
import clientSession from "@/services/clientSession";

// Initial App context
const AppContext = createContext<{
  profile?: Profile;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;
}>({
  profile: undefined,
  setProfile: () => {},
});

// Component
const AppProvider: FC<
  PropsWithChildren & {
    initialToken?: string;
    initialProfile?: Profile;
  }
> = ({ children, initialToken, initialProfile }) => {
  // States
  useState(() => {
    if (!initialToken || isServerSide()) {
      return;
    }
    clientSession.token = initialToken;
  });

  const [profile, setProfile] = useState<Profile | undefined>(initialProfile);

  // Template
  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Use app context hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export default AppProvider;
