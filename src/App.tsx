import { Buffer } from "buffer";

import { BrowserRouter as Router } from "react-router-dom";

import ConnectAccount from "./components/connectWallet/ConnectAccount";
import Routes from "./routes/routes";
import "./app.css";

function App() {
  if (!window.Buffer) window.Buffer = Buffer;
  return (
    <div className="App">
      <header className="App-header">
        <ConnectAccount />
      </header>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
