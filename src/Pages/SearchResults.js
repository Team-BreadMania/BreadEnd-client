import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import bannerImg_01 from '../Images/bread_img.png';
import bannerImg_02 from '../Images/bread_img01.jpg';
import bannerImg_03 from '../Images/bread_img02.jpg';
import bannerImg_04 from '../Images/bread_img03.png';
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
        빵: [bannerImg_01, bannerImg_02, bannerImg_03,bannerImg_04 ],
        빵집: [bannerImg_02, bannerImg_03, bannerImg_01,bannerImg_04],
        내주변: [bannerImg_03, bannerImg_01, bannerImg_02,bannerImg_04],
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Container>
            <Title>{query ? `"${query}"에 대한 검색결과입니다.` : "검색결과가 없습니다😓."}</Title>
            {query && Object.keys(dummyData).map((category, idx) => (
                <Category key={idx}>
                    <CategoryTitle>{category}</CategoryTitle>
                    <SliderContainer>
                        <ProductSlider {...settings}>
                            {dummyData[category].map((image, index) => (
                                <ProductBox key={index}>
                                    <Image src={image} />
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
    width: 100%;
    padding: 20px;
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
    margin-bottom: 40px;
    background-color: #fff;
`;

const CategoryTitle = styled.h3`
    font-size: 20px;
    color: #d4b896;
    border-bottom: 2px solid #d4b896;
    background-color: #f5f5dc; /* 베이지 색상 */
    border-radius: 8px;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const SliderContainer = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const ProductSlider = styled(Slider)`
    .slick-list {
        padding: 10px;
    }
    .slick-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }
   .slick-prev:before, .slick-next:before {
    color: #d4b896;
    font-size: 30px;
   }

`;
const ProductBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
`;
