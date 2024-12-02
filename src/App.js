import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import NaviBar from './Components/NaviBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NormalSignup from './Pages/NormalSignup';
import SellerSignup from './Pages/SellerSignup';
import MyPage from './Pages/MyPage';
import MyCart from './Pages/MyCart';
import ProductDetailPage from './Pages/ProductDetailPage';
import ProductRegistration from './Pages/ProductRegistration';
import ShopProduct from './Pages/ShopProduct';
import Search from './Pages/Search'; // Search 페이지 추가
import Map from './Pages/Map'; // Map 페이지 추가
import SearchResults from './Pages/SearchResults';
import ProductManagement from './Pages/ProductManagement';
import EditProductPopup from './Components/EditProductPopup';
import { AuthProvider } from './AuthContext';

function App() {
    const location = useLocation(); // 현재 경로를 확인하기 위한 useLocation

    // Header와 NaviBar를 각 페이지별로 숨김 처리
    const hideHeader = location.pathname === '/normal' || location.pathname === '/seller' || location.pathname === '/Search' || location.pathname === '/EditProductPopup';
    const hideNaviBar = location.pathname === '/normal' || location.pathname === '/seller' || location.pathname === '/EditProductPopup';

    return (
        <AuthProvider>
            <div style={{ width: '100%', height: '100vh' }}>
                {/* 특정 경로에서는 Header를 렌더링하지 않음 */}
                {!hideHeader && <Header />}
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/normal" element={<NormalSignup />} />
                    <Route path="/seller" element={<SellerSignup />} />
                    <Route path="/MyPage" element={<MyPage />} />
                    <Route path="/MyCart" element={<MyCart />} />
                    <Route path="/ProductDetailPage" element={<ProductDetailPage />} />
                    <Route path="/ProductRegistration" element={<ProductRegistration />} />
                    <Route path="/ShopProduct" element={<ShopProduct />} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/SearchResults" element={<SearchResults />} />
                    <Route path="/ProductManagement" element={<ProductManagement />} />
                    {/* Search 경로 추가 */}
                    <Route path="/Map" element={<Map />} /> {/* Map 경로 추가 */}
                    <Route path="/EditProductPopup" element={<EditProductPopup />} />
                </Routes>

                {/* 특정 경로에서는 NaviBar를 렌더링하지 않음 */}
                {!hideNaviBar && <NaviBar />}
            </div>
        </AuthProvider>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            {/* Router 내부에서 App 컴포넌트를 렌더링하여 useLocation이 정상적으로 작동하도록 수정 */}
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    );
}
