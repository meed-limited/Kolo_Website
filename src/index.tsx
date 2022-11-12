import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import App from "./App";
import { chains } from "./web3/network";

const { provider, webSocketProvider } = configureChains(
  [...chains],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const current = chains.find((item) => item.id === chain.id);
        if (current) return { http: current?.rpcUrls?.default };
        return null;
      }
    })
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains: chains }),
    new CoinbaseWalletConnector({
      chains: chains,
      options: {
        appName: "wagmi"
      }
    }),
    new WalletConnectConnector({
      chains: chains,
      options: {
        qrcode: true
      }
    })
  ],
  provider,
  webSocketProvider
});

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
