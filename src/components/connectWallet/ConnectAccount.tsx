import { useState } from "react";

import { Button, Card, Modal } from "react-bootstrap";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

import { useWindowWidthAndHeight } from "../../hooks/useWindowWidthAndHeight";
import { getEllipsisTxt } from "../../utils/formatters";
import { getExplorer } from "../../web3/network";
import Address from "./Address";
import ConnectorModal from "./ConnectorModal";
import "./style.css";

const ConnectAccount = () => {
  const { address, connector: isConnected } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { isMobile } = useWindowWidthAndHeight();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [isDiconnectModalOpen, setIsDiconnectModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (isConnectModalOpen) setIsConnectModalOpen(false);
    setIsConnectModalOpen(true);
  };

  const disconnectWallet = async () => {
    disconnect();
    setIsDiconnectModalOpen(false);
    setIsConnectModalOpen(false);
    localStorage.removeItem("connectorId");
    window.location.reload();
  };

  return (
    <>
      {!isConnected ? (
        <>
          <Button onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "5px" }}
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
            </svg>
            Connect Wallet
          </Button>
          <ConnectorModal isModalOpen={isConnectModalOpen} setIsModalOpen={setIsConnectModalOpen} />
          <br />
        </>
      ) : (
        <>
          <Button onClick={() => setIsDiconnectModalOpen(true)}>
            {address && typeof address === "string" && (
              <p className="connected-account-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "5px" }}
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                </svg>
                {isMobile ? getEllipsisTxt(address, 5) : getEllipsisTxt(address, 4)}
              </p>
            )}
          </Button>

          <Modal
            show={isDiconnectModalOpen}
            dialogClassName="connect-modal-content"
            onHide={() => setIsDiconnectModalOpen(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title className="connect-modal-title">Account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Card className="disconnect-wallet-card">
                <Address account={address as string} avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
                <div style={{ marginTop: "10px", padding: "0 10px" }}>
                  {chain !== undefined && (
                    <a href={`${getExplorer(chain.id)}/address/${address}`} target="_blank" rel="noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        style={{ marginRight: "5px" }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                        />
                      </svg>
                      View on Explorer
                    </a>
                  )}
                </div>
              </Card>

              <Button onClick={() => disconnectWallet()}>Disconnect Wallet</Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ConnectAccount;
