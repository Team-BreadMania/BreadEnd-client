import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../Components/Review";
import Map from "../Components/ShopLocation";
import bread_img01 from "../Images/bread_img01.jpg";
import bread_img02 from "../Images/bread_img02.jpg";
import bread_img03 from "../Images/bread_img03.png";
import profile_img from "../Images/profileimg.png";
import shop_img from "../Images/breadshop_img.jpg";
import dibs_before from "../Images/dibs_before.png";
import dibs_after from "../Images/dibs_after.png";
import search_icon from "../Images/search_icon.png";

const imgset = [bread_img01, bread_img02, bread_img03];

export default function ProductDetailPage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const [shopAddress, setShopAddress] = useState("서울특별시 강남구 테헤란로 231"); // 매장 상세주소 상태
    const [dibs, setDibs] = useState(false); // 찜하기 상태
    const [quantity, setQuantity] = useState(1); // 구매수량 초기상태
    const [activeMenu, setActiveMenu] = useState("매장 리뷰"); // 현재 활성화상태 메뉴

    const toggleDibs = () => { // 찜상태 토클 메서드
        setDibs(prev => !prev); 
    };

    const increaseQuantity = () => { // 구매수량 증가 메서드
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => { // 구매수량 감소 메서드
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); 
    };

    const handleMenuClick = (menu) => { // 메뉴 활성화 상태 변경 메서드
        setActiveMenu(menu); 
    };

    return (
        <Container>
            <TopContainer>
                <ProductImageBox>
                    <ImageSlider {...settings}>
                        {imgset.map((image, index) => (
                            <Slide key = {index}>
                                <Image src = {image}/>
                            </Slide>
                        ))}
                    </ImageSlider>
                </ProductImageBox>
                <ProductInfoBox>
                    <Header>
                        <ProfileBox>
                            <Profile/>
                            <NickName>제빵왕 김오둥</NickName>
                        </ProfileBox>
                        <RegistrationTime>등록시간 : 2024.12.25-15:30</RegistrationTime>
                    </Header>
                    <ShopContainer>
                        <ShopImage/>
                        <ShopInfoBox>
                            <ShopInfo style = {{fontSize: "20px", margin: "10px 0"}}>&lt;오둥이 빵집&gt;</ShopInfo>
                            <ShopInfo>영업 시간 : 08:30 ~ 19:00</ShopInfo>
                            <ShopInfo>매장 전화번호 : 02-546-7588</ShopInfo>
                            <ShopInfo>매장 위치 : 서울특별시 강남구 역삼동</ShopInfo>
                            <ShopInfo>매장 상세주소 : 서울특별시 강남구 테헤란로 231</ShopInfo>
                        </ShopInfoBox>
                        <ShopButtonBox>
                            <ShopButton style = {{marginTop: "15%"}} onClick = {toggleDibs}>
                                <Dibs dib = {dibs}/>
                                <ButtonText>{dibs ? "매장 찜해제" : "매장 찜하기"}</ButtonText>
                            </ShopButton>
                            <ShopButton style = {{marginBottom: "15%"}}>
                                <SearchIcon/>
                                <ButtonText style = {{fontSize: "10px"}}>매장 전체상품 검색</ButtonText>
                            </ShopButton>
                        </ShopButtonBox>
                    </ShopContainer>
                    <ProductInfoContainer>
                        <LeftBox>
                            <LeftInnerBox>
                                <LabelBox>제품 이름</LabelBox>
                                <DescriptionBox>민트초코맛 마늘바게트</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox>
                                <LabelBox>남은 수량</LabelBox>
                                <DescriptionBox>5개</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox>
                                <LabelBox>개당 가격</LabelBox>
                                <DescriptionBox>3,000원</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox>
                                <LabelBox>제조 일자</LabelBox>
                                <DescriptionBox>금일(2024.12.25) 오전 10시</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox style = {{border: "none"}}>
                                <LabelBox>판매 시간</LabelBox>
                                <DescriptionBox>금일 오후 7시까지</DescriptionBox>
                            </LeftInnerBox>
                        </LeftBox>
                        <RightBox>
                            <SubTitle>제품설명 & 제빵사의 말</SubTitle>
                            <ProductDescription>
                                김오둥 회심의 역작. 민트초코맛 마늘바게트 출시!<br /><br />
                                ※ 이거 괴식 아닙니다. 치약 대신 쓰지마세요.
                            </ProductDescription>
                            <MiniTitle>구매수량 선택</MiniTitle>
                            <SelectPurchaseQuantity>
                                <PMbutton onClick = {decreaseQuantity}>-</PMbutton>
                                <CurrentQuantity>{quantity}</CurrentQuantity>
                                <PMbutton onClick = {increaseQuantity}>+</PMbutton>
                            </SelectPurchaseQuantity>
                        </RightBox>
                    </ProductInfoContainer>
                    <PriceBox>
                        <PriceTitle>최종 구매 금액</PriceTitle>
                        <TotalAmount>12,000원</TotalAmount>
                    </PriceBox>
                    <ButtonContainer>
                        <Button style = {{backgroundColor: "#4285F4", borderRadius: "0 0 0 12px"}}>장바구니 담기</Button>
                        <Button style = {{backgroundColor: "black", borderRadius: "0 0 12px 0"}}>바로 구매예약</Button>
                    </ButtonContainer>
                </ProductInfoBox>
            </TopContainer>
            <BottomContainer>
                <MenuBox>
                    <TogleMenu active = {activeMenu === "매장 리뷰"} 
                               onClick = {() => handleMenuClick("매장 리뷰")}>매장 리뷰
                    </TogleMenu>
                    <TogleMenu active = {activeMenu === "매장 위치(지도)"} 
                               onClick = {() => handleMenuClick("매장 위치(지도)")}>매장 위치(지도)
                    </TogleMenu>
                </MenuBox>
                <ContentBox>
                    {activeMenu === "매장 리뷰" && <ReviewContainer><Review/></ReviewContainer>}
                    {activeMenu === "매장 위치(지도)" && <MapContainer><Map address = {shopAddress}/></MapContainer>}
                </ContentBox>
            </BottomContainer>
            <Void/>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    width: 80%;
    margin: 0 auto;
`;

const TopContainer = styled.div` // 상단 컨테이너
    display: flex;
    width: 100%;
    height: 500px;
    margin-top: 5%;
`;

const ProductImageBox = styled.div` // 상품 이미지 슬라이드 컨테이너
    width: 45%;
    height: 100%;
`;

const ImageSlider = styled(Slider)` // 상품 이미지 슬라이더
    width: 100%;
    height: 100%;

    .slick-list {
        height: 100%; 
    }

    .slick-prev {
        position: absolute;
        top: 35vh;
        left: 10px;
        z-index: 10;

        &:hover {
            color: #2A2A2A; 
        }
    }

    .slick-next {
        position: absolute;
        top: 35vh;
        right: 20px;
        z-index: 10;

        &:hover {
            color: #2A2A2A; 
        }
    }

    .slick-dots {
        bottom: 0px;
    }

    .slick-dots li button:before {
        font-size: 10px;
    }

    .slick-prev:before, .slick-next:before {
        color: black;
        font-size: 30px;
    }
`;

const Slide = styled.div` // 슬라이드 이미지
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img` // 상품 이미지
    width: 100%;
    height: 100%;
    object-fit: cover; 
`;

const ProductInfoBox = styled.div` // 상품 상세정보 컨테이너
    width: 52.5%;
    height: 100%;
    margin-left: 2.5%;
    border: 3px solid black;
    border-radius: 15px;
    box-sizing: border-box;
`; 

const Header = styled.div` // 헤더
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
    border-radius: 12px 12px 0 0;
    background-color: #F1F1F1;
`;

const ProfileBox = styled.div` // 판매자 프로필 박스
    display: flex;
    align-items: center;
    margin-left: 2.5%;
    width: 30%;
    height: 100%;
`;

const Profile = styled.div` // 판매자 프로필
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${profile_img});
    background-size: cover;
`;

const NickName = styled.div` // 판매자 닉네임
    font-size: 12.5px;
    font-weight: bold;
    font-family: maple-font;
`;

const RegistrationTime = styled.div` // 판매상품 등록시간
    font-size: 10px;
    font-weight: bold;
    margin-right: 2.5%;
`;

const ShopContainer = styled.div` // 매장정보 컨테이너
    display: flex;
    width: 100%;
    height: 30%;
    border-bottom: 3px solid black;
    box-sizing: border-box;
`;

const ShopImage = styled.div` // 매장사진
    width: 30%;
    height: 100%;
    background-image: url(${shop_img});
    background-size: cover;
`;

const ShopInfoBox = styled.div` // 매장 정보 박스
    display: flex;
    flex-direction: column;
    width: 47.5%;
    height: 100%;
    margin-left: 2.5%;
`;

const ShopInfo = styled.div` // 매장 상세정보
    font-size: 12px;
    font-weight: bold;
    margin-top: 5px;
`;

const ShopButtonBox = styled.div` // 매장 버튼 박스
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    height: 100%;
`;

const ShopButton = styled.div` // 매장 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 30%;
    border-radius: 10px;
    background-color: #F1F1F1;
    cursor: pointer;

    &:hover {
        background-color: #CDCDCD;
    }
`;

const Dibs = styled.div` // 매장 찜하기 아이콘
    width: 18%;
    height: 45%;
    margin-right: 5px;
    background-image: url(${props => (props.dib ? dibs_after : dibs_before)});
    background-size: cover;
    transition: background-image 0.2s ease;
`;

const SearchIcon = styled.div` // 검색 아이콘
    width: 15%;
    height: 40%;
    margin-right: 5px;
    background-image: url(${search_icon});
    background-size: cover;
`;

const ButtonText = styled.div` // 버튼 텍스트
    font-size: 12.5px;
    font-weight: bold;
`;

const ProductInfoContainer = styled.div` // 상품정보 컨테이너
    display: flex;
    width: 100%;
    height: 40%;
    border-bottom: 3px solid black;
    box-sizing: border-box;
`;

const LeftBox = styled.div` // 좌측 상세정보 박스
    display: flex;
    flex-direction: column;
    border-right: 3px solid black;
    width: 60%;
    height: 100%;
    box-sizing: border-box;
`;

const LeftInnerBox = styled.div` // 좌측 내부 박스
    display: flex;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    width: 100%;
    height: 20%;
`;

const LabelBox = styled.div` // 라벨 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    font-size: 15px;
    font-weight: bold;
    border-right: 1px solid black;
    background-color: #F1F1F1;
`;

const DescriptionBox = styled.div` // 설명 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 100%;
    font-size: 12.5px;
`;

const RightBox = styled.div` // 우측 상세정보 박스
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 100%;
`;

const SubTitle = styled.div` // 우측 내부박스 제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15%;
    font-size: 12.5px;
    font-weight: bold;
    background-color: #F1F1F1;
`;

const ProductDescription = styled.div` // 제품설명 & 제빵사의 말
    width: 100%;
    height: 40%;
    font-size: 10px;
    padding: 5px;
`;

const MiniTitle = styled.div` // 우측 내부박스 소제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background-color: black;
`;

const SelectPurchaseQuantity = styled.div` // 구매수량 선택버튼 박스
    display: flex;
    width: 100%;
    height: 20%;
`;

const PMbutton = styled.div` // +, - 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    width: 25%;
    height: 100%;
    background-color: #F1F1F1;
    cursor: pointer;

    &:hover {
        background-color: #D1D1D1;
    }
`;

const CurrentQuantity = styled.div` // 현재 수량 표시 박스
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    width: 50%;
    height: 100%;
`;

const PriceBox = styled.div` // 상품 가격 박스
    display: flex;
    width: 100%;
    height: 7.5%;
`;

const PriceTitle = styled.div` // 가격 제목 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    color: white;
    background-color: black;
    font-size: 15px;
    font-weight: bold;
`;

const TotalAmount = styled.div` // 최종 구매 금액
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
`;

const ButtonContainer = styled.div` // 버튼 컨테이너
    display: flex;
    width: 100%;
    height: 12.5%;
`;

const Button = styled.div` // 우측 하단 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const BottomContainer = styled.div` // 하단 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 750px;
    margin-top: 2.5%;
    border: 3px solid black;
    box-sizing: border-box;
`;

const Void = styled.div` // 제일 아래 여백
    width: 100%;
    height: 100px;
`;

const MenuBox = styled.div` // 메뉴 박스
    display: flex;
    width: 100%;
    height: 10%;
`;

const TogleMenu = styled.div` // 토글 메뉴
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    background-color: ${props => (props.active ? 'black' : '#F1F1F1')}; 
    color: ${props => (props.active ? 'white' : 'black')}; 
    cursor: pointer;

    &:hover {
        background-color: ${props => (props.active ? '#black' : '#D1D1D1')}; 
    }
`;

const ContentBox = styled.div` // 컨텐츠 박스
    width: 100%;
    height: 90%;
`;

const ReviewContainer = styled.div` // 리뷰 컨테이너
    width: 100%;
    height: 100%;
`;

const MapContainer = styled.div` // 지도 컨테이너
    width: 100%;
    height: 100%;
`;