import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import menu_icon from "../Images/menu_icon.svg";
import logo_icon from "../Images/logo_icon.png";
import alarm_icon from "../Images/alarm_icon.svg";
import "../Fonts/font.css";

export default function Header() {
    return (
        <Container>
            <Box><MenuButton/></Box>
            <Box style={{ width: "60%" }}>
                <LogoButton to="/Home">
                    <LogoIcon/>
                    <LogoText>빵끝마켓</LogoText>
                </LogoButton>
            </Box>
            <Box style={{ width: "20%", justifyContent: "flex-end" }}> {/* 로그인과 회원가입 박스를 담는 박스 */}
                <LoginBox to="/Login">로그인</LoginBox>
                <SignupBox to="/Signup">회원가입</SignupBox>
            </Box>
            <Box><AlarmButton/></Box>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 박스 컨테이너
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

const Box = styled.div` // 내부 박스 컨테이너
    display: flex;
    width: 15%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const LoginBox = styled(Link)` // 로그인 박스 컨테이너
    display: flex;
    width: auto;
    padding-right: 15px;
    height: 100%;
    justify-content: right;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    color: black;
    text-decoration: none;

    @media (max-width: 800px) {
        font-size: 12.5px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;

const SignupBox = styled(Link)` // 회원가입 박스 컨테이너
    display: flex;
    width: auto;
    padding-left: 15px;
    height: 100%;
    justify-content: right;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    color: black;
    text-decoration: none;

    @media (max-width: 800px) {
        font-size: 12.5px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
    }
`;

const MenuButton = styled.div` // 헤더 좌측 메뉴버튼
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

const AlarmButton = styled.div` // 헤더 우측 알람버튼
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

const LogoButton = styled(Link)` // 헤더 중앙 로고버튼
    display: flex;
    width: 60%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: black;
    text-decoration: none;
`;

const LogoIcon = styled.div` // 로고 아이콘
    width: 20%;
    height: 100%;
    background-image: url(${logo_icon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: 500px) {
        width: 25%;
    }
`;

const LogoText = styled.div` // 로고 텍스트
    font-family: maple-font;
    font-size: 30px;

    @media (max-width: 500px) {
        font-size: 25px;
    }

    @media (max-width: 400px) {
        font-size: 22.5px;
    }
`;
