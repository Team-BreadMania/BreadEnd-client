import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import WelcomeImage from "../Images/WelcomeImage.png";

export default function WelcomeHomePage() {

    const navigate = useNavigate();

    const handleLoginClick = () => { // 로그인 페이지로 이동
        navigate('/Login'); 
    };

    const handleSignUpClick = () => { // 회원가입 페이지로 이동
        navigate('/SignUp'); 
    };

    return (
        <Container>
            <Title>빵끝마켓</Title>
            <WelcomeImageBox/>
            <Greeting>
                안녕하세요.<br className="break" />
                빵끝마켓 플랫폼에 방문하신걸 환영합니다!
            </Greeting>
            <TextBox>내 주변의 빵집에서 저렴한 가격으로 빵들을 구매하고 싶을땐?</TextBox>
            <TextBox style = {{color: "#B87F3C"}}>소비기한이 임박한 빵들을 저렴하게라도 빨리 팔고 싶을땐?</TextBox>
            <LinkBox onClick = {handleLoginClick}>빵끝마켓 로그인하기</LinkBox>
            <Text2>아직 회원이 아니신가요? -&gt; 
                <span style = {{ color: "#8D591B", cursor: "pointer" }} onClick = {handleSignUpClick}> 회원가입 이동하기</span>
            </Text2>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
    font-weight: bold;
    background-color: #F0E9DD;
    color: #D1A064;

    @media (max-width: 800px) {
        font-size: 25px;
    }

    @media (max-width: 650px) {
        font-size: 20px;
    }

    @media (max-width: 500px) {
        font-size: 15px;
    }

    @media (max-width: 450px) {
        font-size: 20px;
    }
`;

const WelcomeImageBox = styled.div` // 웰컴 페이지 이미지
    background-image: url(${WelcomeImage}); 
    background-size: cover;
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
    transition: transform 100s ease; 

    &:hover {
        transform: rotate(360000deg); 
    }
`;

const LinkBox = styled.div` // 링크 박스
    display: inline-block;
    padding: 10px;
    height: 50px;
    margin-top: 30px;
    background-color: #D1A064;
    color: white;
    border-radius: 10px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 50px;
    cursor: pointer;

    @media (max-width: 800px) {
        font-size: 25px;
        height: 40px;
        line-height: 40px;
    }

    @media (max-width: 600px) {
        font-size: 20px;
        height: 30px;
        line-height: 30px;
    }
`;

const Title = styled.div` // 타이틀
    font-size: 50px;
    font-weight: bold;
    font-family: maple-font;
    color: #A46E2C;
    margin-bottom: 20px;
`;

const TextBox = styled.div` // 텍스트 박스
    font-size: 25px;
    font-weight: bold;
    font-family: maple-font;
    color: #8D591B;
    margin-top: 20px;

    @media (max-width: 800px) {
        font-size: 20px;
    }

    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const Text2 = styled.div` // 텍스트 
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
    color: black;
`;

const Greeting = styled.div` // 인사 메시지 스타일
    text-align: center;
    margin-bottom: 20px;

    .break {
        display: none; 
    }

    @media (max-width: 450px) {
        .break {
            display: block; 
        }
    }
`;