import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";

import { NotFound } from "@/components/NotFound";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
  notFoundComponent: () => <NotFound />,
});

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
