import { Auth0Provider } from "@auth0/auth0-react";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithRedirect: FC<PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = () => {
    navigate("/");
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID!}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        audience: "https://app.kenticocloud.com/",
        redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
        scope: "openid",
        responseType: "token id_token",
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithRedirect;
