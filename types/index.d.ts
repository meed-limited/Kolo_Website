import { CSSProperties } from "react";

export interface AddressProps {
  style: CSSProperties | undefined;
  avatar: string;
  size: number | undefined;
  copyable: boolean;
  account: string;
}

export type Chain = {
  id: number;
  name: string;
  network: string;
  nativeCurrency?: AddEthereumChainParameter["nativeCurrency"];
  rpcUrls: {
    alchemy?: string | undefined;
    infura?: string | undefined;
    public?: string | undefined;
  } & {
    [key: string]: string;
    default: string;
  };
  blockExplorers?: {
    [key in BlockExplorerName]?: BlockExplorer;
  } & {
    [key: string]: BlockExplorer;
    default: BlockExplorer;
  };
  ens?: {
    address: Address;
  };
  multicall?: {
    address: Address;
    blockCreated: number;
  };
  testnet?: boolean;
  logo?: string;
};

export interface MenuItems {
  key: number;
  value: string;
  icon: string | undefined;
  label: string;
}
