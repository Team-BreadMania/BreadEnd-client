/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import dibs_before from "../Images/dibs_before.png";
import dibs_after from "../Images/dibs_after.png";
import search_icon from "../Images/search_icon.png";
import Cookies from 'js-cookie';

export default function MobilePD() {

    const location = useLocation(); 
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search); 
    const id = query.get("id"); 
    const [productDetails, setProductDetails] = useState(null); // 상품 상세 정보를 저장할 상태
    const [dibs, setDibs] = useState(false); // 찜하기 상태
    const [quantity, setQuantity] = useState(1); // 구매수량 초기상태

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://breadend.shop/detailpage/details?productid=${id}`);
                console.log("API 응답 데이터 :", response.data);
                setProductDetails(response.data); 
                fetchBookmarks(response.data.shopid);
            } catch (error) {
                alert("상품 상세 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요."); 
                console.error("API 요청 에러 :", error);
            }
        };

        const fetchBookmarks = async (currentShopId) => {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) return; 
    
            try {
                const response = await axios.get('https://breadend.shop/Mypage/bookmarks', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const bookmarks = response.data;
    
                const isBookmarked = bookmarks.some(bookmark => bookmark.shopid === currentShopId);
                setDibs(isBookmarked); 
            } catch (error) {
                console.error("찜 상태를 가져오는데 실패했습니다.", error);
            }
        };
        fetchProductDetails();
    }, [id]); 

    const toggleDibs = async () => { // 찜상태 토글 메서드
        const accessToken = Cookies.get("accessToken");
        
        if (!accessToken) {
            alert("로그인을 한 뒤 이용할 수 있는 기능입니다.");
            navigate("/Login");
            return;
        }
    
        if (productDetails) {
            try {
                const shopId = productDetails.shopid; 
                console.log("현재 shopid :", shopId);
    
                if (dibs) {
                    const response = await axios.delete(`https://breadend.shop/detailpage/delete/Bookmark?shopid=${shopId}`, 
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`, 
                            }
                        }
                    );
                    if (response.status === 200) {
                        alert("찜을 해제하였습니다.");
                    }
                } else {
                    const response = await axios.post(`https://breadend.shop/detailpage/add/Bookmark?shopid=${shopId}`, 
                        {}, 
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`, 
                            },
                        }
                    );
                    if (response.status === 200) {
                        alert("찜하기 성공.");
                    }
                }
    
                setDibs(prev => !prev); 
            } catch (error) {
                alert("요청에 실패했습니다. 다시 시도해 주세요.");
                console.error("API 요청 에러 :", error);
            }
        }
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

    const addToCart = async () => { // 장바구니 상품추가 메서드
        const accessToken = Cookies.get("accessToken");
        
        if (!accessToken) {
            alert("로그인을 한 뒤 이용할 수 있는 기능입니다.");
            navigate("/Login");
            return;
        }
        
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

        if (!accessToken) {
            alert("로그인을 한 뒤 이용할 수 있는 기능입니다.");
            navigate("/Login");
            return;
        }
        
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
                navigate("/MyPage");
            }
        } catch (error) {
            alert("구매 예약에 실패하였습니다. 다시 시도해 주세요.");
            console.error("API 요청 에러:", error);
        }
    };

    const handleShopClick = () => { // 매장 상세 페이지로 이동하는 메서드
        navigate(`/ShopProduct?id=${productDetails.shopid}`);
    };

    if (!productDetails) {
        return <div>로딩 중...</div>;
    }

    return (
        <Container>
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
                    <ShopInfo style = {{fontSize: "15px", fontWeight: "bold", margin: "5px 0"}}>&lt;{productDetails.shop_name}&gt;</ShopInfo>
                    <ShopInfo><Bold>영업 시간 : </Bold>{productDetails.opentime}</ShopInfo>
                    <ShopInfo><Bold>매장 전화번호 : </Bold>{productDetails.shop_number}</ShopInfo>
                    <ShopInfo><Bold>매장 위치 : </Bold>{productDetails.location}</ShopInfo>
                    <ShopInfo><Bold>매장 상세주소 : </Bold>{productDetails.detail_location}</ShopInfo>
                </ShopInfoBox>
            </ShopContainer>
            <ShopButtonBox>
                <ShopButton onClick = {toggleDibs}>
                    <Dibs dib = {dibs}/>
                    <ButtonText>{dibs ? "매장 찜해제" : "매장 찜하기"}</ButtonText>
                </ShopButton>
                <ShopButton onClick = {handleShopClick}>
                    <SearchIcon/>
                    <ButtonText>현재 매장의 전체상품 검색</ButtonText>
                </ShopButton>
            </ShopButtonBox>
            <InfoBox>
                <InnerBox style = {{width: "100%"}}>
                    <LabelBox2>상품 이름</LabelBox2>
                    <DescriptionBox2>{productDetails.product_name}</DescriptionBox2>
                </InnerBox>
            </InfoBox>
            <InfoBox>
                <InnerBox>
                    <LabelBox>제조 일자</LabelBox>
                    <DescriptionBox>{productDetails.make_date}</DescriptionBox>
                </InnerBox>
                <InnerBox>
                    <LabelBox>판매 시간</LabelBox>
                    <DescriptionBox>{productDetails.expired_date}</DescriptionBox>
                </InnerBox>
            </InfoBox>
            <InfoBox>
                <InnerBox>
                    <LabelBox>남은 수량</LabelBox>
                    <DescriptionBox>{productDetails.count}개</DescriptionBox>
                </InnerBox>
                <InnerBox>
                    <LabelBox>개당 가격</LabelBox>
                    <DescriptionBox>{productDetails.price.toLocaleString()}원</DescriptionBox>
                </InnerBox>
            </InfoBox>
            <InfoBox style = {{height: "15%"}}>
                <InnerBox style = {{width: "100%"}}>
                    <LabelBox2>
                        상품설명<br/>&<br/>상세내용
                    </LabelBox2>
                    <DescriptionBox2>
                        {productDetails.info}
                    </DescriptionBox2>
                </InnerBox>
            </InfoBox>
            <UnderBox>
                <BottomBox>
                    <MiniTitle>구매수량 선택</MiniTitle>
                    <SelectPurchaseQuantity>
                        <PMbutton onClick = {decreaseQuantity}>-</PMbutton>
                        <CurrentQuantity>{quantity}</CurrentQuantity>
                        <PMbutton onClick = {increaseQuantity}>+</PMbutton>
                    </SelectPurchaseQuantity>
                    <MiniTitle>최종 구매 금액</MiniTitle>
                    <TotalAmount>{(productDetails.price * quantity).toLocaleString()}원</TotalAmount>
                </BottomBox>
                <BottomBox>
                    <Button style = {{backgroundColor: "#D1A064"}} onClick = {addToCart}>장바구니 담기</Button>
                    <Button style = {{backgroundColor: "#A46E2C"}} onClick = {addToOrder}>바로 구매예약</Button>
                </BottomBox>
            </UnderBox>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Header = styled.div` // 헤더
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
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
    margin-left: 10px;
`;

const RegistrationTime = styled.div` // 판매상품 등록시간
    font-size: 11px;
    font-weight: bold;
    margin-right: 2.5%;
`;

const ShopContainer = styled.div` // 매장정보 컨테이너
    display: flex;
    width: 100%;
    height: 30%;

    @media (max-width: 700px) {
        height: 25%;
    }

    @media (max-width: 600px) {
        height: 20%;
    }
`;

const ShopImage = styled.div` // 매장사진
    width: 30%;
    height: 100%;
    background-image: url(${props => props.img});
    background-size: cover;

    @media (max-width: 700px) {
        width: 25%;
    }

    @media (max-width: 600px) {
        width: 20%;
    }

    @media (max-width: 500px) {
        width: 40%;
    }
`;

const ShopInfoBox = styled.div` // 매장 정보 박스
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 2.5%;
`;

const Bold = styled.span` // 글씨체 굵게
    font-weight: bold;
`;

const ShopInfo = styled.div` // 매장 상세정보
    font-size: 12px;
    margin-top: 5px;

    @media (max-width: 700px) {
        font-size: 11px;
        margin-top: 4px;
    }

    @media (max-width: 600px) {
        font-size: 10px;
        margin-top: 3px;
    }

    @media (max-width: 500px) {
        font-size: 11px;
        margin-top: 4px;
    }
`;

const ShopButtonBox = styled.div` // 매장 버튼 박스
    display: flex;
    width: 100%;
    height: 10%;
`;

const ShopButton = styled.div` // 매장 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background-color: #F0E9DD;
    cursor: pointer;
    box-sizing: border-box;
    border: 1.5px solid #D3B795;

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
`;

const SearchIcon = styled.div` // 검색 아이콘
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-image: url(${search_icon});
    background-size: cover;
`;

const ButtonText = styled.div` // 버튼 텍스트
    font-size: 12.5px;
    font-weight: bold;
    text-align: center;
`;

const InfoBox = styled.div` // 정보 박스
    display: flex;
    border-bottom: 1px solid #D3B795;
    box-sizing: border-box;
    width: 100%;
    height: 5%;
`;

const InnerBox = styled.div` // 내부 박스
    display: flex;
    width: 50%;
    height: 100%;
`;

const LabelBox = styled.div` // 라벨 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    font-size: 15px;
    font-weight: bold;
    box-sizing: border-box;
    border-left: 1px solid #D3B795;
    border-right: 1px solid #D3B795;
    background-color: #F0E9DD;

    @media (max-width: 600px) {
        font-size: 13.5px;
    }

    @media (max-width: 500px) {
        width: 30%;
        font-size: 12px;
    }
`;

const LabelBox2 = styled.div` // 라벨 박스2
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12.5%;
    height: 100%;
    font-size: 15px;
    font-weight: bold;
    box-sizing: border-box;
    border-left: 1px solid #D3B795;
    border-right: 1px solid #D3B795;
    background-color: #F0E9DD;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 13.5px;
    }

    @media (max-width: 500px) {
        width: 15%;
        font-size: 12px;
    }
`;

const DescriptionBox = styled.div` // 설명 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 100%;
    font-size: 12.5px;

    @media (max-width: 500px) {
        width: 70%;
        font-size: 11.5px;
    }
`;

const DescriptionBox2 = styled.div` // 설명 박스2
    display: flex;
    justify-content: center;
    align-items: center;
    width: 87.5%;
    height: 100%;
    font-size: 12.5px;

    @media (max-width: 500px) {
        width: 85%;
        font-size: 11.5px;
    }
`;

const UnderBox = styled.div` // 아래 박스
    width: 100%;
    height: 20%;
    display: flex;
    border-bottom: 1px solid #D3B795;
    box-sizing: border-box;
`;

const BottomBox = styled.div` // 하단 박스
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
`;

const MiniTitle = styled.div` // 소제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25%;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background-color: #D3B795;
`;

const SelectPurchaseQuantity = styled.div` // 구매수량 선택버튼 박스
    display: flex;
    width: 100%;
    height: 25%;
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

const TotalAmount = styled.div` // 최종 구매 금액
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25%;
    font-size: 20px;
    font-weight: bold;
`;

const Button = styled.div` // 우측 하단 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: white;

    &:hover {
        opacity: 0.8;
    }
`;