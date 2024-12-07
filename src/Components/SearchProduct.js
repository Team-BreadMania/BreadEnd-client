import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import axios from 'axios';
import Cookies from 'js-cookie';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const query = new URLSearchParams(location.search).get('query');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slidesToShow, setSlidesToShow] = useState(3);

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

    useEffect(() => {
        const fetchProducts = async () => {
            const accessToken = Cookies.get("accessToken");

            try {
                const response = await axios.get(
                    `https://breadend.shop/search/product?query=${encodeURIComponent(query)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("데이터를 가져오는 데 실패했습니다:", err);
                setError("데이터를 가져오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true,
    };

    // 상품 클릭 이벤트 핸들러
    const handleProductClick = (productId) => {
        navigate(`/ProductDetailPage?id=${productId}`);
    };

    return (
        <Category>
            <CategoryTitle>🥐 빵 🥐</CategoryTitle>
            <Container>
                {loading && <Message>로딩 중...</Message>}
                {error && <Message>{error}</Message>}
                {!loading && !error && products.length === 0 && (
                    <Message>검색된 상품이 없습니다.</Message>
                )}
                {!loading && !error && products.length > 0 && (
                    <ProductSlider {...sliderSettings}>
                        {products.map((product) => (
                            <ProductContainer key={product.productid}>
                                <ImageBox
                                    style={{
                                        backgroundImage: `url(${product.imgpaths && product.imgpaths[0]})`,
                                    }}
                                    onClick={() => handleProductClick(product.productid)} // 이벤트 핸들러 수정
                                />
                                <ProductName>{product.itemname}</ProductName>
                                <ShopName>{product.shopname}</ShopName>
                                <Price>{product.price.toLocaleString()}원</Price>
                            </ProductContainer>
                        ))}
                    </ProductSlider>
                )}
            </Container>
        </Category>
    );
}

// Styled-components CSS 설정
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;

    @media (max-width: 600px) {
        width: 95%; /* 모바일에서 약간의 패딩 */
        padding: 10px;
    }
`;
const Category = styled.div`
    margin-bottom: 40px;
    background-color: #fff;

    @media (max-width: 600px) {
        margin-bottom: 20px;
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
        font-size: 18px;
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

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    padding: 15px;
    text-align: left;


    @media (max-width: 600px) {
        width: 100%; /* 모바일 화면에서 카드 너비를 100%로 설정 */
        padding: 10px; /* 약간의 패딩 추가 */
        margin-bottom: -1000px; /* 카드 간격 추가 */
    }
`;


const ImageBox = styled.div`
    width: 90%;
    height: 250px; /* 기본 이미지 높이 */
    background-size: cover;
    background-position: center;
    border-radius: 10px;

    @media (max-width: 600px) {
        height: 150px; /* 모바일 화면에서 이미지 높이를 줄임 */
    }

    @media (max-width: 400px) {
        width: 100%
        height: 130px; /* 작은 화면에서 높이를 더 줄임 */
    }
`;
const ProductName = styled.h3`
    margin-top: 6px;
    font-size: 1rem;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 0.9rem;
    }
`;

const Price = styled.p`
    font-size: 1rem;
    color: #333;
    font-weight: bold;
    margin-top: 1px;

    @media (max-width: 600px) {
        font-size: 0.7rem;
    }
`;

const Message = styled.p`
    text-align: center;
    color: gray;
    font-size: 1rem;
    margin: 20px 0;
`;
const ShopName = styled.p`
    font-size: 0.9rem;
    color: #666;

    @media (max-width: 600px) {
        font-size: 0.6rem /* 모바일 화면에서 이미지 높이를 줄임 */
    }

    @media (max-width: 400px) {
       font-size: 0.6rem /* 작은 화면에서 높이를 더 줄임 */
    }
`;