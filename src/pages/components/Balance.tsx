import { useMemo } from "react";

import { Button } from "react-bootstrap";
import { useAccount } from "wagmi";

import { useUserData } from "../../context/UserContextProvider";
import { useTokenSymbol } from "../../hooks/useTokenSymbol";

const Balance = () => {
  const { address } = useAccount();
  const { tokenBalance } = useUserData();
  const { tokenSymbol } = useTokenSymbol();

  const balance = useMemo(() => (tokenBalance ? tokenBalance : "0000"), [tokenBalance]);

  return (
    <>
      {address && (
        <Button className="bal-btn" style={{ cursor: "default" }}>
          <img src="assets/images/Kol.png" />
          <div className="detail">
            <span className="title">Balance</span>
            <span title="value">
              {balance} {tokenSymbol}
            </span>
          </div>
        </Button>
      )}
    </>
  );
};

export default Balance;
