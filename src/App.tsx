import { Buffer } from "buffer";

import ConnectAccount from "./components/connectWallet/ConnectAccount";

function App() {
  if (!window.Buffer) window.Buffer = Buffer;
  return (
    <div className="App">
      <header className="App-header">
        <ConnectAccount />
      </header>
    </div>
  );
}

export default App;
