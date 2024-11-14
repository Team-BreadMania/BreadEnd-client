import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Product from "../Components/Product";
import Shop from "../Components/Shop";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query'); // 쿼리 파라미터에서 검색어 가져오기

    useEffect(() => {
        console.log("Query:", query); // 검색어 출력
    }, [query]);

    // 임시 데이터
    const dummyData = {
    빵: Array.from({ length: 10 }).map((_, index) => (
        <ProductBox key={index}>
            <Product />
        </ProductBox>
    )),
        빵집: Array.from({ length: 10 }).map((_, index) => (
        <ProductBox key={index}>
            <Shop />
        </ProductBox>
    )),
        지역: Array.from({ length: 10 }).map((_, index) => (
        <ProductBox key={index}>
            <Shop />
        </ProductBox>
    )),
    };

    const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Ensure only one item is shown at a time to maximize space
    
    
    autoplay: false,
        
        
    };

    return (
        <Container>
            <Title>{query ? `"${query}"에 대한 검색결과입니다.` : "검색결과 페이지입니다."}</Title>
            {query && Object.keys(dummyData).map((category, idx) => (
                <Category key={idx}>
                    <CategoryTitle>{category}</CategoryTitle>
                    <SliderContainer>
                        <ProductSlider {...settings}>
                            {dummyData[category].map((image, index) => (
                                <ProductBox key={index}>
                                    {image}
                                </ProductBox>
                            ))}
                        </ProductSlider>
                    </SliderContainer>
                </Category>
            ))}
        </Container>
    );
}

export default SearchResults;

// Styled-components CSS 설정
const Container = styled.div`
    width: 90%;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
`;

const Category = styled.div`
    margin-bottom: 60px;
`;

const CategoryTitle = styled.h3`
    font-size: 20px;
    color: #d4b896;
    border-bottom: 2px solid #d4b896;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const SliderContainer = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const ProductSlider = styled(Slider)`
    width: 90%;
    height: 100%;

    .slick-list {
        height: 100%;
    }

    .slick-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .slick-prev {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        z-index: 10;

        &:hover {
            color: #1E6BB8; 
        }
    }

    .slick-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        z-index: 10;

        &:hover {
            color: #1E6BB8;
        }
    }

    .slick-prev:before, .slick-next:before {
        color: #2590F1;
        font-size: 30px;
    }
`;

const ProductBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px; width: 90%;
    box-sizing: border-box;
`;

const Image = styled.img`
    width: 90%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
`;
