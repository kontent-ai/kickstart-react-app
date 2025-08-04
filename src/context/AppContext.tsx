import { createContext, FC, PropsWithChildren, useContext } from "react";

type AppContext = {
  environmentId: string;
  apiKey: string;
};

const defaultAppContext: AppContext = {
  environmentId: import.meta.env.VITE_ENVIRONMENT_ID!,
  apiKey: import.meta.env.VITE_DELIVERY_API_KEY!,
};

const AppContext = createContext<AppContext>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppContext.Provider value={defaultAppContext}>
      {children}
    </AppContext.Provider>
  );
};
