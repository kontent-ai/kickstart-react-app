import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext } from "react";

type AppContext = {
  environmentId: string;
  apiKey: string;
};

const defaultAppContext = {
  environmentId: import.meta.env.VITE_ENVIRONMENT_ID!,
  apiKey: import.meta.env.VITE_DELIVERY_API_KEY!,
};

const AppContext = createContext<AppContext>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

const queryClient = new QueryClient();

export const AppContextComponent: FC<PropsWithChildren> = ({ children }) => (
  <AppContext.Provider value={defaultAppContext}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </AppContext.Provider>
);
