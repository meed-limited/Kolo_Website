import { Buffer } from "buffer";

import React from "react";

import useStateManager from "./hooks/useStateManager";

import { BrowserRouter as Router } from "react-router-dom";

// import ConnectAccount from "./components/connectWallet/ConnectAccount";
import Routes from "./routes/routes";
import "./App.css";
import ConnectWalletModal from "./components/connectWallet/ConnectWalletModal";
import SubmissionModal from "./pages/components/SubmissionModal";

function App() {
  const globalState = useStateManager();
  if (!window.Buffer) window.Buffer === Buffer;
  return (
    <div className="App">
      {/* <header className="App-header">
        <ConnectAccount />
      </header> */}
      <ConnectWalletModal
        isModalOpen={globalState.openConnectModal.get()}
        setIsModalOpen={globalState.openConnectModal.set}
      />
      <SubmissionModal
        isModalOpen={globalState.openSubmissionModal.get()}
        setIsModalOpen={globalState.openSubmissionModal.set}
      />
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
