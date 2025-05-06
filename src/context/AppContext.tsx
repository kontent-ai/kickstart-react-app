import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useParams } from "react-router-dom";

type AppContext = {
  environmentId: string;
  apiKey: string;
  collection: string;
};

const defaultAppContext: AppContext = {
  environmentId: import.meta.env.VITE_ENVIRONMENT_ID!,
  apiKey: import.meta.env.VITE_DELIVERY_API_KEY!,
  collection: import.meta.env.VITE_COLLECTION!,
};

const AppContext = createContext<AppContext>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextComponent: FC<PropsWithChildren> = ({ children }) => {
  const { envId } = useParams();

  const contextData = useSuspenseQuery({
    queryKey: [`env-data${envId ? `-${envId}` : ""}`],
    queryFn: () => {
      if (!envId) {
        return defaultAppContext;
      }
      return {
        environmentId: envId,
        apiKey: import.meta.env.VITE_DELIVERY_API_KEY!,
        collection: import.meta.env.VITE_COLLECTION!,
      };
    },
  });

  return (
    <AppContext.Provider value={contextData.data}>
      {children}
    </AppContext.Provider>
  );
};
