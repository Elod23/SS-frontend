import "./App.css";
import React from "react";
import { SSLogo } from "./components/SalvageScoutLogo";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" element={<Root/>} />
            <Route path="/:storeId/:orderId" element={<Home/>} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
