import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import breadShop from '../Images/breadshop_img.jpg';

export default function Reservation() {
    const [isMobile, setIsMobile] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [priceUnit, setPriceUnit] = useState(0);
    const totalPrice = quantity ? Number(quantity) * priceUnit : 0;

    const resizingHandler = () => {
        if (window.innerWidth <= 430) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };
    useEffect(() => {
        if (window.innerWidth <= 430) {
            setIsMobile(true);
        }

        window.addEventListener('resize', resizingHandler);
        return () => {
            window.removeEventListener('resize', resizingHandler);
        };
    }, []);

    return (
        <Container>
            <NameContainer>찜 한 매장</NameContainer>
            <ItemContainer>
                <CheckboxContainer>
                    <CheckBox />
                </CheckboxContainer>
                <ShopImage backgroundImage={breadShop} />
                <InformationConatiner>
                    <ShopNameContainer>오둥이 빵집</ShopNameContainer>
                    <ShopNumberContainer>매장 전화번호 : 02-546-7588</ShopNumberContainer>
                    <ShopLocationContainer>매장 주소 : 서울특별시 강남구 압구정로30길 9</ShopLocationContainer>
                </InformationConatiner>
            </ItemContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    @media (max-width: 800px) {
        padding: 10px;
    }
    @media (max-width: 450px) {
        padding: 8px;
    }
`;

const NameContainer = styled.div`
    text-align: left;
    border-bottom: 1px solid #bdbdbd;
    margin-bottom: 20px;
    font-size: 20px;
    @media (max-width: 1200px) {
        font-size: 16px;
    }
    @media (max-width: 1000px) {
        font-size: 14px;
    }
    @media (max-width: 800px) {
        font-size: 12px;
        margin-bottom: 10px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
        margin-bottom: 6px;
    }
`;
//가게 컨테이너
const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1%;
    border: solid 1px #e6e6fa;
    border-radius: 20px;
    align-items: center;
    @media (max-width: 1280px) {
        border-radius: 15px;
    }
    @media (max-width: 768px) {
        border-radius: 10px;
    }

    @media (max-width: 480px) {
        border-radius: 10px;
    }
`;
//가게 이미지 컨테이너
const ShopImage = styled.div`
    width: 200px;
    height: 150px;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: contain;
    background-repeat: no-repeat;
    border-radius: 20px;
    @media (max-width: 1920px) {
        width: 200px;
        height: 150px;
    }
    @media (max-width: 1600px) {
        width: 180px;
        height: 135px;
    }
    @media (max-width: 1366px) {
        width: 180px;
        height: 135px;
    }
    @media (max-width: 1280px) {
        width: 169px;
        height: 120px;
    }
    @media (max-width: 768px) {
        width: 100px;
        height: 75px;
    }

    @media (max-width: 480px) {
        width: 0;
        height: 0;
    }
`;
//가게 정보 컨테이너
const InformationConatiner = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    @media (max-width: 1024px) {
        padding-left: 16px;
    }
    @media (max-width: 480px) {
        padding-left: 10px;
    }
`;
//체크박스 컨테이너
const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
    height: 100%;
`;
//체크박스
const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    width: 20px;
    height: 20px;

    &:hover {
        cursor: pointer;
    }

    @media (max-width: 800px) {
        width: 17.5px;
        height: 17.5px;
    }
    @media (max-width: 450px) {
        width: 12px;
        height: 12px;
    }
`;
//가게 이름 컨테이너
const ShopNameContainer = styled.div`
    font-size: 24px;
    @media (max-width: 1200px) {
        font-size: 22px;
    }
    @media (max-width: 1000px) {
        font-size: 20px;
    }
    @media (max-width: 800px) {
        font-size: 18px;
    }
    @media (max-width: 600px) {
        font-size: 13.5px;
    }
    @media (max-width: 400px) {
        font-size: 9px;
    }
`;
const ShopNumberContainer = styled.div`
    font-size: 20px;
    @media (max-width: 1200px) {
        font-size: 18px;
    }
    @media (max-width: 1000px) {
        font-size: 16px;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
    @media (max-width: 600px) {
        font-size: 10.5px;
    }
    @media (max-width: 400px) {
        font-size: 8px;
    }
`;
const ShopLocationContainer = styled.div`
    font-size: 20px;
    @media (max-width: 1200px) {
        font-size: 18px;
    }
    @media (max-width: 1000px) {
        font-size: 16px;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
    @media (max-width: 600px) {
        font-size: 10.5px;
    }
    @media (max-width: 400px) {
        font-size: 8px;
    }
`;
