import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes   } from "react-router-dom";
import "./App.css";
import About from "./About";
import Projects from "./Projects";
import Home from "./Home";
import ReactGA from 'react-ga4';
ReactGA.initialize("G-T57ZFGY2HZ");
  


function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview" , page: window.location.pathname + window.location.search});
  }, []);

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
