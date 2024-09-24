import logo from './logo.svg';
import './App.css';
import Header from './component/Header.js';
import Nav from './component/Nav.js';
import Home from './component/Home.js';
import Footer from './component/Footer.js';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import sytled from 'styled-components';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes> 
      <Footer/>     
    </BrowserRouter>
  );
}

export default App;
