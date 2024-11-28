import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import "../Fonts/font.css";
import X_icon from "../Images/X_icon.png";
import trachcan_icon from "../Images/trashcan_icon.png";

export default function MyCart() {

    const [cartItems, setCartItems] = useState([]); // 장바구니 항목 상태
    const [totalPrice, setTotalPrice] = useState(0); // 전체 금액 상태

    useEffect(() => {
        const fetchCartItems = async () => {
            const accessToken = Cookies.get("accessToken");
            
            try {
                const response = await axios.get('https://breadend.shop/cart/view', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setCartItems(response.data);
                
                const total = response.data.reduce((acc, item) => acc + item.price * item.count, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("장바구니 항목을 가져오는데 실패했습니다.", error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <Container>
            <MyCartContainer>
                <Title>장바구니 목록</Title>
                <MyCartBox>
                    {cartItems.map((item) => (
                        <ProductContainer key = {item.productid}>
                            <CheckBoxContainer>
                                <CheckBox />
                            </CheckBoxContainer>
                            <ImageBox>
                                <ProductImage img = {item.imgpaths[0]}/>
                            </ImageBox>
                            <ProductInfoBox>
                                <ShopName>그리다 빵집</ShopName>
                                <ProductQuantity>수량 : {item.count}개</ProductQuantity>
                                <ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
                            </ProductInfoBox>
                            <DeleteBox>
                                <DeleteIcon />
                            </DeleteBox>
                        </ProductContainer>
                    ))}
                </MyCartBox>
                <TrashBox>
                    <TrashIcon/>
                    <Text>선택상품 일괄삭제</Text>
                </TrashBox>
                <TotalPrice>선택된 상품 금액 = {totalPrice.toLocaleString()}원 / 전체 상품 금액 = 6,000원</TotalPrice>
                <BuyBox>
                    <SelectedBuyButton>선택한 상품만 구매예약</SelectedBuyButton>
                    <TotalBuyButton>전체 상품 구매예약</TotalBuyButton>
                </BuyBox>
            </MyCartContainer>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    justify-content: center;
    width: 100%;
`;

const MyCartContainer = styled.div` // 장바구니 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 2.5%;

    @media (max-width: 1300px) {
        width: 60%; 
    }

    @media (max-width: 1200px) {
        width: 65%; 
    }

    @media (max-width: 1100px) {
        width: 70%; 
    }

    @media (max-width: 1000px) {
        width: 80%; 
    }

    @media (max-width: 800px) {
        width: 90%; 
    }

    @media (max-width: 600px) {
        width: 95%; 
    }
`;

const Title = styled.div` // 제목
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    font-family: maple-font;
    text-align: center;

    @media (max-width: 600px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 500px) {
        font-size: 25px;
    }
`;

const MyCartBox = styled.div` // 장바구니 박스 
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    margin-top: 2.5%;
    padding-bottom: 2.5%;
    background-color: #F5F5F5;
`;

const ProductContainer = styled.div` // 상품 컨테이너
    display: flex;
    width: 95%;
    height: 150px;
    background-color: white;
    border-radius: 10px;
    margin: 2.5% 0 0 2.5%;

    @media (max-width: 600px) {
        height: 125px;
    }
`;

const CheckBoxContainer = styled.div` // 체크박스 컨테이너
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
    height: 100%;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })` // 체크박스
    width: 20px;
    height: 20px;

    &:hover {
        cursor: pointer; 
    }

    @media (max-width: 800px) {
        width: 17.5px;
        height: 17.5px;
    }
`;

const ImageBox = styled.div` // 상품 이미지 컨테이너
    display: flex;
    align-items: center;
    width: 25%;
    height: 100%;  
    margin: 0 2.5%;
`;

const ProductImage = styled.div` // 상품 이미지
    width: 100%;
    height: 90%;
    background-image: url(${props => props.img});
    background-size: cover;

    @media (max-width: 500px) {
        height: 80%;
    }

    @media (max-width: 400px) {
        height: 70%;
    }
`;

const ProductInfoBox = styled.div` // 상품 정보 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
`;

const ShopName = styled.div` // 매장 이름
    font-size: 15px;
    font-weight: bold;
    color: #787878;
    margin-top: 5%;

    @media (max-width: 600px) {
        font-size: 12.5px;
        margin-top: 7.5%;
    }

    @media (max-width: 500px) {
        margin-top: 10%;
    }
`;  

const ProductName = styled.div` // 상품 이름
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-bottom: 5%;

    @media (max-width: 600px) {
        font-size: 15px;
    }

    @media (max-width: 500px) {
        margin-bottom: 7.5%;
    }
`;

const ProductQuantity = styled.div` // 상품 수량
    font-size: 15px;
    font-weight: bold;
    color: #787878;

    @media (max-width: 600px) {
        font-size: 12.5px;
    }
`;

const ProductPrice = styled.div` // 상품 가격
    font-size: 20px;
    font-weight: bold;
    color: black;

    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const DeleteBox = styled.div` // 삭제버튼 컨테이너
    display: flex;
    justify-content: right;
    margin: 10px 10px 0 0;
    width: 10%;
    height: 100%;
    margin-left: auto;
`; 

const DeleteIcon = styled.div` // 삭제버튼
    width: 42%;
    height: 20%;
    background-image: url(${X_icon});
    background-size: cover;

    &:hover {
        opacity: 0.5; 
        cursor: pointer; 
    }

    @media (max-width: 900px) {
        width: 45%;
        height: 19%;
    }

    @media (max-width: 800px) {
        width: 40%;
        height: 16.5%;
    }

    @media (max-width: 700px) {
        width: 42%;
        height: 15%;
    }

    @media (max-width: 600px) {
        width: 42%;
        height: 16%;
    }

    @media (max-width: 500px) {
        width: 55%;
        height: 16%;
    }

    @media (max-width: 400px) {
        width: 60%;
        height: 16%;
    }
`;

const TrashBox = styled.div` // 선택상품 삭제버튼 컨테이너
    display: flex;
    width: 20%;
    height: 30px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 25px 0 25px auto;
    background-color: #E0E0E0;

    &:hover {
        background-color: #C1C1C1;
        color: white;
        cursor: pointer; 
    }

    @media (max-width: 750px) {
        width: 25%;
        margin: 20px 0 20px auto;
    }

    @media (max-width: 550px) {
        width: 30%;
        margin: 15px 0 15px auto;
    }

    @media (max-width: 500px) {
        width: 35%;
        margin: 10px 0 10px auto;
    }

    @media (max-width: 400px) {
        width: 40%;
    }
`;

const TrashIcon = styled.div` // 쓰레기통 아이콘
    width: 20%;
    height: 100%;
    background-image: url(${trachcan_icon});
    background-size: cover;
`;

const Text = styled.div` // 텍스트
    font-size: 13px;
    font-weight: bold;
    line-height: 30px;

    @media (max-width: 900px) {
        font-size: 12px;
    }
`; 

const TotalPrice = styled.div` // 전체 상품 가격
    width: 100%;
    height: 50px;
    border: 1px solid black;
    border-radius: 15px;
    font-size: 15px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;

    @media (max-width: 500px) {
        font-size: 13px;
    }
`;

const BuyBox = styled.div` // 구매버튼 컨테이너
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    line-height: 100px;
    margin-top: 30px;
    margin-bottom: 100px; 

    @media (max-width: 750px) {
        height: 80px;
        line-height: 80px;
        margin-top: 20px;
        font-size: 20px;
    }

    @media (max-width: 550px) {
        height: 70px;
        line-height: 70px;
        margin-top: 15px;
        font-size: 15px;
    }

    @media (max-width: 500px) {
        height: 60px;
        line-height: 60px;
        margin-top: 10px;
    }
`;

const TotalBuyButton = styled.div` // 전체상품 구매버튼
    width: 47.5%;
    height: 100%;
    color: white;
    background-color: black;
    border-radius: 15px;

    &:hover {
        background-color: #4D4D4D;
        cursor: pointer; 
    }

    @media (max-width: 550px) {
        width: 49%;
        border-radius: 10px;
    }
`;

const SelectedBuyButton = styled.div` // 선택된 상품 구매버튼
    width: 47.5%;
    height: 100%;
    color: white;
    background-color: #0075FF;
    border-radius: 15px;

    &:hover {
        background-color: #005CFD;
        cursor: pointer; 
    }

    @media (max-width: 550px) {
        width: 49%;
        border-radius: 10px;
    }
`;