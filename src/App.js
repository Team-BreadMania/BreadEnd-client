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
import ProductDetailPage from "./Pages/ProductDetailPage";
import Search from "./Pages/Search"; 
import Map from "./Pages/Map";       
import SearchResults from "./Pages/SearchResults"; // 검색결과 페이지 추가

function App() {
    const location = useLocation(); 

    const hideHeader = location.pathname === '/normal' || location.pathname === '/seller' || location.pathname === '/Search';
    const hideNaviBar = location.pathname === '/normal' || location.pathname === '/seller';

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {!hideHeader && <Header />}

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
                <Route path="/ProductDetailPage" element={<ProductDetailPage />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Map" element={<Map />} />
                <Route path="/SearchResults" element={<SearchResults />} /> {/* 검색결과 페이지 경로 추가 */}
            </Routes>

            {!hideNaviBar && <NaviBar />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    );
}
