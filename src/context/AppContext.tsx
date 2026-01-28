import { useAuth0 } from "@auth0/auth0-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, type FC, type PropsWithChildren, useContext } from "react";
import { useParams } from "react-router-dom";
import { loadPreviewApiKey } from "../utils/api.ts";

type AppContext = {
  environmentId: string;
  apiKey: string;
};

const environmentId = import.meta.env.VITE_ENVIRONMENT_ID as string | undefined;
const apiKey = import.meta.env.VITE_DELIVERY_API_KEY as string | undefined;

if (!environmentId || !apiKey) {
  throw new Error("Missing environment variables");
}

const defaultAppContext: AppContext = {
  environmentId: environmentId,
  apiKey: apiKey,
};

const AppContext = createContext<AppContext>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextComponent: FC<PropsWithChildren> = ({ children }) => {
  const { envId } = useParams();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const contextData = useSuspenseQuery({
    queryKey: [`env-data${envId ? `-${envId}` : ""}`],
    queryFn: async () => {
      if (!envId) {
        return defaultAppContext;
      }
      return await getAccessTokenSilently()
        .then(async (res) => {
          return await loadPreviewApiKey({
            accessToken: res,
            environmentId: envId,
          });
        })
        .then((res) => {
          if (!res) {
            throw new Error("Could not obtain preview API KEY");
          }

          return { environmentId: envId, apiKey: res };
        })
        .catch(async (err: unknown) => {
          const error = err as { error?: string };
          if (error.error === "login_required") {
            await loginWithRedirect();
          }
          if (error.error === "consent_required") {
            await loginWithRedirect();
          }
          throw err;
        });
    },
  });

  return <AppContext.Provider value={contextData.data}>{children}</AppContext.Provider>;
};
