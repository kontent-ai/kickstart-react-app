import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/LandingPage.tsx";
import { AppContextComponent } from "./context/AppContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth0ProviderWithRedirect from "./components/auth/AuthProviderWithRedirect.tsx";
import Loader from "./components/Loader.tsx";
import { ErrorBoundary } from "react-error-boundary";

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
      <Auth0ProviderWithRedirect>
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
