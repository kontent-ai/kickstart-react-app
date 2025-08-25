import { createContext, ParentComponent, useContext } from "solid-js";

type AppContextType = {
  environmentId: string;
  apiKey: string;
};

const defaultAppContext: AppContextType = {
  environmentId: import.meta.env.VITE_ENVIRONMENT_ID!,
  apiKey: import.meta.env.VITE_DELIVERY_API_KEY!,
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextComponent: ParentComponent = (props) => {
  return (
    <AppContext.Provider value={defaultAppContext}>
      {props.children}
    </AppContext.Provider>
  );
};
