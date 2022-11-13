import React, { ReactNode, useContext, useEffect, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useAccount, useNetwork, useProvider } from "wagmi";

import { getTokenBalance, isPollOpened } from "../web3/contractCall";
import UserContext from "./context";

type Props = {
  children: ReactNode;
};

const UserDataProvider: React.FC<Props> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider: Web3Provider = useProvider();

  const [tokenBalance, setTokenBalance] = useState<React.SetStateAction<number>>();
  const [isPollOpen, setIsPollOpen] = useState<React.SetStateAction<boolean | undefined>>();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<React.SetStateAction<boolean>>(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState<React.SetStateAction<boolean>>(false);
  const [isConnectModalAnimation, setIsConnectModalAnimation] = useState<React.SetStateAction<boolean>>(true);

  /* Get projects's data:
   *************************/

  const getCurrentPhase = async () => {
    const statut = await isPollOpened(provider);
    setIsPollOpen(statut);
  };

  /* Get user's data:
   ********************/
  const getKolBalance = async () => {
    const bal = await getTokenBalance(provider, address as string);
    setTokenBalance(parseInt(bal.toString()) / 10 ** 18);
  };

  useEffect(() => {
    if (address) {
      getKolBalance();
      getCurrentPhase();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <UserContext.Provider
      value={{
        address,
        chain,
        isConnected,
        tokenBalance,
        isPollOpen,
        isConnectModalOpen,
        setIsConnectModalOpen,
        isSubmissionModalOpen,
        setIsSubmissionModalOpen,
        isConnectModalAnimation,
        setIsConnectModalAnimation
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserData: any = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
};

export { UserDataProvider, useUserData };
