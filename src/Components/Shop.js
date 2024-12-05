import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Shop({ shop }) {

    const getDistrictAndNeighborhood = (location) => { // 주소 변환 메서드
        const parts = location.split(' '); 
        const length = parts.length;
        if (length >= 2) {
            return `${parts[length - 2]} ${parts[length - 1]}`; 
        }
        return location; 
    };

    const districtAndNeighborhood = getDistrictAndNeighborhood(shop.location);


    return (
        <Container>
            <ImageBox img = {shop.shopIMG}/>
            <BottomBox>
                <ShopInfo>
                    <ShopName>{shop.shop_name}</ShopName>
                    <ShopLocation>{districtAndNeighborhood}</ShopLocation>
                </ShopInfo>
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

const ImageBox = styled.div` // 매장 이미지 박스
    width: 100%;
    height: 70%;
    background-image: url(${props => props.img});
    background-size: cover;
    border-radius: 5px;
`;

const BottomBox = styled.div` // 하단박스
    display: flex;
    width: 100%;
    height: 30%;
`;

const ShopInfo = styled.div` // 매장정보 박스
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const ShopName = styled.div` // 매장이름
    display: flex;
    align-items: center;
    width: 100%;
    height: 60%;
    font-size: 15px;
    font-weight: bold;

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
    display: flex;
    align-items: center;
    height: 40%;
    font-size: 12.5px;
    font-weight: bold;
    background-color: #f1f1f1;
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