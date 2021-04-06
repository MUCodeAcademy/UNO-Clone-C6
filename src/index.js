import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./shared/UserContext";
import { GameProvider } from "./shared/GameContext";
import "./index.css";

ReactDOM.render(
  <UserProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </UserProvider>,
  document.getElementById("root")
);

reportWebVitals();
