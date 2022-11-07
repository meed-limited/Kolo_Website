import { Buffer } from "buffer";

import { BrowserRouter as Router } from "react-router-dom";

import ChainSelector from "./components/chain/ChainSelector";
import ConnectAccount from "./components/connectWallet/ConnectAccount";
import Sign_Test from "./components/Sign_Test";
import Routes from "./routes/routes";
import "./app.css";

function App() {
  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <div className="App">
      <header className="App-header">
        <Sign_Test />
        <ChainSelector />
        <ConnectAccount />
      </header>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
