import { http } from "wagmi";
import { mainnet, sepolia, baseSepolia, base } from "wagmi/chains";
import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: "YOUR_WALLET_CONNECT_PROJECT_ID", // Replace with your project ID
    chains: [mainnet, sepolia, baseSepolia, base],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [baseSepolia.id]: http(),
      [base.id]: http(),
    },
    appName: "Etherflow",
  })
);
