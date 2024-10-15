import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import search_icon from "../Images/search_icon.svg";
import map_icon from "../Images/map_icon.svg";
import home_icon from "../Images/home_icon.svg";
import cart_icon from "../Images/cart_icon.svg";
import my_icon from "../Images/my_icon.svg";

export default function NaviBar() {
    const location = useLocation();
    return (
        <Container>
            <NaviMenu to = "/Search" active = {location.pathname === "/Search"}>
                <NaviIcon src = {search_icon}/>
                <NaviText>검색</NaviText>
            </NaviMenu>
            <NaviMenu to = "/Map" active = {location.pathname === "/Map"}>
                <NaviIcon src = {map_icon}/>
                <NaviText>내 주변 가게</NaviText>
            </NaviMenu>
            <NaviMenu to = "/Home" active = {location.pathname === "/Home"}>
                <NaviIcon src = {home_icon}/>
                <NaviText>홈</NaviText>
            </NaviMenu>
            <NaviMenu to = "/MyCart" active = {location.pathname === "/MyCart"}>
                <NaviIcon src = {cart_icon}/>
                <NaviText>내 장바구니</NaviText>
            </NaviMenu>
            <NaviMenu to = "/MyPage" active = {location.pathname === "/MyPage"}>
                <NaviIcon src = {my_icon}/>
                <NaviText>마이페이지</NaviText>
            </NaviMenu>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 박스 컨테이너
    display: flex;
    width: 90%;
    height: 7.5vh;
    border-top: 3px solid black;
    padding: 0 5%;
    position: fixed; 
    bottom: 0; 
    justify-content: space-around; 
    align-items: center;
    background-color: white;
    z-index: 999;

    @media (max-width: 800px) {
        width: 95%; 
        padding: 0 2.5%; 
    }

    @media (max-width: 600px) {
        width: 100%; 
        padding: 0 0; 
    }
`;

const NaviMenu = styled(Link)` // 하단네비바 메뉴
    height: 100%;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    text-decoration: none; 
    color: black;
    flex: 1;
    background-color: ${({ active }) => (active ? "#e0e0e0" : "transparent")};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    font-size: ${({ active }) => (active ? "12px" : "10px")};
`;

const NaviIcon = styled.img` // 하단네비바 아이콘
     width: 25px;
     height: 25px;

     @media (max-width: 800px) {
        width: 22.5px;
        height: 22.5px; 
    }

    @media (max-width: 600px) {
        width: 20px;
        height: 20px;
    }
`;

const NaviText = styled.div` // 하단네비바 텍스트

`;