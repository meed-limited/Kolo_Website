import React from "react";

import { motion } from "framer-motion";
import { Modal } from "react-bootstrap";
import { Connector, useConnect } from "wagmi";

import useStateManager from "../../hooks/useStateManager";
import IMAGES from "./walletIcons";

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const globalState = useStateManager();

  const getConnectorImage = (connector: Connector) => {
    const data = IMAGES.find((item) => item.name.toLowerCase() === connector.name.toLowerCase());
    if (data) return data?.image;
    else return undefined;
  };

  return (
    <Modal
      show={isModalOpen}
      // dialogClassName="connect-modal-content"
      onHide={() => {
        setIsModalOpen(false);
      }}
      centered
      className="connect-modal"
    >
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <motion.div
          className="modal-wrapper"
          initial={globalState.showConnectModalAnimation.get() ? { y: 0 } : { y: -400 }}
          animate={{ y: -400 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            className="connect-intro"
            initial={globalState.showConnectModalAnimation.get() ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="wallet-icon">
              <img src="assets/images/wallet.png" alt="wallet" />
            </div>
            <div className="disclaimer">Please Connect Wallet to access more function</div>
          </motion.div>
          <motion.div
            className="wallets"
            initial={globalState.showConnectModalAnimation.get() ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="title">Connect Your Wallet</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {connectors.map((connector) => (
                <button
                  className="connector-button"
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                  }}
                >
                  <span className="connector-button-text">{connector.name}</span>
                  {!connector.ready && " (unsupported)"}
                  {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                  <img src={getConnectorImage(connector)} width={32} height={32} alt={connector.name} />
                </button>
              ))}
            </div>
            <div className="infos">
              <div className="help">Need help installing a wallet?</div>
              <div className="link">
                <a
                  href="https://metamask.zendesk.com/hc/en-us/articles/360015489471-How-to-Install-MetaMask-Manually"
                  target="_blank"
                  rel="noopener"
                >
                  Click here
                </a>
              </div>
              <div className="other-info">
                Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your
                access to the wallet might be reliant on the External Provider being operational.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectModal;
