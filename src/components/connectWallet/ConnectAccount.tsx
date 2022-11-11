import { useState } from "react";

import { Button } from "react-bootstrap";
import { useAccount, useDisconnect } from "wagmi";

import useStateManager from "../../hooks/useStateManager";
import { useWindowWidthAndHeight } from "../../hooks/useWindowWidthAndHeight";
import { getEllipsisTxt } from "../../utils/formatters";
import ConnectModal from "./ConnectModal";
import DisconnectModal from "./DisconnectModal";

import "./style.css";

const ConnectAccount = () => {
  const { address, connector: isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { isMobile } = useWindowWidthAndHeight();
  // const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [isDiconnectModalOpen, setIsDisconnectModalOpen] = useState<boolean>(false);
  const globalState = useStateManager();

  const handleClick = () => {
    // if (isConnectModalOpen) setIsConnectModalOpen(false);
    // setIsConnectModalOpen(true);
    if (globalState.openConnectModal.get()) globalState.openConnectModal.set(false);
    globalState.openConnectModal.set(true);
  };

  const disconnectWallet = async () => {
    disconnect();
    setIsDisconnectModalOpen(false);
    // setIsConnectModalOpen(false);
    globalState.openConnectModal.set(false);
    localStorage.removeItem("connectorId");
    window.location.reload();
  };

  return (
    <>
      {!isConnected ? (
        <>
          <Button onClick={handleClick}>
            <img src="assets/images/link.svg" /> <span>Connect Wallet</span>
          </Button>
          <ConnectModal
            isModalOpen={globalState.openConnectModal.get()}
            setIsModalOpen={globalState.openConnectModal.set}
          />
          <br />
        </>
      ) : (
        <>
          <Button onClick={() => setIsDisconnectModalOpen(true)}>
            {address && typeof address === "string" && (
              <p className="connected-account-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "5px" }}
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                </svg>
                {isMobile ? getEllipsisTxt(address, 5) : getEllipsisTxt(address, 4)}
              </p>
            )}
          </Button>

          <DisconnectModal
            address={address}
            isModalOpen={isDiconnectModalOpen}
            setIsModalOpen={setIsDisconnectModalOpen}
            disconnectWallet={disconnectWallet}
          />
        </>
      )}
    </>
  );
};

export default ConnectAccount;
