import React, {useEffect, useState} from 'react';

import { Button } from 'react-bootstrap';
import { useAccount, useProvider } from "wagmi";

import { getTokenBalance } from "../../web3/contractCall";




const Balance = () => {
  const { isConnected, address } = useAccount();
  const provider = useProvider();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const res = await getTokenBalance(provider, address as string)
      const bal = Number(res?.toString()) / 10 ** 18;
      setBalance(bal.toString());
    }

    if(isConnected && provider){
      fetch()
    }
  }, [isConnected])
  return (
    <>
    {isConnected &&
        <Button className="bal-btn">
          <img src="assets/images/Kol.png" /> 
          <div className="detail">
            <span className='title'>Balance</span>
            <span title="value">{balance}</span>
          </div>
        </Button>
    }
    </>
  )
}

export default Balance