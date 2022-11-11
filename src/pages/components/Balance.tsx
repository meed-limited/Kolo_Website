import React from 'react';

import { Button } from 'react-bootstrap';
import { useAccount } from "wagmi";



const Balance = () => {
  const { isConnected } = useAccount();

  return (
    <>
    {isConnected &&
        <Button disabled>
          <img src="assets/images/link.svg" /> <span>000000</span>
        </Button>
    }
    </>
  )
}

export default Balance