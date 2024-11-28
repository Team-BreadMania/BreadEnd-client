import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review from "../Components/Review";
import Map from "../Components/ShopLocation";
import MobilePD from "../Components/MobilePD";
import dibs_before from "../Images/dibs_before.png";
import dibs_after from "../Images/dibs_after.png";
import search_icon from "../Images/search_icon.png";
import Cookies from 'js-cookie';

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

    const location = useLocation(); 
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search); 
    const id = query.get("id"); 
    const [productDetails, setProductDetails] = useState(null); // 상품 상세 정보를 저장할 상태
    const [dibs, setDibs] = useState(false); // 찜하기 상태
    const [quantity, setQuantity] = useState(1); // 구매수량 초기상태
    const [activeMenu, setActiveMenu] = useState("매장 리뷰"); // 현재 활성화상태 메뉴
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000); // 모바일 뷰 상태

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://breadend.shop/detailpage/details?productid=${id}`);
                console.log("API 응답 데이터 :", response.data);
                setProductDetails(response.data); 
            } catch (error) {
                alert("상품 상세 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요."); 
                console.error("API 요청 에러 :", error);
            }
        };

        fetchProductDetails();
    }, [id]); 

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDibs = () => { // 찜상태 토클 메서드
        setDibs(prev => !prev); 
    };

    const increaseQuantity = () => { // 구매수량 증가 메서드
        if (quantity < productDetails.count) { 
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            alert("현재 남은수량보다 더 구매할순 없습니다."); 
        }
    };

    const decreaseQuantity = () => { // 구매수량 감소 메서드
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); 
    };

    const handleMenuClick = (menu) => { // 메뉴 활성화 상태 변경 메서드
        setActiveMenu(menu); 
    };

    const addToCart = async () => { // 장바구니 상품추가 메서드
        const accessToken = Cookies.get("accessToken"); 
        
        try {
            const response = await axios.post('https://breadend.shop/detailpage/add/cart',
                {
                    productid: id, 
                    count: quantity 
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("장바구니에 상품이 추가되었습니다.");
            }
        } catch (error) {
            alert("장바구니 상품추가에 실패하였습니다. 다시 시도해 주세요.");
            console.error("API 요청 에러:", error);
        }
    };

    const addToOrder = async () => { // 상품 바로구매 메서드
        const accessToken = Cookies.get("accessToken");  
        
        try {
            const response = await axios.post('https://breadend.shop/detailpage/add/order',
                {
                    productid: id, 
                    count: quantity 
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, 
                    },
                }
            );

            if (response.status === 200) {
                alert("구매 예약이 완료되었습니다.");
                navigate("/Home");
            }
        } catch (error) {
            alert("구매 예약에 실패하였습니다. 다시 시도해 주세요.");
            console.error("API 요청 에러:", error);
        }
    };

    if (!productDetails) {
        return <div>로딩 중...</div>;
    }

    return (
        <Container>
            <TopContainer>
                <ProductImageBox>
                    <ImageSlider {...settings}>
                        {productDetails.product_imgpath.map((image, index) => (
                            <Slide key = {index}>
                                <Image src = {image}/>
                            </Slide>
                        ))}
                    </ImageSlider>
                </ProductImageBox>
                {isMobile ? <MobileBox><MobilePD /></MobileBox> :
                <ProductInfoBox>
                    <Header>
                        <ProfileBox>
                            <Profile img = {productDetails.user_profile}/>
                            <NickName>{productDetails.seller_name}</NickName>
                        </ProfileBox>
                        <RegistrationTime>등록시간 : {new Date(productDetails.itemregistdate).toLocaleString()}</RegistrationTime>
                    </Header>
                    <ShopContainer>
                        <ShopImage img = {productDetails.shop_thumbnail}/>
                        <ShopInfoBox>
                            <ShopInfo style = {{fontSize: "20px", margin: "10px 0"}}>&lt;{productDetails.shop_name}&gt;</ShopInfo>
                            <ShopInfo>영업 시간 : {productDetails.opentime}</ShopInfo>
                            <ShopInfo>매장 전화번호 : {productDetails.shop_number}</ShopInfo>
                            <ShopInfo>매장 위치 : {productDetails.location}</ShopInfo>
                            <ShopInfo>매장 상세주소 : {productDetails.detail_location}</ShopInfo>
                        </ShopInfoBox>
                        <ShopButtonBox>
                            <ShopButton style = {{marginTop: "15%"}} onClick = {toggleDibs}>
                                <Dibs dib = {dibs}/>
                                <ButtonText>{dibs ? "매장 찜해제" : "매장 찜하기"}</ButtonText>
                            </ShopButton>
                            <ShopButton style = {{marginBottom: "15%"}}>
                                <SearchIcon/>
                                <ButtonText style = {{fontSize: "10px"}}>현재 매장의<br/> 전체상품 검색</ButtonText>
                            </ShopButton>
                        </ShopButtonBox>
                    </ShopContainer>
                    <ProductInfoContainer>
                        <LeftBox>
                            <LeftInnerBox>
                                <LabelBox>상품 이름</LabelBox>
                                <DescriptionBox>{productDetails.product_name}</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox>
                                <LabelBox>남은 수량</LabelBox>
                                <DescriptionBox>{productDetails.count}개</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox>
                                <LabelBox>개당 가격</LabelBox>
                                <DescriptionBox>{productDetails.price.toLocaleString()}원</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox>
                                <LabelBox>제조 일자</LabelBox>
                                <DescriptionBox>{productDetails.make_date}</DescriptionBox>
                            </LeftInnerBox>
                            <LeftInnerBox style = {{border: "none"}}>
                                <LabelBox>판매 시간</LabelBox>
                                <DescriptionBox>{productDetails.expired_date}</DescriptionBox>
                            </LeftInnerBox>
                        </LeftBox>
                        <RightBox>
                            <SubTitle>상품설명 & 상세내용</SubTitle>
                            <ProductDescription>
                                {productDetails.info}
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
                        <TotalAmount>{(productDetails.price * quantity).toLocaleString()}원</TotalAmount>
                    </PriceBox>
                    <ButtonContainer>
                        <Button style = {{backgroundColor: "#F0E9DD", borderRadius: "0 0 0 12px"}} onClick = {addToCart}>장바구니 담기</Button>
                        <Button style = {{backgroundColor: "#D3B795", borderRadius: "0 0 12px 0"}} onClick = {addToOrder}>바로 구매예약</Button>
                    </ButtonContainer>
                </ProductInfoBox>
                }
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
                    {activeMenu === "매장 리뷰" && <ReviewContainer><Review productId = {id}/></ReviewContainer>}
                    {activeMenu === "매장 위치(지도)" && <MapContainer><Map address = {productDetails.detail_location}/></MapContainer>}
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

    @media (max-width: 1300px) {
        width: 90%;
    }

    @media (max-width: 1200px) {
        width: 95%;
    }

    @media (max-width: 1000px) { // 여기서부터 모바일 뷰
        width: 100%;
    }
`;

const TopContainer = styled.div` // 상단 컨테이너
    display: flex;
    width: 100%;
    height: 500px;
    margin-top: 5%;

    @media (max-width: 1000px) {
        flex-direction: column;
        height: 1000px;
        margin-top: 0%;
    }
`;

const ProductImageBox = styled.div` // 상품 이미지 슬라이드 컨테이너
    width: 45%;
    height: 100%;
    margin: 0 auto;

    @media (max-width: 1000px) {
        width: 50%;
        height: 50%;
    }

    @media (max-width: 900px) {
        width: 60%;
    }

    @media (max-width: 800px) {
        width: 70%;
    }

    @media (max-width: 700px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 90%;
    }

    @media (max-width: 500px) {
        width: 100%;
        height: 35%;
    }
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

        @media (max-width: 450px) {
            top: 17.5vh;
        }

        @media (max-width: 400px) {
            top: 25vh;
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

        @media (max-width: 450px) {
            top: 17.5vh;
        }

         @media (max-width: 400px) {
            top: 25vh;
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
    border: 3px solid #D3B795;
    border-radius: 15px;
    box-sizing: border-box;
`; 

const MobileBox = styled.div` // 모바일뷰 컨테이너
    width: 100%;
    height: 50%;

    @media (max-width: 500px) {
        height: 65%;
    }
`;

const Header = styled.div` // 헤더
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
    border-radius: 12px 12px 0 0;
    background-color: #D3B795;
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
    background-image: url(${props => props.img});
    background-size: cover;
`;

const NickName = styled.div` // 판매자 닉네임
    font-size: 12.5px;
    font-weight: bold;
    font-family: maple-font;
    margin-left: 5px;
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
    border-bottom: 3px solid #D3B795;
    box-sizing: border-box;
`;

const ShopImage = styled.div` // 매장사진
    width: 30%;
    height: 100%;
    background-image: url(${props => props.img});
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

    @media (max-width: 1100px) {
        font-size: 11px;
    }

    @media (min-width: 1000px) and (max-width: 1050px) {
        font-size: 10px;
    }
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
    background-color: #F0E9DD;
    cursor: pointer;

    &:hover {
        background-color: #D3B795;
        color: white;
    }
`;

const Dibs = styled.div` // 매장 찜하기 아이콘
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-image: url(${props => (props.dib ? dibs_after : dibs_before)});
    background-size: cover;
    transition: background-image 0.2s ease;

    @media (min-width: 1000px) and (max-width: 1050px) {
        width: 15px;
        height: 15px;
    }
`;

const SearchIcon = styled.div` // 검색 아이콘
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-image: url(${search_icon});
    background-size: cover;

    @media (min-width: 1000px) and (max-width: 1050px) {
        width: 15px;
        height: 15px;
    }
`;

const ButtonText = styled.div` // 버튼 텍스트
    font-size: 12.5px;
    font-weight: bold;
    text-align: center;
`;

const ProductInfoContainer = styled.div` // 상품정보 컨테이너
    display: flex;
    width: 100%;
    height: 40%;
    border-bottom: 3px solid #D3B795;
    box-sizing: border-box;
`;

const LeftBox = styled.div` // 좌측 상세정보 박스
    display: flex;
    flex-direction: column;
    border-right: 3px solid #D3B795;
    width: 60%;
    height: 100%;
    box-sizing: border-box;
`;

const LeftInnerBox = styled.div` // 좌측 내부 박스
    display: flex;
    border-bottom: 1px solid #D3B795;
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
    border-right: 1px solid #D3B795;
    background-color: #F0E9DD;
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
    background-color: #F0E9DD;
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
    background-color: #D3B795;
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
    background-color: #F0E9DD;
    cursor: pointer;

    &:hover {
        background-color: #DCC5AA;
        color: white;
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
    background-color: #D3B795;
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
    border: 3px solid #D3B795;
    box-sizing: border-box;

    @media (max-width: 500px) {
        margin-top: 0%;
    }
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
    background-color: ${props => (props.active ? '#D3B795' : '#F0E9DD')}; 
    color: ${props => (props.active ? 'white' : 'black')}; 
    cursor: pointer;
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