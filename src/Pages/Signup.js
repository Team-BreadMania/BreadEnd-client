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
    padding: 0;
    background-color: #f5f5f5;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 24px;
    margin: 40px 0 20px;
    color: #333;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 20px;
        margin: 30px 0 15px;
    }
`;

const ContentWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    padding: 0 10%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
        padding: 0;
    }
`;

const UserTypeBox = styled.div`
    width: 100%;
    max-width: 300px;
    height: 250px;
    border: 2px solid white;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        max-width: 90%;
        height: 200px;
    }
`;

const UserImage = styled.img`  
    width: 130px;
    height: 130px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;

const UserTypeText = styled.span`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #333;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const Description = styled.p`
    font-size: 12px;
    text-align: center;
    color: #777;
    margin-top: 5px;

    @media (max-width: 768px) {
        font-size: 10px;
    }
`;
