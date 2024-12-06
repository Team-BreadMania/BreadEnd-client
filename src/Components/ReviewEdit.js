import React, { useLayoutEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ReviewPopup() {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const navigate = useNavigate();
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderid');
    const itemName = searchParams.get('itemname');

    const handleSubmitReview = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            await axios.put(
                'https://breadend.shop/Mypage/review/modify',
                {
                    orderid: orderId,
                    rating: rating,
                    reviewtext: reviewText,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert('리뷰가 성공적으로 수정되었습니다.');
            window.close(); // 팝업을 닫습니다.
        } catch (error) {
            console.error('리뷰 수정 중 오류 발생:', error);
            alert('리뷰 수정에 실패했습니다.');
        }
    };

    return (
        <ReviewContainer>
            <ItemTitle>{itemName} 리뷰 수정</ItemTitle>
            <StarRatingContainer>
                <StarRatings rating={rating} starRatedColor="gold" changeRating={handleRatingChange} numberOfStars={5} name="rating" starDimension="40px" starSpacing="5px" />
            </StarRatingContainer>
            <RatingText>현재 선택된 별점: {rating}점</RatingText>
            <ReviewTextarea placeholder="리뷰를 작성해주세요 (최대 500자)" value={reviewText} onChange={(e) => setReviewText(e.target.value)} maxLength={500} />
            <SubmitButton onClick={handleSubmitReview}>리뷰 수정하기</SubmitButton>
        </ReviewContainer>
    );
}

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

const ItemTitle = styled.h2`
    margin-bottom: 20px;
`;

const StarRatingContainer = styled.div`
    margin-bottom: 10px;
`;

const RatingText = styled.div`
    margin-bottom: 20px;
    color: gray;
`;

const ReviewTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
`;

const SubmitButton = styled.button`
    background-color: #d4b896;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #bea587;
    }
`;
