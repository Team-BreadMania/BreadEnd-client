/* eslint-disable */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import menu_icon from '../Images/menu_icon.svg';
import logo_icon from '../Images/WelcomeImage.png';
import alarm_icon from '../Images/alarm_icon.svg';
import '../Fonts/font.css';

export default function Header() {
    const navigate = useNavigate();
    const { userAuth, setUserAuth } = useContext(AuthContext);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        const userType = Cookies.get('userType');
        setUserAuth(userType);
    }, [setUserAuth]);

    const handleOutsideClick = (event) => {
        // 메뉴가 열려있고 클릭된 요소가 메뉴와 관련이 없을 때
        if (menuVisible && !event.target.closest('#menu-container') && !event.target.closest('#menu-button')) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [menuVisible]);


    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('userType');
        setUserAuth(null);
        navigate('/'); // 홈으로 이동
    };

    // 로고 클릭 시 호출되는 함수
    const handleLogoClick = () => {
        if (userAuth === 'seller') {
            navigate('/MyPage'); // seller일 때 MyPage로 이동
        } else {
            navigate('/Home'); // 나머지 경우는 Home으로 이동
        }
        window.location.reload();
        console.log(userAuth);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible); // 메뉴 가시성 토글
    };

    return (
        <Container>
            <Box>
                <MenuButton id="menu-button" onClick={toggleMenu} />
            </Box>
            <Box style={{ width: '60%' }}>
                <LogoButton onClick={handleLogoClick}>
                    <LogoIcon />
                    <LogoText>빵끝마켓</LogoText>
                </LogoButton>
            </Box>
            <Box style={{ width: '10%', justifyContent: 'flex-end' }}>
                {' '}
                {/* 로그인과 회원가입 박스를 담는 박스 */}
                {Cookies.get('accessToken') ? (
                    // 로그인 상태인 경우
                    <LogoutBox onClick={handleLogout}>로그아웃</LogoutBox>
                ) : (
                    <>
                        <SignupBox to="/Signup">회원가입</SignupBox>
                    </>
                )}
            </Box>
            <Box>
                <AlarmButton />
            </Box>
            {menuVisible && ( 
                <MenuContainer id = "menu-container">
                    <MenuItem onClick={() => setMenuVisible(false)}>공지사항</MenuItem>
                    <MenuItem onClick={() => setMenuVisible(false)}>이벤트</MenuItem>
                    <MenuItem onClick={() => setMenuVisible(false)}>문의하기</MenuItem>
                    <MenuItem onClick={() => setMenuVisible(false)}>신고하기</MenuItem>
                </MenuContainer>
            )}
        </Container>
    );
}

// 아래는 styled-components CSS 설정 그대로 유지

const Container = styled.div`
    display: flex;
    width: 90%;
    height: 60px;
    border-bottom: 3px solid black;
    padding: 0 5%;

    @media (max-width: 800px) {
        width: 95%;
        padding: 0 2.5%;
    }

    @media (max-width: 600px) {
        width: 100%;
        padding: 0 0;
    }
`;

const Box = styled.div`
    display: flex;
    width: 15%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const SignupBox = styled(Link)`
    display: flex;
    width: auto;
    height: 100%;
    justify-content: right;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    white-space: nowrap; /* 줄바꿈 방지 */

    @media (max-width: 800px) {
        font-size: 11px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;

const LogoutBox = styled.div`
    display: flex;
    width: auto;
    height: 100%;
    justify-content: right;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;

    @media (max-width: 800px) {
        font-size: 11px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;

const MenuButton = styled.div`
    width: 50%;
    height: 50%;
    background-image: url(${menu_icon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 40%;
        height: 40%;
    }
`;

const AlarmButton = styled.div`
    width: 50%;
    height: 50%;
    background-image: url(${alarm_icon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 40%;
        height: 40%;
    }
`;

const LogoButton = styled.div`
    display: flex;
    width: 60%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: black;
    text-decoration: none;
`;

const LogoIcon = styled.div`
    width: 20%;
    height: 70%;
    background-image: url(${logo_icon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: 500px) {
        width: 25%;
    }
    &:hover {
        cursor: pointer;
    }
`;

const LogoText = styled.div`
    font-family: maple-font;
    font-size: 30px;

    @media (max-width: 500px) {
        font-size: 25px;
    }

    @media (max-width: 400px) {
        font-size: 22.5px;
    }
    &:hover {
        cursor: pointer;
    }
`;

const MenuContainer = styled.div`
    position: absolute;
    width: 200px;
    top: 60px; 
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const MenuItem = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;