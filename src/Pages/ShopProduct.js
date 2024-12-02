import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Map from "../Components/ShopLocation";

export default function ShopProduct() {

    const ShopAddress = "경기 성남시 분당구 판교공원로2길 42";

    return (
        <Container>
            <InnerContainer>
                <ImageBox/>
                <Title>매장 정보</Title>
                <ShopContainer>
                    <ProfileBox>
                        <SubTitle>판매자</SubTitle>
                        <Profile>
                            <ProfileImage/>
                        </Profile>
                        <ProfileInfo>유저 닉네임</ProfileInfo>
                    </ProfileBox>
                    <ShopInfoBox>
                        <ShopInfo style = {{fontSize: "20px", margin: "15px 10px"}}><Bold>&lt;여기 빵집 아닙니다&gt;</Bold></ShopInfo>
                        <ShopInfo><Bold>영업 시간 : </Bold>08:00 ~ 20:00</ShopInfo>
                        <ShopInfo><Bold>매장 전화번호 : </Bold>02-1234-5678</ShopInfo>
                        <ShopInfo><Bold>매장 위치 : </Bold>경기 성남시 분당구 판교동</ShopInfo>
                        <ShopInfo><Bold>매장 상세주소 : </Bold>경기 성남시 분당구 판교공원길 512-12</ShopInfo>
                    </ShopInfoBox>
                </ShopContainer>
                <Title>지금 판매중인 상품</Title>
                <ShopProductBox>
                    <ProductContainer>
                        <ImageContainer>
                            <ProductImage/>
                        </ImageContainer>
                        <ProductInfoBox>
                            <ProductName>대충 빵 이름</ProductName>
                            <ProductInfo><Bold>개당 가격</Bold> : 2,000원</ProductInfo>
                            <ProductInfo><Bold>남은 수량</Bold> : 5개</ProductInfo>
                            <ProductInfo><Bold>제조 시간</Bold> : 오늘 오전 9시</ProductInfo>
                            <ProductInfo><Bold>판매 시간</Bold> : 오늘 오후 10시까지</ProductInfo>
                        </ProductInfoBox>
                    </ProductContainer>
                </ShopProductBox>
                <Title>매장 위치</Title>
                <ShopLocationBox>
                    <Map address = {ShopAddress}/>
                </ShopLocationBox>
            </InnerContainer>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const InnerContainer = styled.div` // 내부 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1300px) {
        width: 60%; 
    }

    @media (max-width: 1200px) {
        width: 65%; 
    }

    @media (max-width: 1100px) {
        width: 70%; 
    }

    @media (max-width: 1000px) {
        width: 80%; 
    }

    @media (max-width: 800px) {
        width: 90%; 
    }

    @media (max-width: 600px) {
        width: 100%; 
    }
`;

const ImageBox = styled.div` // 매장 이미지 박스
    width: 100%;
    height: 300px;
    background-color: brown;
`;

const Title = styled.div` // 제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #D3B795;
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-family: maple-font;
`;

const ShopContainer = styled.div` // 매장정보 컨테이너
    display: flex;
    width: 100%;
    height: 200px;
    border: 1px solid #D3B795;
    box-sizing: border-box;
`;

const ProfileBox = styled.div` // 판매자 정보 박스
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
`;

const SubTitle = styled.div` // 부제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    background-color: #D1A064;
    color: white;
    font-size: 15px;
    font-weight: bold;
`;

const Profile = styled.div` // 프로필 이미지 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60%;
`;

const ProfileImage = styled.div` // 프로필 이미지
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: black;
`;

const ProfileInfo = styled.div` // 판매자 닉네임
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    font-size: 20px;
    font-weight: bold;
    font-family: maple-font;
`;

const ShopInfoBox = styled.div` // 매장정보 박스
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    border-left: 1px solid #D3B795;
    box-sizing: border-box;
`;

const Bold = styled.span` // 글씨체 굵게
    font-weight: bold;
`;

const ShopInfo = styled.div` // 매장 상세정보
    margin-left: 10px;
    font-size: 15px;
    margin-top: 7.5px;

    @media (max-width: 400px) {
        font-size: 13px;
        margin-top: 5px;
    }
`;

const ShopProductBox = styled.div` // 매장 상품 박스
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 600px;
    border: 1px solid #D3B795;
    box-sizing: border-box;
`;

const ProductContainer = styled.div` // 상품 컨테이너
    display: flex;
    width: 95%;
    height: 130px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #D1A064;
    box-sizing: border-box;
    cursor: pointer;
`;

const ImageContainer = styled.div` // 상품 이미지 컨테이너
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;  

    @media (max-width: 500px) {
        width: 40%;
    }
`;

const ProductImage = styled.div` // 상품 이미지
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: black;
`;

const ProductInfoBox = styled.div` // 상품 정보 컨테이너
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
`;

const ProductName = styled.div` // 상품 이름
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
`;

const ProductInfo = styled.div` // 상품 정보
    font-size: 12px;
    margin-top: 5px;
`;

const ShopLocationBox = styled.div` // 매장 위치 박스
    width: 100%;
    height: 300px;
    border: 1px solid #D1A064;
    box-sizing: border-box;
    margin-bottom: 100px;
`;