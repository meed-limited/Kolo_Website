import React from "react";

import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

import ChainSelector from "../../components/chain/ChainSelector";
import ConnectAccount from "../../components/connectWallet/ConnectAccount";
import useStateManager from "../../hooks/useStateManager";

interface HeaderProps {
  isLanding?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLanding }: HeaderProps) => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const globalState = useStateManager();

  const goToApp = () => {
    navigate("/project-list");
  };

  // const openConnectWallet = () => {
  //   globalState.openConnectModal.set(true);
  // };

  const goToSubmissionForm = () => {
    if (isConnected) {
      navigate("/submission-form");
    } else {
      globalState.openConnectModal.set(true);
    }
  };

  return (
    <>
      <header>
        <div className="icons-section">
          {isLanding ? (
            <Logo />
          ) : (
            <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <Logo />
            </div>
          )}
          {isLanding && <span>Start redistribute game revenue to various projects from KOLO</span>}
        </div>
        {isLanding && (
          <div className="action-btns">
            <Button variant="secondary">
              <span>Download KOLO app</span>
            </Button>
            <Button variant="secondary" onClick={goToApp}>
              <span>Launch web-app</span>
            </Button>
          </div>
        )}

        {!isLanding && (
          <div>
            <ButtonGroup>
              <span>
                <Button
                  variant="link"
                  className={location.pathname === "/project-list" ? "active" : ""}
                  onClick={goToApp}
                >
                  Project
                </Button>
                <span className="iconify" data-icon="fluent:divider-short-20-regular"></span>
                <Button
                  variant="link"
                  className={location.pathname === "/submission-form" ? "active" : ""}
                  onClick={goToSubmissionForm}
                >
                  Submit Project
                </Button>
              </span>
            </ButtonGroup>
          </div>
        )}
        {!isLanding && (
          <div className="nav-btn">
            <ChainSelector />
            <ConnectAccount />
            {/* <Button onClick={openConnectWallet}>
              <img src="assets/images/link.svg" /> <span>Connect Wallet</span>
            </Button> */}
          </div>
        )}
      </header>
      {!isLanding && (
        <span className="vote-btns">
          <div className="btns">
            <Button variant="info" className="border-right">
              Submission Phase
            </Button>
            <Button variant="info">Voting phase</Button>
          </div>
        </span>
      )}
    </>
  );
};

export const Logo = () => {
  return (
    <>
      <img src="assets/images/logo.svg" alt="kolo-logo" />
      <img src="assets/images/kolo.svg" alt="kolo" />
    </>
  );
};

export default Header;
