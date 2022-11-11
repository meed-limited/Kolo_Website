import { Buffer } from "buffer";

import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
// import ConnectWalletModal from "./components/connectWallet/ConnectWalletModal";
// import ChainSelector from "./components/chain/ChainSelector";
// import Sign_Test from "./components/Sign_Test";
// import useStateManager from "./hooks/useStateManager";
import Routes from "./routes/routes";

function App() {
  // const globalState = useStateManager();
  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <div className="App">
      {/* <ConnectWalletModal
        isModalOpen={globalState.openConnectModal.get()}
        setIsModalOpen={globalState.openConnectModal.set}
      /> */}
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
