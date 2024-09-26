import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Components/Header";
import NaviBar from "./Components/NaviBar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NormalSignup from "./Pages/NormalSignup"; // 일반 사용자 페이지 임포트
import SellerSignup from "./Pages/SellerSignup"; // 판매자 페이지 임포트

function App() {
    return (
      <Router>
          <div style={{ width: "100%", height: "100vh" }}>
              <Header />
              <Routes>
                  <Route path="/" element={<Navigate to="/Home" />} />
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/normal" element={<NormalSignup />} />  {/* /normal 경로 */}
                  <Route path="/seller" element={<SellerSignup />} />  {/* /seller 경로 */}
              </Routes>
              <NaviBar />
          </div>
      </Router>
    );
}

export default App;
