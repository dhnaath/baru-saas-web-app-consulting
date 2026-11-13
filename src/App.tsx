import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./core/session";
import { PenyediaProfil } from "./lib/profile";
import { getRouter } from "./router";

const queryClient = new QueryClient();
const router = getRouter(queryClient);

export default function App() {
  return (
    <SessionProvider queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PenyediaProfil>
          <RouterProvider router={router} />
        </PenyediaProfil>
      </QueryClientProvider>
    </SessionProvider>
  );
}
