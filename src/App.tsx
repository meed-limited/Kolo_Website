import { Buffer } from "buffer";

import React, { Suspense } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Routes from "./routes/routes";

function App() {
  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <div className="App">
      <Router>
        <Suspense>
          <Routes />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
