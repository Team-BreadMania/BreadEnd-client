import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Components/Header";
import NaviBar from "./Components/NaviBar";
import Home from "./Pages/Home";

function App() {
    return (
      <Router>
          <div style = {{ width: "100%", height: "100vh"}}> 
              <Header/>
              <Routes>
                  <Route path = "/" element = {<Navigate to = "/Home"/>}/>
                  <Route path = "/Home" element = {<Home/>}/>
              </Routes>
              <NaviBar/>
          </div>
      </Router>
    );
}

export default App;
