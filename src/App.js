import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CatDetails from "./components/CatDetails";
import NavMenu from "./components/NavMenu";
import './dist/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:id" element={<CatDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
