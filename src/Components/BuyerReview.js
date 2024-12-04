import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function BuyerReview() {
    const [reviews, setReviews] = useState([]);
    const accessToken = Cookies.get('accessToken');

    const fetchReviewData = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/detailpage/review?productid=18`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('리뷰 불러오기 성공', response.data);
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰 불러오기 실패');
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchReviewData(accessToken);
        }
    }, [accessToken]);

    const handleEditReview = (reviewId) => {
        // 리뷰 수정 로직 추가 (예: 모달 열기, 수정 페이지로 이동 등)
        console.log(`리뷰 수정: ${reviewId}`);
    };

    return (
        <Container>
            <TitleContainer>리뷰 관리</TitleContainer>
            <ReviewContainer>
                {reviews.map((product, index) => (
                    <ReviewCard key={index}>
                        <ReviewHeader>
                            <ProductName>{product.productname}</ProductName>
                            <RatingBadge>★ {product.rating}</RatingBadge>
                        </ReviewHeader>
                        <ReviewText>{product.reviewtext}</ReviewText>
                        <ReviewFooter>
                            <DateText>{product.registdate}</DateText>
                            <EditButton onClick={() => handleEditReview(product.reviewId)}>수정</EditButton>
                        </ReviewFooter>
                    </ReviewCard>
                ))}
            </ReviewContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
const ReviewContainer = styled.div`
    display: flex;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

const ReviewCard = styled.div`
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ProductName = styled.h3`
    color: #333;
    margin: 0;
    font-size: 1.1em;
`;

const RatingBadge = styled.span`
    background-color: #4caf50;
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.9em;
`;

const ReviewText = styled.p`
    color: #666;
    line-height: 1.5;
`;

const ReviewFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const DateText = styled.small`
    color: #999;
`;

const EditButton = styled.button`
    background-color: #2196f3;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8em;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1976d2;
    }
`;
