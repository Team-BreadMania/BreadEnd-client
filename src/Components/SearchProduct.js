import React from 'react';
import styled from 'styled-components';

// 더미 데이터 정의
export const productData = [
    { id: 1, img: require('../Images/bread_img.png'), name: '빵1', description: '맛있는 소금빵' },
    { id: 2, img: require('../Images/bread_img01.jpg'), name: '빵2', description: '부드러운 크림빵' },
    { id: 3, img: require('../Images/bread_img02.jpg'), name: '빵3', description: '달콤한 초코빵' },
    { id: 4, img: require('../Images/bread_img03.png'), name: '빵4', description: '고소한 호두빵' },
];

export default function SearchProduct({ data }) {
    return (
        <Container>
            <ImageBox style={{ backgroundImage: `url(${data.img})` }} />
            <ProductName>{data.name}</ProductName>
            <Description>{data.description}</Description>
        </Container>
    );
}

// Styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
    align-items: center;
`;

const ImageBox = styled.div`
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
`;

const ProductName = styled.div`
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

const Description = styled.div`
    margin-top: 5px;
    font-size: 14px;
    color: #777;
    text-align: center;
`;
