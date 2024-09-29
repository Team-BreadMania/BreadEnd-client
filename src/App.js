import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import NaviBar from './Components/NaviBar';
import Home from './Pages/Home';
import MyPage_buyer from './Pages/MyPage_buyer';
import MyPage_seller from './Pages/MyPage_seller';

function App() {
    return (
        <Router>
            <div style={{ width: '100%', height: '100vh' }}>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/MyPage_buyer" element={<MyPage_buyer />} />
                    <Route path="/MyPage_seller" element={<MyPage_seller />} />
                </Routes>
                <NaviBar />
            </div>
        </Router>
    );
}

export default App;
