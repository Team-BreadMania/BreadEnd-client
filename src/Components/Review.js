import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Review({ productId }) {
    const [reviews, setReviews] = useState([]); // 리뷰
    const [averageRating, setAverageRating] = useState(0); // 평균 별점
    const [ratingDistribution, setRatingDistribution] = useState([0, 0, 0, 0, 0]); // 별점 분포도
    const [currentPage, setCurrentPage] = useState(0); // 현재 리뷰 페이지
    const reviewsPerPage = 3; // 한 페이지당 리뷰 개수
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // 모바일 뷰

    const displayedReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://breadend.shop/detailpage/review?productid=${productId}`);
                const fetchedReviews = response.data;
                
                setReviews(fetchedReviews);

                const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
                setAverageRating((totalRating / fetchedReviews.length).toFixed(1));

                const distribution = new Array(5).fill(0);
                fetchedReviews.forEach((review) => {
                    distribution[review.rating - 1] += 1;
                });
                setRatingDistribution([distribution[4], distribution[3], distribution[2], distribution[1], distribution[0]]);
            } catch (error) {
                console.error("리뷰 데이터를 가져오는데 실패했습니다.", error);
            }
        };

        fetchReviews();
    }, [productId]); 

    const maxRatingCount = Math.max(...ratingDistribution);

    const chartData = {
        labels: ['5점', '4점', '3점', '2점', '1점'],
        datasets: [
            {
                label: '비율',
                data: ratingDistribution.map((count) => {
                    if (count === 0) return 0;
                    return (count / maxRatingCount) * 100;
                }),
                backgroundColor: 'gold',
                borderRadius: 20,
                barPercentage: 0.5,
                categoryPercentage: 1.0,
            },
            {
                label: '비율',
                data: ratingDistribution.map((count) => {
                    if (count === 0) return 100;
                    return 100 - (count / maxRatingCount) * 100;
                }),
                backgroundColor: '#E0E0E0',
                borderRadius: 20,
                barPercentage: 0.5,
                categoryPercentage: 1.0,
            },
        ],
    };

    const handleNext = () => { // 리뷰페이지 다음버튼 메서드
        if ((currentPage + 1) * reviewsPerPage < reviews.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => { // 리뷰페이지 이전버튼 메서드
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Container>
            {reviews.length === 0 ? (<NoReview>아직 작성된 리뷰가 없습니다.</NoReview>) : (
            <>
                <Title>
                    작성된 리뷰 <ReviewCount>{reviews.length}</ReviewCount>
                </Title>
                <TotalRating>
                    <LeftBox>
                        <AverageRating>{averageRating}</AverageRating>
                        <StarRatings
                            rating={parseFloat(averageRating)}
                            starRatedColor="gold"
                            starEmptyColor="lightgray"
                            numberOfStars={5}
                            name="rating"
                            starDimension={isMobile ? "20px" : "25px"}
                            starSpacing="0px"
                            readonly
                        />
                    </LeftBox>
                    <RightBox>
                        <Bar
                            data={chartData}
                            options={{
                                indexAxis: 'y',
                                scales: {
                                    x: {
                                        stacked: true,
                                        beginAtZero: true,
                                        grid: {
                                            display: false,
                                        },
                                        border: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        stacked: true,
                                        grid: {
                                            display: false,
                                        },
                                        border: {
                                            display: false,
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {
                                                return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(1) + '%';
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                        <ScoreContainer>
                            {ratingDistribution.map((count, index) => (
                                <ScoreLabel key={index}>{count}</ScoreLabel>
                            ))}
                        </ScoreContainer>
                    </RightBox>
                </TotalRating>

                {displayedReviews.map((review) => (
                    <ReviewBox key={review.id}>
                        <TopBox>
                            <ProfileBox img={review.userprofile} />
                            <ProfileInfoBox>
                                <NickNameBox>{review.buyerNickname || "익명"}</NickNameBox>
                                <ScoreBox>
                                    <StarBox>
                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="gold"
                                            starEmptyColor="lightgray"
                                            numberOfStars={5}
                                            name="reviewRating"
                                            starDimension="15px"
                                            starSpacing="0px"
                                            readonly
                                        />
                                    </StarBox>
                                    <RecordDateBox>{new Date(review.registdate).toLocaleDateString()}</RecordDateBox>
                                </ScoreBox>
                            </ProfileInfoBox>
                        </TopBox>
                        <MiddleBox>
                            <SubTitle>구매상품</SubTitle>
                            <PurchasedProduct>{review.productname}</PurchasedProduct>
                        </MiddleBox>
                        <BottomBox>
                            {review.reviewtext}
                        </BottomBox>
                    </ReviewBox>
                ))}

                <ButtonBox>
                    <Button onClick={handlePrevious} disabled={currentPage === 0}>
                        ◀
                    </Button>
                    <ReviewPageNumber>{currentPage + 1}</ReviewPageNumber>
                    <Button onClick={handleNext} disabled={(currentPage + 1) * reviewsPerPage >= reviews.length}>
                        ▶
                    </Button>
                </ButtonBox>
            </>
        )}
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

const Title = styled.div` // 제목
    font-size: 17.5px;
    font-weight: bold;
    margin: 2.5% 0 0 2.5%;
`;

const ReviewCount = styled.span` // 작성된 리뷰 수
    font-size: 20px;
    color: #4285f4;
`;

const TotalRating = styled.div` // 전체 별점 박스
    display: flex;
    align-items: center;
    width: 95%;
    height: 25%;
    margin: 2.5% 0 0% 2.5%;
    background-color: #f1f1f1;
    border-radius: 10px;
`;

const LeftBox = styled.div` // 좌측 전체 평균 별점 박스
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 80%;
    border-right: 3px solid #c1c1c1;

    @media (max-width: 700px) {
        width: 45%;
        border-right: 1px solid #c1c1c1;
    }

    @media (max-width: 600px) {
        width: 40%;
    }
`;

const AverageRating = styled.div` // 평균 평점 표시
    font-size: 50px;
    font-weight: bold;

    @media (max-width: 700px) {
        font-size: 45px;
    }

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const RightBox = styled.div` // 우측 전체 별점 점수 분포 그래프
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 80%;

    @media (max-width: 700px) {
        margin-left: 2.5%;
    }

    @media (max-width: 600px) {
        width: 55%;
    }
`;

const ScoreContainer = styled.div` // 별점 점수 박스
    display: flex;
    flex-direction: column;
    margin-left: 5px;
`;

const ScoreLabel = styled.div` // 각 별점 점수 갯수
    font-size: 15px;
    color: #828282;
    margin-bottom: 3px;

    @media (max-width: 500px) {
        font-size: 11px;
    }

    @media (max-width: 400px) {
        font-size: 10px;
    }
`;

const ReviewBox = styled.div` // 리뷰 박스
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 15%;
    margin: 20px 0 0 2.5%;

    @media (max-width: 500px) {
        height: 17%;
    }
`;

const TopBox = styled.div` // 리뷰박스 내부 상단박스
    display: flex;
    width: 100%;
    height: 40%;
`;

const ProfileBox = styled.div` // 프로필 사진 박스
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${props => props.img});
    background-size: cover;
`;

const ProfileInfoBox = styled.div` // 프로필 정보 박스
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    margin-left: 10px;
`;

const NickNameBox = styled.div` // 닉네임 박스
    display: flex;
    height: 50%;
    font-size: 15px;
    font-weight: bold;
`;

const ScoreBox = styled.div` // 평가 정보 박스
    display: flex;
    width: 100%;
    height: 50%;
`;

const StarBox = styled.div` // 리뷰 별점
    display: flex;
    align-items: center;
    height: 100%;
`;

const RecordDateBox = styled.div` // 리뷰 등록일자
    display: flex;
    align-items: center;
    height: 100%;
    color: #c1c1c1;
    font-size: 12.5px;
    margin-left: 10px;
`;

const MiddleBox = styled.div` // 리뷰박스 내부 중간박스
    display: flex;
    width: 100%;
    height: 25%;
    margin-top: 5px;
`;

const SubTitle = styled.div` // 부제목
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    border-radius: 20px;
    background-color: #777777;
    color: white;
    font-size: 10px;
`;

const PurchasedProduct = styled.div` // 구매상품
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 12.5px;
    font-weight: bold;
    margin-left: 5px;
`;

const BottomBox = styled.div` // 리뷰내용 박스
    display: flex;
    align-items: center;
    width: 100%;
    flex: 1;
    font-size: 12px;
`;

const ButtonBox = styled.div` // 최하단 버튼 박스
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5%;
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

const ReviewPageNumber = styled.div` // 리뷰페이지 숫자
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 70%;
    font-size: 20px;
`;

const NoReview = styled.div` // 리뷰가 없을때 보여지는 컴포넌트 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
    font-weight: bold;
    font-family: maple-font;
    background-color: #F1F1F1;
`;