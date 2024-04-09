import React from "react";
import { BrowserRouter as Router, Route, Routes   } from "react-router-dom";
import "./App.css";
import About from "./About";
import Projects from "./Projects";
import Home from "./Home";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className="App">
      <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route path="/About" exact element={<About />} />
          <Route path="/Projects" exact element={<Projects />} />
      </Routes>
      
    </div>
  );
}

export default App;
