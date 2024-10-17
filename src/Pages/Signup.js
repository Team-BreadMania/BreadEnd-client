import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import buyerImage from '../Images/buyer_icon.png'; // 구매자 이미지 경로
import sellerImage from '../Images/seller_icon.png'; // 판매자 이미지 경로

export default function Signup() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

    // 일반 사용자(구매자) 버튼 클릭 시 /normal로 이동
    const handleNormalClick = () => {
        navigate('/normal');
    };

    // 점주(판매자) 버튼 클릭 시 /seller로 이동
    const handleSellerClick = () => {
        navigate('/seller');
    };

    return (
        <SignupContainer>
            <Title> 회원 유형을 선택하세요.</Title>
            <ContentWrap>
                <UserTypeBox onClick={handleNormalClick}> {/* 일반 사용자 버튼 */}
                    <UserImage src={buyerImage} alt="구매자" />
                    <UserTypeText>일반 사용자(구매자)</UserTypeText>
                    <Description>14세 이상의 개인 회원가입</Description>
                </UserTypeBox>
                <UserTypeBox onClick={handleSellerClick}> {/* 점주(판매자) 버튼 */}
                    <UserImage src={sellerImage} alt="판매자" />
                    <UserTypeText>점주(판매자)</UserTypeText>
                    <Description>법인사업자 및 개인사업자 회원가입</Description>
                </UserTypeBox>
            </ContentWrap>
        </SignupContainer>
    );
}

// styled-components CSS 설정

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    padding-top: 100px; /* 페이지 상단에서 100px 떨어진 위치에 컨텐츠 배치 */
    background-color: #f5f5f5; /* 배경색 추가 */
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 40px; /* 제목 아래 공간을 40px */
    color: #333; /* 제목 색상 */
`;

const ContentWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 두 버튼 사이의 간격 */
`;

const UserTypeBox = styled.div`
    width: 200px;
    height: 250px;
    border: 2px solid white; /* 테두리 색상 */
    border-radius: 10px; /* 모서리 둥글게 */
    background-color: #fff; /* 배경색 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px); /* 마우스 오버 시 살짝 올라오는 애니메이션 */
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    }
`;

const UserImage = styled.img`  
    width: 130x; /* 이미지 크기 */
    height: 130px; /* 이미지 크기 */
    margin-bottom: 10px; /* 이미지와 텍스트 간의 간격 */
`;

const UserTypeText = styled.span`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #333; /* 텍스트 색상 */
`;

const Description = styled.p`
    font-size: 12px;
    text-align: center;
    color: #777; /* 설명 텍스트 색상 */
    margin-top: 5px; /* 설명과 텍스트 간의 간격 */
`;
