import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import SendTransaction from "./pages/SendTransaction";
import ContractTester from "./pages/ContractTester";
import BatchTransfer from "./pages/BatchTransfer";
import RecurringPayment from "./pages/RecurringPayment";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { config } from "../config/wagmi";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/send",
    element: <SendTransaction />,
  },
  {
    path: "/contract-tester",
    element: <ContractTester />,
  },
  {
    path: "/batch-transfer",
    element: <BatchTransfer />,
  },
  {
    path: "/recurring-payment",
    element: <RecurringPayment />,
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider theme="midnight">
            <RouterProvider router={router} />
            <Analytics />
            <SpeedInsights />
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;
