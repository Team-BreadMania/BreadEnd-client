import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchProduct, { productData } from '../Components/SearchProduct'; // 데이터 가져오기
import SearchShop, { shopData } from '../Components/SearchShop'; // 데이터 가져오기


export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setSlidesToShow(1);
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


    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Container>
            <Title>{query ? `"${query}"에 대한 검색결과입니다.` : "검색결과가 없습니다😓."}</Title>

            <Category>
                <CategoryTitle>빵</CategoryTitle>
                <ProductSlider {...sliderSettings}>
                    {productData.map((item) => (
                        <ProductBox key={item.id}>
                            <SearchProduct data={item} />
                        </ProductBox>
                    ))}
                </ProductSlider>
            </Category>

            <Category>
                <CategoryTitle>빵집</CategoryTitle>
                <ProductSlider {...sliderSettings}>
                    {shopData.map((item) => (
                        <ProductBox key={item.id}>
                            <SearchShop data={item} />
                        </ProductBox>
                    ))}
                </ProductSlider>
            </Category>

            <Empty />
        </Container>
    );
}


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
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
`;

const Category = styled.div`
    margin-bottom: 40px;
    background-color: #fff;
`;

const CategoryTitle = styled.h3`
    font-size: 20px;
    color: #d4b896;
    border-bottom: 2px solid #d4b896;
    background-color: #f5f5dc;
    border-radius: 8px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    padding-left: 10px;
    padding-top: 10px;
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

        @media (max-width: 800px) {
            font-size: 25px; 
        }
    }

    .slick-prev.slick-disabled:before,
    .slick-next.slick-disabled:before {
        color: transparent; 
    }
`;

const ProductBox = styled.div`
    width: 120%;
    padding: 10px;
    box-sizing: border-box;
`;

const Empty = styled.div`
    height: 30vh;
`;
