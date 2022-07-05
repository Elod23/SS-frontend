import "./App.css";
import React from "react";
import { SSLogo } from "./components/SalvageScoutLogo";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import { Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SSLogo small />
        <title>SalvageScout Order Creator</title>
        <Typography variant="h4" align="center" justifyContent='center' color="#072c60" marginRight="35%">
          ©SalvageScout Shipment Order Manager
        </Typography>
      </header>
      <Router>
        <Switch>
          <Route path="/" element={<Root />} />
          <Route path="/:storeID/:orderID" element={<Home />} />
        </Switch>
      </Router>
      <footer className="App-footer">
        <Typography variant="h6" align="center" color="#072c60">
          ©SalvageScout 2022 All Rights reserved.
        </Typography>
        <Typography variant="h6" align="center" color="#072c60">
          Contact us at  <a
              href="mailto:info@salvagescout.com"
              target="_blank"
              rel="noreferrer"
              style={{textDecoration:'none'}}
              onClick={(e) => e.stopPropagation()}
            >
              info@salvagescout.com
            </a>
        </Typography>
      </footer>
    </div>
  );
}

export default App;
