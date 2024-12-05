/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function BuyerReview() {
    const [reviews, setReviews] = useState([]);
    const accessToken = Cookies.get('accessToken');

    const fetchReviewData = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/Mypage/review/show`, {
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

    const ReviewEdit = (orderid, itemname) => {
        // 리뷰 수정 페이지 열기
        window.open(`/ReviewEdit?orderid=${orderid}&itemname=${itemname}`, '리뷰수정', 'width=600,height=400,scrollbars=yes');
    };

    useEffect(() => {
        if (accessToken) {
            fetchReviewData(accessToken);
        }
    }, [accessToken]);

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await axios.delete(`https://breadend.shop/Mypage/review/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                console.log(`리뷰 삭제 성공`);
            }
        } catch (error) {
            console.log(`리뷰 삭제 중 오류 발생`, error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                            <DateText>{formatDate(product.registdate)}</DateText>
                            <ButtonContainer>
                                <EditButton onClick={() => ReviewEdit(product.orderid, product.productname)}>수정</EditButton>
                                <DeleteButton onClick={() => handleDeleteReview(product.orderid)}>삭제</DeleteButton>
                            </ButtonContainer>
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
    min-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff9ee;
    border-radius: 8px;
    margin: 10px 3px;
    overflow-x: scroll;
    @media (max-width: 850px) {
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
    }
`;

const ReviewCard = styled.div`
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 8px;
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 2px;
`;

const ProductName = styled.h3`
    color: #333;
    margin: 0;
    font-size: 1.1em;
    padding: 2px;
    margin-right: 8px;
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

const ButtonContainer = styled.div`
    display: flex;
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
    width: 60%;
    padding: 5px 8px;
    &:hover {
        background-color: #1976d2;
    }
    margin: 0 5px;
`;
const DeleteButton = styled.button`
    background-color: #dc2e1c;
    &:hover {
        background-color: #c62919;
    }
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8em;
    transition: background-color 0.3s ease;
    width: 60%;
    padding: 5px 8px;
    margin: 0;
`;
