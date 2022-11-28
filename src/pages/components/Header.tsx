import React from "react";

import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

import ChainSelector from "../../components/chain/ChainSelector";
import ConnectAccount from "../../components/connectWallet/ConnectAccount";
import { useUserData } from "../../context/UserContextProvider";
import Balance from "./Balance";

interface HeaderProps {
  isLanding?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLanding }: HeaderProps) => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const { setIsConnectModalOpen } = useUserData();

  const goToApp = () => {
    navigate("/project-list");
  };

  const goToSubmissionForm = () => {
    if (isConnected) {
      navigate("/submission-form");
    } else {
      setIsConnectModalOpen(true);
    }
  };

  return (
    <div>
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
          <div className="btn-group-section">
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
            <Balance />
            <ConnectAccount />
          </div>
        )}
        <div className="hamburger-menu">
          <Dropdown>
            <Dropdown.Toggle variant="link">
              <img src="assets/images/hamburger.svg" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {isLanding ? (
                <>
                  <Button variant="primary">Download KOLO app</Button>
                  <Button variant="primary" onClick={goToApp} className="mt-2">
                    Launch web-app
                  </Button>
                </>
              ) : (
                <>
                  <ChainSelector />
                  <Balance />
                  <ConnectAccount />
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      {!isLanding && (
        <div className="bg-btn-wrapper">
          <span className="vote-btns">
            <div className="btns">
              <Button variant="info" className="border-right">
                Submission Phase
              </Button>
              <Button variant="info">Voting phase</Button>
            </div>
          </span>
          <div className="btn-group-section bgs-mobile">
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
        </div>
      )}
    </div>
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
