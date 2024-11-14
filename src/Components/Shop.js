import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import breadshop_img from '../Images/breadshop_img.jpg';
import dibs_before from '../Images/dibs_before.png';
import dibs_after from '../Images/dibs_after.png';

export default function Shop() {
    const [dibs, setDibs] = useState(false); // 찜하기 상태

    const toggleDibs = () => {
        // 찜상태 토클 메서드
        setDibs((prev) => !prev);
    };

    return (
        <Container>
            <ImageBox />
            <BottomBox>
                <ShopInfo>
                    <ShopName>삼송빵집</ShopName>
                    <ShopLocation>수성구 범어1동</ShopLocation>
                </ShopInfo>
                <Dibs onClick={toggleDibs} dib={dibs} />
            </BottomBox>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div`
    // 최상단 컨테이너
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
`;

const ImageBox = styled.div`
    // 매장 이미지 박스
    width: 100%;
    height: 70%;
    background-image: url(${breadshop_img});
    background-size: cover;
    border-radius: 5px;
`;

const BottomBox = styled.div`
    // 하단박스
    display: flex;
    width: 100%;
    height: 30%;
`;

const ShopInfo = styled.div`
    // 매장정보 박스
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
`;

const ShopName = styled.div`
    // 매장이름
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

const ShopLocation = styled.div`
    // 매장 위치
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

const Dibs = styled.div`
    // 매장 찜하기 아이콘
    display: flex;
    margin-top: auto;
    margin-left: auto;
    width: 30px;
    height: 30px;
    background-image: url(${(props) => (props.dib ? dibs_after : dibs_before)});
    background-size: cover;
    cursor: pointer;
    transition: background-image 0.2s ease;

    @media (max-width: 500px) {
        width: 20px;
        height: 20px;
    }
`;
