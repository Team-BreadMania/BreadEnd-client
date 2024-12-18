import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Product({ item }) {

    return (
        <Container>
            <ImageBox img = {item.imgpaths[0]}/>
            <ProductName>{item.itemname}</ProductName>
            <ShopName>{item.shopname}</ShopName>
            <BottomBox>
                <Price>{item.price}원</Price>
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
    background-image: url(${props => props.img});
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
    width: 100%;
    height: 100%;
    font-size: 15px;
    font-weight: bold;
    align-items: center;
    @media (max-width: 800px) {
        font-size: 12.5px; 
    }

    @media (max-width: 600px) {
        font-size: 12px; 
    }
`;