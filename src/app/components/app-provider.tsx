"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { isServerSide } from "@/lib/utils";
import clientSession from "@/services/clientSession";

const Context = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AppProvider: FC<
  PropsWithChildren & {
    initialToken?: string;
  }
> = ({ children, initialToken }) => {
  useState(() => {
    if (!initialToken || isServerSide()) {
      return;
    }
    clientSession.token = initialToken;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!initialToken);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export default AppProvider;
