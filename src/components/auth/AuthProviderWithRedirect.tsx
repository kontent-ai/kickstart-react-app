import { Auth0Provider } from "@auth0/auth0-react";
import type { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_AUTH_DOMAIN as string | undefined;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID as string | undefined;
const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URL as string | undefined;

if (!domain || !clientId || !redirectUri) {
  throw new Error("Missing environment variables");
}

const Auth0ProviderWithRedirect: FC<PropsWithChildren<object>> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = async () => {
    await navigate("/");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        audience: "https://app.kenticocloud.com/",
        redirect_uri: redirectUri,
        scope: "openid",
        responseType: "token id_token",
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithRedirect;
