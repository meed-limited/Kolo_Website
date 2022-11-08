import { useAccount, useProvider, useSigner } from "wagmi";

import { getTokenBalance, signApproval } from "../web3/contractCall";

const Sign_Test = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const backendcall = (data: unknown) => {
    console.log(`send ${data}`);
  };

  const sign = async () => {
    if (provider && signer) {
      try {
        const balance = await getTokenBalance(provider, address as string);
        console.log("Balance: ", balance?.toString());
        const data = await signApproval(signer, address as string, 10);
        if (data.success) await backendcall(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <button onClick={sign}>approve</button>;
};

export default Sign_Test;
