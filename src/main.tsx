import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/LandingPage.tsx";
import { AppContextComponent } from "./context/AppContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <AppContextComponent>
          <LandingPage />
        </AppContextComponent>
      </QueryClientProvider>
    ),
  },
  {
    path: "/:envId",
    element: (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH_DOMAIN}
        clientId={import.meta.env.VITE_AUTH_CLIENT_ID!}
        authorizationParams={{
          audience: "https://app.kenticocloud.com/",
          redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
          scope: "openid",
          responseType: "token id_token",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AppContextComponent>
            <LandingPage />
          </AppContextComponent>
        </QueryClientProvider>
      </Auth0Provider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
