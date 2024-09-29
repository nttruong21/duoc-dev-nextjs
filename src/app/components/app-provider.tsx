"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

const Context = createContext({
  token: "",
  setToken: (value: string) => {},
});

const AppProvider: FC<
  PropsWithChildren & {
    initialToken?: string;
  }
> = ({ initialToken = "", children }) => {
  const [token, setToken] = useState(initialToken);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);

export default AppProvider;
