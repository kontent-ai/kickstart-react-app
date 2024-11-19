import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/LandingPage.tsx";
import { AppContextComponent } from "./context/AppContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth0ProviderWithRedirect from "./components/auth/AuthProviderWithRedirect.tsx";

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
          <AppContextComponent>
            <LandingPage />
          </AppContextComponent>
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
