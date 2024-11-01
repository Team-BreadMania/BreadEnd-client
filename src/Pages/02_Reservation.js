import React from 'react';
import styled from 'styled-components';
import bread_img from '../Images/bread_img.png';

export default function Reservation() {
    return(
        <Container>
            <ReservContainer>
                <ReservImage/>
                <ReservTitle>JMT 생크림 소금빵</ReservTitle>
                <ReservText>2000원</ReservText>
            </ReservContainer>
            <ReservContainer>
                <ReservImage/>
                <ReservTitle>JMT 생크림 소금빵</ReservTitle>
                <ReservText>2000원</ReservText>
            </ReservContainer>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    & > div:not(:last-child) {
        margin-bottom: 25px;
        @media (max-width:1200px){
            margin-bottom:18px;
        }
        @media (max-width:800px){
            margin-bottom:10px;
        }
    }
    width:100%;
`;
const ReservContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid black;
    border-radius: 20px;
    padding: 20px;
    width: 100%;  
    justify-content:left;  
    box-sizing: border-box;
    @media (max-width:1200px){
        padding:15px;
        }
    @media (max-width:800px){
        padding:10px;
        }
`;

;const ReservTitle = styled.div`
    width:auto;
    margin-right:10px;
    font-size:25px;
    @media (max-width:1200px){
            font-size:18px;
            margin-right:8px;
        }
    @media (max-width:800px){
            font-size:10px;
            margin-right:6px;
        }
`;
const ReservText = styled.div`
    width:auto;
    font-size:25px;
    @media (max-width:1200px){
            font-size:18px;
        }
    @media (max-width:800px){
            font-size:10px;
        }
`;
const ReservImage = styled.div`
    width: 17vw;
    height: 17vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${bread_img});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
    @media (max-width: 800px) {
        width: 16vw;
        height: 16vw;
        margin-right:12px;
    }
    @media (max-width:400px){
        width:13vw;
        height:13vw;
        margin-right:7px;
    }
    box-shadow: 0 0 10px;
`;