import { Modal } from "react-bootstrap";
import { Connector, useConnect } from "wagmi";

import IMAGES from "./walletIcons";

interface ConnectorModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectorModal: React.FC<ConnectorModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  const getConnectorImage = (connector: Connector) => {
    const data = IMAGES.find((item) => item.name.toLowerCase() === connector.name.toLowerCase());
    if (data) return data?.image;
    else return undefined;
  };

  return (
    <Modal
      show={isModalOpen}
      dialogClassName="connectors-modal-content"
      onHide={() => {
        setIsModalOpen(false);
      }}
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title className="connectors-modal-title">Connect Your Wallet</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
              <span className="connect-button-text">{connector.name}</span>
              {!connector.ready && " (unsupported)"}
              {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
              <img src={getConnectorImage(connector)} width={32} height={32} alt={connector.name} />
            </button>
          ))}

          <div className="connectors-modal-need-help">
            Need help installing a wallet?{" "}
            <a
              href="https://metamask.zendesk.com/hc/en-us/articles/360015489471-How-to-Install-MetaMask-Manually"
              target="_blank"
              rel="noopener"
            >
              Click here
            </a>
          </div>

          <div className="connectors-modal-disclaimer">
            Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your
            access to the wallet might be reliant on the External Provider being operational.
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectorModal;
