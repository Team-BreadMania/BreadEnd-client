import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import menu_icon from '../Images/menu_icon.svg';
import logo_icon from '../Images/logo_icon.png';
import alarm_icon from '../Images/alarm_icon.svg';
import '../Fonts/font.css';

export default function Header() {
    const navigate = useNavigate();
    const { userAuth, setUserAuth } = useContext(AuthContext);

    useEffect(() => {
        const userType = Cookies.get('userType');
        setUserAuth(userType);
    }, [setUserAuth]);

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
        console.log(userAuth);
    };

    return (
        <Container>
            <Box>
                <MenuButton />
            </Box>
            <Box style={{ width: '60%' }}>
                <LogoButton onClick={handleLogoClick}>
                    <LogoIcon />
                    <LogoText>빵끝마켓</LogoText>
                </LogoButton>
            </Box>
            <Box style={{ width: '20%', justifyContent: 'flex-end' }}>
                {' '}
                {/* 로그인과 회원가입 박스를 담는 박스 */}
                {Cookies.get('accessToken') ? (
                    // 로그인 상태인 경우
                    <LogoutBox onClick={handleLogout}>로그아웃</LogoutBox>
                ) : (
                    <>
                        <LoginBox to="/Login">로그인</LoginBox>
                        <SignupBox to="/Signup">회원가입</SignupBox>
                    </>
                )}
            </Box>
            <Box>
                <AlarmButton />
            </Box>
        </Container>
    );
}

// 아래는 styled-components CSS 설정 그대로 유지

const Container = styled.div`
    display: flex;
    width: 90%;
    height: 7.5vh;
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

const LoginBox = styled(Link)`
    display: flex;
    width: auto;
    padding-right: 15px;
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
        padding-right: 10px; /* 오른쪽 여백 줄이기 */
    }

    @media (max-width: 600px) {
        font-size: 10px;
        padding-right: 5px; /* 오른쪽 여백 더 줄이기 */
    }
`;

const SignupBox = styled(Link)`
    display: flex;
    width: auto;
    padding-left: 15px;
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
        padding-left: 10px; /* 왼쪽 여백 줄이기 */
    }

    @media (max-width: 600px) {
        font-size: 10px;
        padding-left: 5px; /* 왼쪽 여백 더 줄이기 */
    }
`;

const LogoutBox = styled.div`
    display: flex;
    width: auto;
    padding-right: 15px;
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
        padding-right: 10px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
        padding-right: 5px;
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
    height: 100%;
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
