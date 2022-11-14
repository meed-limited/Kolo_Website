import { useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";


import { useUserData } from "../../context/UserContextProvider";
import { getEllipsisTxt } from "../../utils/formatters";
import ConnectModal from "./ConnectModal";
import DisconnectModal from "./DisconnectModal";


import "./style.css";

const ConnectAccount = () => {
  const { address, connector: isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isDiconnectModalOpen, setIsDisconnectModalOpen] = useState<boolean>(false);
  const { isConnectModalOpen, setIsConnectModalOpen, setIsConnectModalAnimation } = useUserData();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const navigate = useNavigate()


  const handleClick = () => {
    setIsConnectModalAnimation(false);
    if (isConnectModalOpen) setIsConnectModalOpen(false);
    setIsConnectModalOpen(true);
  };

  const disconnectWallet = async () => {
    disconnect();
    setIsDisconnectModalOpen(false);
    setIsConnectModalOpen(false);
    localStorage.removeItem("connectorId");
    window.location.reload();
  };

  return (
    <>
      {!isConnected ? (
        <>
          <Button
            onClick={handleClick}
            style={{ width: "270px", backgroundImage: `url("./assets/images/btn_frame_large.png")` }}
          >
            <img src="assets/images/link.svg" /> <span>Connect Wallet</span>
          </Button>
          <ConnectModal isModalOpen={isConnectModalOpen} setIsModalOpen={setIsConnectModalOpen} />
          <br />
        </>
      ) : (
        <>
          <Button 
            onClick={() => setIsDisconnectModalOpen(true)} 
            onMouseEnter={() => setShowDropdown(true)} 
            onMouseLeave={() => setShowDropdown(false)}
          >
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
                {getEllipsisTxt(address, 5)}
              </p>
            )}
          </Button>
          {showDropdown &&
            <div 
              className="dropdown-wrapper"
              onMouseEnter={() => setShowDropdown(true)} 
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Button onClick={() => navigate("/profile")}><span className="iconify" data-icon="mdi:user"></span> {" "} Profile</Button>
            </div>
          }
          
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
