import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import bread_img from "../Images/bread_img.png";
import dibs_before from "../Images/dibs_before.png";
import dibs_after from "../Images/dibs_after.png";

export default function Product() {

    const [dibs, setDibs] = useState(false); // 찜하기 상태

    const toggleDibs = () => { // 찜상태 토클 메서드
        setDibs(prev => !prev); 
    };

    return (
        <Container>
            <ImageBox/>
            <ProductName>JMT 생크림 소금빵</ProductName>
            <ShopName>그리다 빵집</ShopName>
            <BottomBox>
                <Price>2,000원</Price>
                <Dibs onClick = {toggleDibs} dib = {dibs}/>
            </BottomBox>
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

const ImageBox = styled.div` // 상품 이미지 박스
    width: 100%;
    height: 65%;
    background-image: url(${bread_img});
    background-size: cover;
    border-radius: 10px;
`;

const ProductName = styled.div` // 상품 이름
    width: 100%;
    height: 12.5%;
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 800px) {
        font-size: 12.5px; 
    }

    @media (max-width: 600px) {
        font-size: 12px; 
    }
`;

const ShopName = styled.div` // 매장 이름
    width: 100%;
    height: 10%;
    font-size: 12.5px;
    font-weight: bold;
    color: #787878;

    @media (max-width: 800px) {
        font-size: 11px; 
    }

    @media (max-width: 600px) {
        font-size: 10.5px; 
    }
`;

const BottomBox = styled.div` // 상품정보 하단박스
    display: flex;
    width: 100%;
    height: 12.5%;
`;

const Price = styled.div` // 상품 가격
    width: 75%;
    height: 100%;
    font-size: 15px;
    font-weight: bold;
    align-items: center

    @media (max-width: 800px) {
        font-size: 12.5px; 
    }

    @media (max-width: 600px) {
        font-size: 12px; 
    }
`;

const Dibs = styled.div` // 상품 찜하기 아이콘
    width: 15%;
    height: 100%;
    background-image: url(${props => (props.dib ? dibs_after : dibs_before)});
    background-size: cover;
    cursor: pointer;
    transition: background-image 0.2s ease;
`;