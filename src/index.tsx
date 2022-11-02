import React from "react";

import { createRoot } from "react-dom/client";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
