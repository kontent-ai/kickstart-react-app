import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/LandingPage.tsx";
import { AppContextComponent } from "./context/AppContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPage from "./pages/BlogPage.tsx";
import Layout from "./components/Layout.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
      {
        path: "/blog/:slug",
        Component: BlogDetail,
      },
    ],
  },
  // {
  //   path: "/:envId",
  //   element: (
  //     <Auth0ProviderWithRedirect>
  //       <QueryClientProvider client={queryClient}>
  //         <ErrorBoundary
  //           fallbackRender={({ error }) => (
  //             <div>
  //               There was an error! <pre>{error.message}</pre>
  //             </div>
  //           )}
  //         >
  //           <Suspense
  //             fallback={
  //               <div className="flex w-screen h-screen justify-center">
  //                 <Loader />
  //               </div>
  //             }
  //           >
  //             <AppContextComponent>
  //               <LandingPage />
  //             </AppContextComponent>
  //           </Suspense>
  //         </ErrorBoundary>
  //       </QueryClientProvider>
  //     </Auth0ProviderWithRedirect>
  //   ),
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextComponent>
        <RouterProvider router={router} />
      </AppContextComponent>
    </QueryClientProvider>
  </StrictMode>,
);
