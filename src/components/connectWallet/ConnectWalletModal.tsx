import React from "react";

import { motion } from "framer-motion/dist/framer-motion";
import Modal from "react-bootstrap/Modal";

import WalletBox from "../../pages/components/WalletBox";
import IMAGES from "./walletIcons";

interface ConnectWalletModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isModalOpen,
  setIsModalOpen
}: ConnectWalletModalProps) => {
  return (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered className="connect-modal">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <motion.div
          className="modal-wrapper"
          initial={{ y: 0 }}
          animate={{ y: -400 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            className="connect-intro"
            initial={{ opacity: 1 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="title">Connect Your Wallet</div>
            {IMAGES.map((img) => (
              <WalletBox key={img.id} name={img.name} imagePath={img.image} />
            ))}
          </motion.div>
          <div className="infos">
            <div className="help">Need help installing a wallet?</div>
            <div className="link">
              <a href="#"> Click here</a>
            </div>
            <div className="other-info">
              Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your
              access to the wallet might be reliant on the External Provider being operational.
            </div>
          </div>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectWalletModal;
