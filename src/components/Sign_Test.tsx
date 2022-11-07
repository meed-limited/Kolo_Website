import { ethers } from "ethers";
import { useAccount } from "wagmi";

import { getProvider } from "../web3/constants";
import { signApproval } from "../web3/contractCall";

const Sign_Test = () => {
  const { address } = useAccount();

  const node = getProvider();

  const provider: any = new ethers.providers.JsonRpcProvider(node);
  // const provider: any = new ethers.providers.JsonRpcProvider(window!.ethereum);

  const sign = () => {
    try {
      signApproval(provider.getSigner(), address as string, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={sign}>approve</button>;
};

export default Sign_Test;
