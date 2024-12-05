/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import bread_img from '../Images/bread_img.png';
import choc_img from '../Images/chocosora.jpg';
import axios from 'axios';
import Cookies from 'js-cookie';
import butterroll from '../Images/butterroll.jfif';
import reviewIcon from '../Images/reviewIcon.png';

export default function Item() {
    const [quantity, setQuantity] = useState(null);
    const [priceUnit, setPriceUnit] = useState(null);
    const totalPrice = quantity ? Number(quantity) * priceUnit : 0;
    const [buyedItems, setBuyedItems] = useState([]);
    const [reviews, setReviews] = useState({}); // 리뷰 상태 추가
    const [isMobile, setIsMobile] = useState(false);

    // 모바일 뷰, 태블릿 뷰 식별
    const resizeHandler = () => {
        setIsMobile(window.innerWidth < 1024);
    };
    // 뷰포트 확인 후 조절
    useEffect(() => {
        resizeHandler(); // 초기 로드 시 크기 확인
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const accessToken = Cookies.get('accessToken');
    //구매한 제품 정보 가져오기
    const fetchBuyedItem = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/Mypage/histories`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('구매내역 불러오기 성공', response.data);
            setBuyedItems(response.data);
        } catch (error) {
            console.error('API 요청에러', error);
        }
    };

    const fetchReviewData = async () => {
        try {
            const response = await axios.get('https://breadend.shop/Mypage/review/show', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // 리뷰를 상품별로 매핑
            const reviewMap = {};
            response.data.forEach((review) => {
                reviewMap[review.productname] = review;
            });
            setReviews(reviewMap);
            console.log('리뷰 불러오기 성공', response.data);
        } catch (error) {
            console.error('리뷰 불러오기 실패', error);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchBuyedItem();
            fetchReviewData();
        }
    }, [accessToken]);

    const ReviewWrite = (orderid, itemname) => {
        // Open the popup
        window.open(`/ReviewWrite?orderid=${orderid}&itemname=${itemname}`, '리뷰작성', 'width=600,height=400,scrollbars=yes');
    };
    const ReviewEdit = (orderid, itemname) => {
        // 리뷰 수정 페이지 열기
        window.open(`/ReviewEdit?orderid=${orderid}&itemname=${itemname}`, '리뷰수정', 'width=600,height=400,scrollbars=yes');
    };

    const PCView = () => {
        return (
            <Container>
                <TitleContainer>구매내역</TitleContainer>
                {buyedItems.map((product) => (
                    <ProductContainer>
                        <ProductTitleContainer>
                            <div>상품 이미지</div>
                            <div>상품 정보</div>
                            <div>상품 가격</div>
                            <div>리뷰쓰기</div>
                        </ProductTitleContainer>
                        <ProductInfoContainer>
                            <ReservImage src={product.imgpaths[0]}></ReservImage>
                            <NameCostContainer>
                                <Name>{product.itemname}</Name>
                                <Info>{product.info}</Info>
                            </NameCostContainer>
                            <Cost>{product.price}</Cost>
                            {reviews[product.itemname] ? (
                                <Review onClick={() => ReviewEdit(product.orderid, product.itemname)}>리뷰 수정하기</Review>
                            ) : (
                                <Review onClick={() => ReviewWrite(product.orderid, product.itemname)}>리뷰 작성하러 가기</Review>
                            )}{' '}
                        </ProductInfoContainer>
                    </ProductContainer>
                ))}
            </Container>
        );
    };
    const MobileView = () => {
        return (
            <Container>
                <TitleContainer>구매내역</TitleContainer>
                {buyedItems.map((product) => (
                    <ProductContainer>
                        <ProductTitleContainer>
                            <div>상품 이미지</div>
                            <div>상품 정보</div>
                            <div>상품 가격</div>
                        </ProductTitleContainer>
                        <ProductInfoContainer>
                            <ReservImage src={butterroll}></ReservImage>
                            <NameCostContainer>
                                <Name>{product.itemname}</Name>
                                <Info>{product.info}</Info>
                            </NameCostContainer>
                            <Cost>{product.price}</Cost>
                            {reviews[product.itemname] ? (
                                <ReviewButton onClick={() => ReviewWrite(product.orderid, product.itemname)} />
                            ) : (
                                <ReviewButton onClick={() => ReviewWrite(product.orderid, product.itemname)} />
                            )}{' '}
                        </ProductInfoContainer>
                    </ProductContainer>
                ))}
            </Container>
        );
    };

    return <div style={{ width: '100%' }}>{isMobile ? <MobileView /> : <PCView />}</div>;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (max-width: 800px) {
        padding: 1%;
    }
    box-sizing: border-box;
`;

const TitleContainer = styled.div`
    font-size: 22px;
    font-weight: bold;
    border-bottom: 1px solid black;
    padding: 10px 5px;
    width: 100%;
    @media (max-width: 800px) {
        width: 95%;
    }
`;
const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px 0px;
    margin: 0 auto;
`;
const ProductTitleContainer = styled.div`
    display: grid;
    grid-template-columns: 150px 1.5fr 1fr;
    border: 1px solid #e0e0e0;
    border-bottom: none;
    & > div {
        border-right: 1px solid #e0e0e0;
        padding: 10px;
        text-align: center;

        &:last-child {
            border-right: none;
        }
    }

    @media (min-width: 1024px) {
        grid-template-columns: 150px 1.5fr 1fr 1fr;
    }
    @media (max-width: 600px) {
        grid-template-columns: 120px 1.5fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 100px 1.5fr 1fr;
    }
`;

const ProductInfoContainer = styled.div`
    display: grid;
    grid-template-columns: 150px 1.5fr 1fr;
    position: relative;
    border: 1px solid #e0e0e0;
    /* padding: 10px 0; */
    @media (min-width: 1024px) {
        grid-template-columns: 150px 1.5fr 1fr 1fr;
    }
    @media (max-width: 600px) {
        grid-template-columns: 120px 1.5fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 100px 1.5fr 1fr;
    }
`;
const ReservImage = styled.div`
    width: 80px;
    height: 80px;
    max-width: 100px;
    max-height: 100px;
    background-image: url(${(props) => props.src});

    background-size: cover;
    background-position: center;
    text-align: center;
    margin: 8px auto;
    @media (max-width: 768px) {
        width: 30vw;
        height: 30vw;
    }

    @media (max-width: 480px) {
        width: 80px;
        height: 80px;
    }
    border-radius: 50%;
`;
const NameCostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 1% 0;
    margin: auto auto;
`;
const Name = styled.div`
    margin-bottom: 5px;
    margin: 3px auto;
`;
const Info = styled.div`
    margin-bottom: 5px;
    color: gray;
`;
const Cost = styled.div`
    padding: 1% 0;
    margin: auto auto;
`;
const Review = styled.button`
    cursor: pointer;
    background-color: #d4b896;
    border-radius: 20px;
    padding: 10px;
    width: 160px;
    height: 40px;
    align-items: center;
    &:hover {
        background-color: #bea587;
    }
    margin: auto auto;
`;
const ReviewButton = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: url(${reviewIcon});
    width: 20px;
    height: 20px;
    background-size: contain;
    cursor: pointer; // Optional: adds pointer cursor on hover
`;
