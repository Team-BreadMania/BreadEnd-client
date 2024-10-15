import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import breadshop_img from "../Images/breadshop_img.jpg";

export default function Shop() {

    return (
        <Container>
            <ImageBox/>
            <ShopName>삼송빵집</ShopName>
            <ShopLocation>수성구 범어1동</ShopLocation>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
`;

const ImageBox = styled.div` // 매장 이미지 박스
    width: 100%;
    height: 75%;
    background-image: url(${breadshop_img});
    background-size: cover;
    border-radius: 10px;
`;

const ShopName = styled.div` // 매장이름
    width: 100%;
    height: 10%;
    font-size: 15px;
    font-weight: bold;
    margin-top: 5%;

    @media (max-width: 1000px) {
        font-size: 14px; 
    }

    @media (max-width: 800px) {
        font-size: 13px; 
    }

    @media (max-width: 600px) {
        font-size: 12.5px; 
    }
`;

const ShopLocation = styled.div` // 매장 위치
    display: inline-block;
    height: 8%;
    margin-top: 2%;
    font-size: 12.5px;
    font-weight: bold;
    background-color: #F1F1F1;
    color: #555555;
    border-radius: 5px;
    padding: 0 5px;
    align-self: flex-start;

    @media (max-width: 1000px) {
        font-size: 12px; 
    }

    @media (max-width: 800px) {
        font-size: 11px; 
    }

    @media (max-width: 600px) {
        font-size: 10.5px; 
    }
`;