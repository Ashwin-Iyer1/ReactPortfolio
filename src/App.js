import React from "react";
import { BrowserRouter as Router, Route, Routes   } from "react-router-dom";
import "./App.css";
import About from "./About";
import Projects from "./Projects";
import Home from "./Home";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Projects" element={<Projects />} />
      </Routes>
      
    </div>
  );
}

export default App;
