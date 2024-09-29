import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import search_icon from '../Images/search_icon.svg';
import map_icon from '../Images/map_icon.svg';
import home_icon from '../Images/home_icon.svg';
import cart_icon from '../Images/cart_icon.svg';
import my_icon from '../Images/my_icon.svg';
import edit_icon from '../Images/edit_icon.png';

export default function NaviBar() {
    const location = useLocation();
    const [userLogin, setUserLogin] = useState(false);
    const [userAuth, setUserAuth] = useState('buyer');

    const buyerMenuItems = [
        { to: '/Search', icon: search_icon, text: '검색' },
        { to: '/Map', icon: map_icon, text: '내 주변 가게' },
        { to: '/Home', icon: home_icon, text: '홈' },
        { to: '/MyCart', icon: cart_icon, text: '내 장바구니' },
        { to: '/MyPage_buyer', icon: my_icon, text: '마이페이지' },
    ];

    const sellerMenuItems = [
        { to: '/Search', icon: search_icon, text: '검색' },
        { to: '/Map', icon: edit_icon, text: '판매물품 등록' },
        { to: '/Home', icon: home_icon, text: '홈' },
        { to: '/MySeller', icon: cart_icon, text: '내 판매상품' },
        { to: '/MyPage_buyer', icon: my_icon, text: '마이페이지' },
    ];

    const menuItems = !userLogin ? buyerMenuItems : userAuth === 'seller' ? sellerMenuItems : buyerMenuItems;

    return (
        <Container>
            {menuItems.map((item) => (
                <NaviMenu key={item.to} to={item.to} active={location.pathname === item.to}>
                    <NaviIcon src={item.icon} />
                    <NaviText>{item.text}</NaviText>
                </NaviMenu>
            ))}
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div`
    display: flex;
    width: 90%;
    height: 7.5vh;
    border-top: 3px solid black;
    padding: 0 5%;
    position: fixed;
    bottom: 0;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 800px) {
        width: 95%;
        padding: 0 2.5%;
    }

    @media (max-width: 600px) {
        width: 100%;
        padding: 0 0;
    }
`;

const NaviMenu = styled(Link)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    flex: 1;
    background-color: ${({ active }) => (active ? '#e0e0e0' : 'transparent')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    font-size: ${({ active }) => (active ? '12px' : '10px')};
`;

const NaviIcon = styled.img`
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

const NaviText = styled.div`
    // 하단네비바 텍스트 스타일
`;
