import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query'); // URL에서 쿼리 추출
    const [shops, setShops] = useState([]); // 매장 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [slidesToShow, setSlidesToShow] = useState(3); // 반응형 슬라이더 설정

    // 주소 변환 메서드
    const getDistrictAndNeighborhood = (location) => {
        const parts = location.split(' '); // 주소를 공백으로 나눔
        const length = parts.length;
        if (length >= 2) {
            return `${parts[length - 2]} ${parts[length - 1]}`; // 구와 동 반환
        }
        return location; // 전체 주소 반환
    };

    // 반응형 슬라이더 화면 크기 감지
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setSlidesToShow(3);
            } else if (width <= 900) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // API 호출
    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`https://breadend.shop/search/shop?query=${encodeURIComponent(query)}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("데이터를 가져오는 데 실패했습니다.");
                    }
                    return response.json();
                })
                .then((data) => {
                    setShops(data); // 매장 데이터를 상태에 저장
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [query]);

    // 슬라이더 설정
    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true,
    };

    // 매장 클릭 이벤트
    const handleShopClick = (shopId) => {
        navigate(`/ShopProduct?id=${shopId}`); // 매장 상세 페이지로 이동
    };

    return (
        <Category>
            <CategoryTitle>🏡 빵집 🏡</CategoryTitle>
            <Container>
                {loading && <Message>로딩 중...</Message>}
                {error && <Message>{error}</Message>}
                {!loading && !error && shops.length === 0 && (
                    <Message>검색된 매장이 없습니다.</Message>
                )}
                {!loading && !error && shops.length > 0 && (
                    <ProductSlider {...sliderSettings}>
                        {shops.map((shop) => (
                            <ShopContainer key={shop.shopid}>
                                <ImageBox
                                    style={{ backgroundImage: `url(${shop.shopIMG})` }}
                                    onClick={() => handleShopClick(shop.shopid)}
                                />
                                <ShopName>{shop.shop_name}</ShopName>
                                <DetailLocation>
                                    {getDistrictAndNeighborhood(shop.location)}
                                </DetailLocation>
                            </ShopContainer>
                        ))}
                    </ProductSlider>
                )}
            </Container>
        </Category>
    );
}
const ShopContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;

      @media (max-width: 600px) {
        width: 100%; /* 모바일 화면에서 카드 너비를 100%로 설정 */
        padding: 10px; /* 약간의 패딩 추가 */
        margin-bottom: 100px; /* 카드 간격 추가 */
    }
`;
const ImageBox = styled.div`
    width: 100%;
    height: 250px; /* 기본 이미지 높이 */
    background-size: cover;
    background-position: center;
    border-radius: 10px;

    @media (max-width: 600px) {
    width: 100%;
        height: 150px; /* 모바일 화면에서 이미지 높이를 줄임 */
    }

`;
const ShopName = styled.h3`
    margin-top: 10px;
    font-size: 1rem;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 0.9rem;
    }
`;
const DetailLocation = styled.p`
    font-size: 1rem;
    color: #666;
     @media (max-width: 600px) {
        font-size: 0.6rem;
        color: #666;
    }
`;

const Message = styled.p`
    text-align: center;
    color: gray;
    font-size: 1rem;
    margin: 20px 0;
`;

// Styled-components CSS 설정
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
        @media (max-width: 600px) {
        width: 95%; /* 모바일 화면에서는 조금 더 줄이기 */
    }
`;


const Category = styled.div`
    margin-bottom: 40px;
    background-color: #fff;
     @media (max-width: 600px) {
        margin-bottom: 20px; /* 모바일 화면에서 간격 줄이기 */
    }
`;

const CategoryTitle = styled.h3`
    font-size: 20px;
    color: #5b4421;
    border-bottom: 2px solid #d4b896;
    background-color: #f5f5dc;
    border-radius: 8px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    padding-left: 10px;
    padding-top: 10px;
    @media (max-width: 600px) {
        font-size: 18px; /* 모바일에서 제목 크기 줄이기 */
        padding: 8px;
        margin-bottom: 15px;
    }
`;

const ProductSlider = styled(Slider)`
    width: 100%;
    height: 100%;

    .slick-list {
        height: 100%; 
    }

    .slick-track {
        height: 100%;
    }

    .slick-slide {
        display: grid; 
    }

    .slick-prev {
        position: absolute;
        top: 14vh;
        left: 10px;
        z-index: 10;

        &:hover {
             color: #d4b896;; 
        }

        @media (max-width: 1000px) {
            top: 12vh; 
        }

        @media (max-width: 800px) {
            top: 11vh; 
        }

        @media (max-width: 600px) {
            top: 10vh; 
        }

        @media (max-width: 500px) {
            top: 8.5vh; 
        }
    }

    .slick-next {
        position: absolute;
        top: 14vh;
        right: 20px;
        z-index: 10;

        &:hover {
            color: #1E6BB8; 
        }

        @media (max-width: 1000px) {
            top: 12vh; 
        }

        @media (max-width: 800px) {
            top: 11vh; 
        }

        @media (max-width: 600px) {
            top: 10vh; 
        }

        @media (max-width: 500px) {
            top: 8.5vh; 
        }
    }

    .slick-prev:before, .slick-next:before {
         color: #d4b896;;
        font-size: 30px;

        @media (max-width: 600px) {
            font-size: 25px; 
        }
    }

    .slick-prev.slick-disabled:before,
    .slick-next.slick-disabled:before {
        color: transparent; 
    }
`;
