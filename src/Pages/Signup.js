import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import './Signup.css';  // CSS 파일 임포트

import styled from 'styled-components';

export default function Signup() {
    return (
        <SignupContainer>
            <Title>가입유형을 선택해주세요.</Title>
            <ContentWrap>
                <UserTypeBox>
                    <UserTypeText>일반사용자(구매자)</UserTypeText>
                </UserTypeBox>
                <UserTypeBox>
                    <UserTypeText>점주(판매자)</UserTypeText>
                </UserTypeBox>
            </ContentWrap>
        </SignupContainer>
    );
}

// 아래부터 styled-components CSS 설정

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    padding-top: 100px; /* 페이지 상단에서 100px 떨어진 위치에 컨텐츠 배치 */
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 40px; /* 제목 아래 공간을 40px */
`;

const ContentWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 두 사각형 사이의 간격 */
`;

const UserTypeBox = styled.div`
    width: 200px;
    height: 150px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px); /* 마우스 오버 시 살짝 올라오는 애니메이션 */
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    }
`;

const UserTypeText = styled.span`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`;
