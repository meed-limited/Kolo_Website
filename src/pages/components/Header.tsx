import React from "react";

import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import ChainSelector from "../../components/chain/ChainSelector";
import ConnectAccount from "../../components/connectWallet/ConnectAccount";
import Sign_Test from "../../components/Sign_Test";
import useStateManager from "../../hooks/useStateManager";

interface HeaderProps {
  isLanding?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLanding }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const globalState = useStateManager();

  const goToApp = () => {
    navigate("/project-list");
  };

  // const openConnectWallet = () => {
  //   globalState.openConnectModal.set(true);
  // };

  const openSubmissonModal = () => {
    if (globalState.isAuth.get()) {
      globalState.openSubmissionModal.set(true);
    } else {
      globalState.openConnectModal.set(true);
    }
  };

  return (
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
              <Button variant="link" onClick={openSubmissonModal}>
                Submission
              </Button>
            </span>
          </ButtonGroup>
        </div>
      )}
      {!isLanding && (
        <div className="nav-btn">
          <Sign_Test />
          <ChainSelector />
          <ConnectAccount />
          {/* <Button onClick={openConnectWallet}>
            <img src="assets/images/link.svg" /> <span>Connect Wallet</span>
          </Button> */}
        </div>
      )}
    </header>
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
