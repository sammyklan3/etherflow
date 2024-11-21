import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import SendTransaction from "./pages/SendTransaction";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from 'connectkit';
import { config } from "../config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },

  {
    path: "/send",
    element: <SendTransaction />
  }
]);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="midnight">
            <RouterProvider router={router} />
        </ConnectKitProvider>
          </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;