import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Map from "../Components/ShopLocation";

export default function ShopProduct() {

    const location = useLocation(); 
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search); 
    const id = query.get("id"); 

    const [shopInfo, setShopInfo] = useState(null); // 매장 정보
    const [products, setProducts] = useState([]); // 상품 정보
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const productsPerPage = 4; // 한 페이지에 보여줄 상품 수

    useEffect(() => {
        const fetchShopInfo = async () => {
            try {
                const response = await axios.get(`https://breadend.shop/shopInfo/return?shopid=${id}`);
                setShopInfo(response.data.shopInfo);
                setProducts(response.data.products);
            } catch (error) {
                console.error("매장정보 조회중 에러발생 : ", error);
            }
        };

        fetchShopInfo();
    }, [id]);

    const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleNext = () => { // 다음버튼 메서드
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => { // 이전버튼 메서드
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleProductClick = (productId) => { // 상품 상세페이지 이동 메서드
        navigate(`/ProductDetailPage?id=${productId}`);
    };

    return (
        <Container>
            <InnerContainer>
                <ImageBox img = {shopInfo?.shopIMG}/>
                <Title>매장 정보</Title>
                <ShopContainer>
                    <ProfileBox>
                        <SubTitle>판매자</SubTitle>
                        <Profile>
                            <ProfileImage img = {shopInfo?.userIMG}/>
                        </Profile>
                        <ProfileInfo>{shopInfo?.nickname}</ProfileInfo>
                    </ProfileBox>
                    <ShopInfoBox>
                        <ShopInfo style = {{fontSize: "20px", margin: "15px 10px"}}><Bold>&lt;{shopInfo?.shop_name}&gt;</Bold></ShopInfo>
                        <ShopInfo><Bold>영업 시간 : </Bold>08:00 ~ 20:00</ShopInfo>
                        <ShopInfo><Bold>매장 전화번호 : </Bold>{shopInfo?.shop_number}</ShopInfo>
                        <ShopInfo><Bold>매장 위치 : </Bold>{shopInfo?.location}</ShopInfo>
                        <ShopInfo><Bold>매장 상세주소 : </Bold>{shopInfo?.detaillocation}</ShopInfo>
                    </ShopInfoBox>
                </ShopContainer>
                <Title>지금 판매중인 상품</Title>
                <ShopProductBox>
                    {displayedProducts.map(product => (
                        <ProductContainer key = {product.productid} onClick = {() => handleProductClick(product.productid)}>
                            <ImageContainer>
                                <ProductImage img = {product.imgpaths[0]} />
                            </ImageContainer>
                            <ProductInfoBox>
                                <ProductName>{product.itemname}</ProductName>
                                <ProductInfo><Bold>개당 가격</Bold> : {product.price}원</ProductInfo>
                                <ProductInfo><Bold>남은 수량</Bold> : {product.count}개</ProductInfo>
                                <ProductInfo><Bold>제조 시간</Bold> : {product.makedate}</ProductInfo>
                                <ProductInfo><Bold>판매 시간</Bold> : {product.expireddate}</ProductInfo>
                            </ProductInfoBox>
                        </ProductContainer>
                    ))}
                    <ButtonBox>
                        <Button onClick = {handlePrevious} disabled = {currentPage === 0}>
                            ◀
                        </Button>
                        <ProductPageNumber>{currentPage + 1}</ProductPageNumber>
                        <Button onClick = {handleNext} disabled = {currentPage >= totalPages - 1}>
                            ▶
                        </Button>
                    </ButtonBox>
                </ShopProductBox>
                <Title>매장 위치</Title>
                <ShopLocationBox>
                    <Map address = {shopInfo?.detaillocation}/>
                </ShopLocationBox>
            </InnerContainer>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const InnerContainer = styled.div` // 내부 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;

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
        width: 100%; 
    }
`;

const ImageBox = styled.div` // 매장 이미지 박스
    width: 100%;
    height: 300px;
    background-image: url(${props => props.img});
    background-size: cover;
`;

const Title = styled.div` // 제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #D3B795;
    color: white;
    font-size: 20px;
    font-weight: bold;
    font-family: maple-font;
`;

const ShopContainer = styled.div` // 매장정보 컨테이너
    display: flex;
    width: 100%;
    height: 200px;
    border: 1px solid #D3B795;
    box-sizing: border-box;
`;

const ProfileBox = styled.div` // 판매자 정보 박스
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
`;

const SubTitle = styled.div` // 부제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    background-color: #D1A064;
    color: white;
    font-size: 15px;
    font-weight: bold;
`;

const Profile = styled.div` // 프로필 이미지 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60%;
`;

const ProfileImage = styled.div` // 프로필 이미지
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;
`;

const ProfileInfo = styled.div` // 판매자 닉네임
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    font-size: 20px;
    font-weight: bold;
    font-family: maple-font;
`;

const ShopInfoBox = styled.div` // 매장정보 박스
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    border-left: 1px solid #D3B795;
    box-sizing: border-box;
`;

const Bold = styled.span` // 글씨체 굵게
    font-weight: bold;
`;

const ShopInfo = styled.div` // 매장 상세정보
    margin-left: 10px;
    font-size: 15px;
    margin-top: 7.5px;

    @media (max-width: 400px) {
        font-size: 13px;
        margin-top: 5px;
    }
`;

const ShopProductBox = styled.div` // 매장 상품 박스
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 600px;
    border: 1px solid #D3B795;
    box-sizing: border-box;
`;

const ProductContainer = styled.div` // 상품 컨테이너
    display: flex;
    width: 95%;
    height: 130px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #D1A064;
    box-sizing: border-box;
    cursor: pointer;
`;

const ImageContainer = styled.div` // 상품 이미지 컨테이너
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;  

    @media (max-width: 500px) {
        width: 40%;
    }
`;

const ProductImage = styled.div` // 상품 이미지
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;
`;

const ProductInfoBox = styled.div` // 상품 정보 컨테이너
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
`;

const ProductName = styled.div` // 상품 이름
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
`;

const ProductInfo = styled.div` // 상품 정보
    font-size: 12px;
    margin-top: 5px;
`;

const ShopLocationBox = styled.div` // 매장 위치 박스
    width: 100%;
    height: 300px;
    border: 1px solid #D1A064;
    box-sizing: border-box;
    margin-bottom: 100px;
`;

const ButtonBox = styled.div` // 버튼 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: auto;
`;

const Button = styled.div` // ◀, ▶ 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 70%;
    border: ${(props) => (props.disabled ? 'none' : '1px solid black')};
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    color: ${(props) => (props.disabled ? 'transparent' : 'black')};
    &:hover {
        background-color: ${(props) => (props.disabled ? 'transparent' : '#C1C1C1')};
    }
`;

const ProductPageNumber = styled.div` // 상품페이지 숫자
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 70%;
    font-size: 20px;
`;