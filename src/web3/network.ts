import { Chain } from "wagmi";

export const ethereum: Chain = {
  id: 1,
  name: "Ethereum",
  network: "Ethereum Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_ETH}`
  },
  blockExplorers: {
    default: { name: "", url: "https://etherscan.io/" }
  },
  testnet: false
};

export const goerli: Chain = {
  id: 5,
  name: "Goerli",
  network: "Goerli testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_GOERLI}`
  },
  blockExplorers: {
    default: { name: "", url: "https://goerli.etherscan.io" }
  },
  testnet: true
};

export const polygon: Chain = {
  id: 137,
  name: "Polygon",
  network: "Polygon Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_POLYGON}`
  },
  blockExplorers: {
    default: { name: "", url: "https://polygonscan.com/" }
  },
  testnet: false
};

export const mumbai: Chain = {
  id: 80001,
  name: "Mumbai",
  network: "Mumbai testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_POLYGON_MUMBAI}`
  },
  blockExplorers: {
    default: { name: "", url: "https://mumbai.polygonscan.com/" }
  },
  testnet: true
};

export const fantom: Chain = {
  id: 250,
  name: "Fantom Opera",
  network: "Fantom Opera",
  nativeCurrency: {
    decimals: 18,
    name: "FTM",
    symbol: "FTM"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_FANTOM}`
  },
  blockExplorers: {
    default: { name: "", url: "https://ftmscan.com/" }
  },
  testnet: false
};

export const fantom_testnet: Chain = {
  id: 4002,
  name: "Fantom testnet",
  network: "Fantom testnet",
  nativeCurrency: {
    decimals: 18,
    name: "FTM",
    symbol: "FTM"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_FANTOM_TEST}`
  },
  blockExplorers: {
    default: { name: "", url: "https://testnet.ftmscan.com/" }
  },
  testnet: true
};

export const bnb_mainnet: Chain = {
  id: 56,
  name: "Binance Chain",
  network: "Bnb mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_BNB}`
  },
  blockExplorers: {
    default: { name: "", url: "https://bscscan.com/" }
  },
  testnet: false
};

export const bnb_testnet: Chain = {
  id: 97,
  name: "Binance testnet",
  network: "Bnb testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: `${process.env.REACT_APP_NODE_BNB_TEST}`
  },
  blockExplorers: {
    default: { name: "", url: "https://testnet.bscscan.com/" }
  },
  testnet: true
};

export const chains: Chain[] = [ethereum, goerli, polygon, mumbai, fantom, fantom_testnet, bnb_mainnet, bnb_testnet];

export const getExplorer = (chainId: number): string | undefined => {
  const current = chains.find((chain) => chain.id === chainId);
  return current?.blockExplorers?.default.url;
};
