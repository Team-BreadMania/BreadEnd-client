import React from 'react';
import styled from 'styled-components';

// 더미 데이터 정의
export const shopData = [
    { id: 1, img: require('../Images/bread_img01.jpg'), name: '빵집1', description: '수성구 범어동' },
    { id: 2, img: require('../Images/bread_img02.jpg'), name: '빵집2', description: '중구 동성로' },
    { id: 3, img: require('../Images/bread_img03.png'), name: '빵집3', description: '달서구 상인동' },
    { id: 4, img: require('../Images/bread_img.png'), name: '빵집4', description: '북구 칠곡' },
];

export default function SearchShop({ data }) {
    return (
        <Container>
            <ImageBox style={{ backgroundImage: `url(${data.img})` }} />
            <ShopName>{data.name}</ShopName>
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
    height: 200px; /* 기본 이미지 높이 */
    background-size: cover;
    background-position: center;
    border-radius: 10px;

    @media (max-width: 600px) {
        height: 150px; /* 모바일 화면에서 이미지 높이를 줄임 */
    }

    @media (max-width: 400px) {
        height: 120px; /* 더 작은 화면에서는 더 줄임 */
    }
`;

const ShopName = styled.div`
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
