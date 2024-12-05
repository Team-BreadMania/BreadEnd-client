import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import search_icon from '../Images/search_icon.svg';
import map_icon from '../Images/map_icon.svg';
import home_icon from '../Images/home_icon.svg';
import cart_icon from '../Images/cart_icon.svg';
import my_icon from '../Images/my_icon.svg';
import edit_icon1 from '../Images/edit_icon1.png';

export default function NaviBar() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [userLogin, setUserLogin] = useState(true);
    const { userAuth, setUserAuth } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        const userType = Cookies.get('userType');
        setUserAuth(userType);
        if (userType) {
            setUserLogin(true);
        } else {
            setUserLogin(false);
        }
        console.log(userAuth);
    }, [userAuth, setUserAuth]);

    const buyerMenuItems = [
        { to: '/Search', icon: search_icon, text: '검색' },
        { to: '/Map', icon: map_icon, text: '내 주변 가게' },
        { to: '/Home', icon: home_icon, text: '홈' },
        { to: '/MyCart', icon: cart_icon, text: '내 장바구니' },
        { to: '/MyPage', icon: my_icon, text: '마이페이지', protected: true },
    ];

    const sellerMenuItems = [
        { to: '/ProductRegistration', icon: edit_icon1, text: '상품 등록' },
        { to: '/MyPage', icon: home_icon, text: '홈' },
        { to: '/ProductManagement', icon: cart_icon, text: '상품 관리' },
    ];

    let menuItems;

    if (!userLogin || userAuth === 'buyer') {
        menuItems = buyerMenuItems;
    } else if (userLogin && userAuth === 'seller') {
        menuItems = sellerMenuItems;
    } else {
        menuItems = buyerMenuItems; 
    }

    const handleMenuClick = (item) => {
        if (item.protected && !userLogin) {
            alert('로그인이 필요한 컨텐츠입니다.');
            navigate('/Login'); 
        } else {
            navigate(item.to); 
        }
        console.log(userAuth);
    };

    return (
        <Container>
            {menuItems.map((item) => (
                <NaviMenu key={item.to} active={location.pathname === item.to} onClick={() => handleMenuClick(item)}>
                    <NaviIcon src={item.icon} />
                    <NaviText>{item.text}</NaviText>
                    {item.to === '/MyCart' && cartItems.length > 0 && ( 
                        <Badge>{cartItems.length}</Badge>
                    )}
                </NaviMenu>
            ))}
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
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

const NaviMenu = styled.div` // 네비 메뉴바
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
    cursor: pointer; // 클릭 가능한 요소로 변경
    position: relative;
`;

const NaviIcon = styled.img` // 네비 아이콘
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

const NaviText = styled.div` // 하단네비바 텍스트 스타일
`;

const Badge = styled.div` // 장바구니 알림
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`;