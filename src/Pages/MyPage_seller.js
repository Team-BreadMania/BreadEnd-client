import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Avata from '../Images/Generic_avatar.png';
import Favorite from '../Images/favorite.png';

export default function MyPage_seller() {
    return (
        //구매자 마이페이지
        <Container>
            <LeftContainer>
                <MypageContaer>마이페이지</MypageContaer>
                <LinkContainer href="/MyPage">내 계정 정보</LinkContainer>
                <LinkContainer href="/MyPage">판매 제품 관리</LinkContainer>
                <LinkContainer href="/MyPage">판매 예약 관리</LinkContainer>
                <LinkContainer href="/MyPage">리뷰 관리</LinkContainer>
                <LinkContainer href="/MyPage">내 문의 내역</LinkContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <UserNameContainer>이름</UserNameContainer>
                </UserContainer>
                <ToolContainer></ToolContainer>
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    border-radius: 5px;
    max-width: 100%;
    padding: 0 10%;
`;
const LeftContainer = styled.div`
    min-width: 19%;
    font-size: 1.875rem;
    padding-top: 3%;
    margin-right: 20px;
    padding-left: 20px;
    border-right: 2px solid black;
`;

const MypageContaer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
`;

const LinkContainer = styled.a`
    display: block;
    text-decoration: none;
    color: black;
    font-size: 1.563rem;
    margin-bottom: 15px;
`;

const RightContainer = styled.div`
    min-width: 71%;
    padding-top: 3%;
    margin-left: 3%;
`;
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const UserNameContainer = styled.div`
    font-size: 1.875rem;
    margin-left: 30px;
`;
const UserImage = styled.div`
    width: 80px;
    height: 80px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
`;
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
