import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth0ProviderWithRedirect from "./components/auth/AuthProviderWithRedirect.tsx";
import Loader from "./components/Loader.tsx";
import { AppContextComponent } from "./context/AppContext.tsx";
import LandingPage from "./pages/LandingPage.tsx";

const queryClient = new QueryClient();

const domain = import.meta.env.VITE_AUTH_DOMAIN as string | undefined;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID as string | undefined;
const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URL as string | undefined;

if (!domain || !clientId || !redirectUri) {
  const missing = [
    !domain && "VITE_AUTH_DOMAIN",
    !clientId && "VITE_AUTH_CLIENT_ID",
    !redirectUri && "VITE_AUTH_REDIRECT_URL",
  ]
    .filter(Boolean)
    .join(", ");
  console.warn(
    `Missing ${missing}. Auth0 is disabled for this dev session — routes requiring auth will not work. See .env.template.`,
  );
}

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
  ...(domain && clientId && redirectUri
    ? [
        {
          path: "/:envId",
          element: (
            <Auth0ProviderWithRedirect
              domain={domain}
              clientId={clientId}
              redirectUri={redirectUri}
            >
              <QueryClientProvider client={queryClient}>
                <ErrorBoundary
                  fallbackRender={({ error }) => (
                    <div>
                      There was an error!{" "}
                      <pre>{error instanceof Error ? error.message : String(error)}</pre>
                    </div>
                  )}
                >
                  <Suspense
                    fallback={
                      <div className="flex w-screen h-screen justify-center">
                        <Loader />
                      </div>
                    }
                  >
                    <AppContextComponent>
                      <LandingPage />
                    </AppContextComponent>
                  </Suspense>
                </ErrorBoundary>
              </QueryClientProvider>
            </Auth0ProviderWithRedirect>
          ),
        },
      ]
    : []),
]);

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
