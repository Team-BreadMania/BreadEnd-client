import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import NaviBar from './Components/NaviBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NormalSignup from './Pages/NormalSignup';
import SellerSignup from './Pages/SellerSignup';
import MyPageBuyer from './Pages/MyPageBuyer';
import MyPageSeller from './Pages/MyPageSeller';
import MyCart from "./Pages/MyCart";

function App() {
    const location = useLocation(); // 현재 경로를 확인하기 위한 useLocation

    const hideHeaderAndNavi = location.pathname === '/normal' || location.pathname === '/seller'; // WelcomePage는 제외하여 헤더와 네비바를 표시함

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {/* NormalSignup과 SellerSignup 페이지에서는 Header와 NaviBar를 렌더링하지 않음 */}
            {!hideHeaderAndNavi && <Header />}

            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/normal" element={<NormalSignup />} />
                <Route path="/seller" element={<SellerSignup />} />
                <Route path="/MyPageBuyer" element={<MyPageBuyer />} />
                <Route path="/MyPageSeller" element={<MyPageSeller />} />
                <Route path="/MyCart" element={<MyCart />} />
            </Routes>

            {/* NormalSignup과 SellerSignup 페이지에서는 NaviBar를 렌더링하지 않음 */}
            {!hideHeaderAndNavi && <NaviBar />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
