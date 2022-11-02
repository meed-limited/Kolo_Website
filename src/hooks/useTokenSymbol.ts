import { useEffect, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useProvider } from "wagmi";

import { getTokenName } from "../web3/contractCall";

export const useTokenSymbol = () => {
  const provider: Web3Provider = useProvider();
  const [tokenSymbol, setTokenSymbol] = useState<React.SetStateAction<string>>();

  useEffect(() => {
    const getSymbol = async () => {
      const res = await getTokenName(provider);
      setTokenSymbol(res);
    };
    getSymbol();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { tokenSymbol };
};
