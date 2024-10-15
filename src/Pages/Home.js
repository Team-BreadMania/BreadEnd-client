import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImg_01 from "../Images/banner_img_01.jpg";
import bannerImg_02 from "../Images/banner_img_02.jpg";
import bannerImg_03 from "../Images/banner_img_03.jpg";
import bannerImg_04 from "../Images/banner_img_04.jpg";
import bannerImg_05 from "../Images/banner_img_05.jpg";
import Product from "../Components/Product";
import Shop from "../Components/Shop";

const imgset = [bannerImg_01, bannerImg_02, bannerImg_03, bannerImg_04, bannerImg_05];

export default function Home() {

    const [slidesToShow, setSlidesToShow] = useState(6); // 한번에 보이는 슬라이드의 수

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 600) {
                setSlidesToShow(3);
            } else if (width <= 900) {
                setSlidesToShow(4);
            } else if (width <= 1300) {
                setSlidesToShow(5);
            } else {
                setSlidesToShow(6);
            }
        };

        handleResize(); 
        window.addEventListener("resize", handleResize); 

        return () => {
            window.removeEventListener("resize", handleResize); 
        };
    }, []);

    const banner_settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const product_settings = {
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Container>
            <Banner>
                <BannerSlider {...banner_settings}>
                    {imgset.map((image, index) => (
                        <Slide key = {index}>
                            <Image src = {image}/>
                        </Slide>
                    ))}
                </BannerSlider>
            </Banner>
            <Title>🔥내 주변 인기상품</Title>
            <ProductContainer>
                <ProductSlider {...product_settings}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ProductBox key = {index}>
                            <Product/>
                        </ProductBox>
                    ))}
                </ProductSlider>
            </ProductContainer>
            <Title>🆕내 주변 최신등록 상품</Title>
            <ProductContainer>
                <ProductSlider {...product_settings}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ProductBox key = {index}>
                            <Product/>
                        </ProductBox>
                    ))}
                </ProductSlider>
            </ProductContainer>
            <Title>🍞내 주변 매장</Title>
            <ProductContainer>
                <ProductSlider {...product_settings}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ProductBox key = {index}>
                            <Shop/>
                        </ProductBox>
                    ))}
                </ProductSlider>
            </ProductContainer>
            <Empty/>
        </Container>
    );
}

const Container = styled.div` // 최상단 박스 컨테이너
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Banner = styled.div` // 배너 컨테이너
    width: 100%;
    height: 30vh;
    position: relative;
`;

const BannerSlider = styled(Slider)` // 배너 슬라이더
    width: 100%;
    height: 100%;

    .slick-list {
        height: 100%; 
    }

    .slick-prev {
        position: absolute;
        top: 15vh;
        left: 10px;
        z-index: 10;
    }

    .slick-next {
        position: absolute;
        top: 15vh;
        right: 20px;
        z-index: 10;
    }

    .slick-dots {
        bottom: 0px;
    }

    .slick-dots li button:before {
        font-size: 10px;
    }

    .slick-prev:before, .slick-next:before {
        color: black;
        font-size: 30px;
    }
`;

const Slide = styled.div` // 배너 슬라이드
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img` // 배너 슬라이드 이미지
    width: 100%;
    height: 100%;
    object-fit: cover; 
`;

const Title = styled.div` // 제목
    font-size: 25px;
    font-weight: bold;
    margin: 5vh 0px 2.5vh 10%;

    @media (max-width: 1000px) {
        font-size: 22.5px;
        margin: 4vh 0px 2.5vh 10%;
    }

    @media (max-width: 800px) {
        font-size: 20px;
        margin: 3vh 0px 2.5vh 7.5%;
    }

    @media (max-width: 600px) {
        font-size: 17.5px;
        margin: 2.5vh 0px 2.5vh 5%;
    }

    @media (max-width: 500px) {
        font-size: 18px;
        margin: 2vh 0px 2vh 2.5%;
    }
`;

const ProductContainer = styled.div` // 상품 컨테이너
    width: 80%;
    height: 30vh;
    margin-left: 10%;

    @media (max-width: 1000px) {
        height: 25vh;
    }

    @media (max-width: 800px) {
        width: 85%;
        height: 22.5vh;
        margin-left: 7.5%;
    }

    @media (max-width: 600px) {
        width: 90%;
        height: 20vh;
        margin-left: 5%;
    }

    @media (max-width: 500px) {
        width: 95%;
        height: 17.5vh;
        margin-left: 2.5%;
    }
`;

const ProductSlider = styled(Slider)` // 상품 슬라이드 컨테이너
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
        color: #2590F1;
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

const ProductBox = styled.div` // 상품 박스
    height: 100%;
    box-sizing: border-box;
`;

const Empty = styled.div` // 여백
    height: 15vh;
`;