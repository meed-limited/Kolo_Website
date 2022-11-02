import { useState } from "react";

import { SelectOutlined, WalletOutlined } from "@ant-design/icons";
import { Card, Modal } from "antd";
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
  const [isConnectorsModalOpen, setIsConnectorsModalOpen] = useState<boolean>(false);
  const [isConnectedModalOpen, setIsConnectedModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (isConnectorsModalOpen) setIsConnectorsModalOpen(false);
    setIsConnectorsModalOpen(true);
  };

  const disconnectWallet = async () => {
    disconnect();
    setIsConnectedModalOpen(false);
    setIsConnectorsModalOpen(false);
    localStorage.removeItem("connectorId");
    window.location.reload();
  };

  return (
    <>
      {!isConnected ? (
        <>
          <button className="connect-account-button" onClick={handleClick}>
            <WalletOutlined />
            Connect Wallet
          </button>
          <ConnectorModal isModalOpen={isConnectorsModalOpen} setIsModalOpen={setIsConnectorsModalOpen} />
          <br />
        </>
      ) : (
        <>
          <div className="connected-account" onClick={() => setIsConnectedModalOpen(true)}>
            {address && typeof address === "string" && (
              <p className="connected-account-text">
                <WalletOutlined style={{ marginRight: "8px" }} />
                {isMobile ? getEllipsisTxt(address, 5) : getEllipsisTxt(address, 4)}
              </p>
            )}
          </div>

          <Modal
            className="connectors-modal"
            open={isConnectedModalOpen}
            footer={null}
            onCancel={() => setIsConnectedModalOpen(false)}
            bodyStyle={{
              width: "350px",
              padding: "15px",
              fontSize: "17px",
              fontWeight: "500",
              border: "1px solid black"
            }}
            style={{ display: "flex" }}
          >
            Account
            <Card
              style={{
                marginTop: "10px",
                borderRadius: "1rem"
              }}
              bodyStyle={{ padding: "15px" }}
            >
              <Address account={address as string} avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
              <div style={{ marginTop: "10px", padding: "0 10px" }}>
                {chain !== undefined && (
                  <a href={`${getExplorer(chain.id)}/address/${address}`} target="_blank" rel="noreferrer">
                    <SelectOutlined style={{ marginRight: "5px" }} />
                    View on Explorer
                  </a>
                )}
              </div>
            </Card>
            <button onClick={() => disconnectWallet()}>Disconnect Wallet</button>
          </Modal>
        </>
      )}
    </>
  );
};

export default ConnectAccount;
