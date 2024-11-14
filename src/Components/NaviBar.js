import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
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
    const navigate = useNavigate(); // useNavigate로 변경
    const [userLogin, setUserLogin] = useState(true);
    const { userAuth, setUserAuth } = useContext(AuthContext);

    useEffect(() => {
        const userType = Cookies.get('userType');
        setUserAuth(userType);
        console.log(userAuth);
    }, [setUserAuth]);

    const buyerMenuItems = [
        { to: '/Search', icon: search_icon, text: '검색' },
        { to: '/Map', icon: map_icon, text: '내 주변 가게' },
        { to: '/Home', icon: home_icon, text: '홈' },
        { to: '/MyCart', icon: cart_icon, text: '내 장바구니' },
        { to: '/MyPage', icon: my_icon, text: '마이페이지', protected: true },
    ];

    const sellerMenuItems = [
        { to: '/Map', icon: edit_icon1, text: '상품 등록' },
        { to: '/MyPage', icon: home_icon, text: '홈' },
        { to: '/MySeller', icon: cart_icon, text: '상품 관리' },
    ];

    const menuItems = !userLogin ? buyerMenuItems : userAuth === 'seller' ? sellerMenuItems : buyerMenuItems;

    const handleMenuClick = (item) => {
        if (item.protected && !userLogin) {
            alert('로그인이 필요한 컨텐츠입니다.');
            navigate('/Login'); // 메인 페이지로 돌아가기
        } else {
            navigate(item.to); // 정상적인 이동
        }
        console.log(userAuth);
    };

    return (
        <Container>
            {menuItems.map((item) => (
                <NaviMenu key={item.to} active={location.pathname === item.to} onClick={() => handleMenuClick(item)}>
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

const NaviMenu = styled.div`
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
