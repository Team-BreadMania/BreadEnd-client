import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
<<<<<<< HEAD
import Product from "../Components/Product";
import Shop from "../Components/Shop";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
=======
import breadshop_img from "../Images/breadshop_img.jpg";
import dibs_before from "../Images/dibs_before.png";
import dibs_after from "../Images/dibs_after.png";
>>>>>>> eb5ccb75b1c7287ac61fb0bb840077643b0ba14d

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

    const [dibs, setDibs] = useState(false); // 찜하기 상태

    const toggleDibs = () => { // 찜상태 토클 메서드
        setDibs(prev => !prev); 
    };

    return (
        <Container>
<<<<<<< HEAD
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
=======
            <ImageBox/> 
            <BottomBox>
                <ShopInfo>
                    <ShopName>삼송빵집</ShopName>
                    <ShopLocation>수성구 범어1동</ShopLocation>
                </ShopInfo>
                <Dibs onClick = {toggleDibs} dib = {dibs}/>
            </BottomBox>
>>>>>>> eb5ccb75b1c7287ac61fb0bb840077643b0ba14d
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

<<<<<<< HEAD
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
=======
const ImageBox = styled.div` // 매장 이미지 박스
    width: 100%;
    height: 70%;
    background-image: url(${breadshop_img});
    background-size: cover;
    border-radius: 5px;
`;

const BottomBox = styled.div` // 하단박스
    display: flex;
    width: 100%;
    height: 30%;
`;

const ShopInfo = styled.div` // 매장정보 박스
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
`;

const ShopName = styled.div` // 매장이름
    display: flex;
    align-items: center;
    width: 100%;
    height: 60%;
    font-size: 15px;
    font-weight: bold;

    @media (max-width: 1000px) {
        font-size: 14px; 
    }

    @media (max-width: 800px) {
        font-size: 13px; 
    }

    @media (max-width: 600px) {
        font-size: 12.5px; 
    }
`;

const ShopLocation = styled.div` // 매장 위치
    display: flex;
    align-items: center;
    height: 40%;
    font-size: 12.5px;
    font-weight: bold;
    background-color: #F1F1F1;
    color: #555555;
    border-radius: 5px;
    padding: 0 5px;
    align-self: flex-start;

    @media (max-width: 1000px) {
        font-size: 12px; 
    }

    @media (max-width: 800px) {
        font-size: 11px; 
    }

    @media (max-width: 600px) {
        font-size: 10.5px; 
    }
`;

const Dibs = styled.div` // 매장 찜하기 아이콘
    display: flex;
    margin-top: auto;
    margin-left: auto;
    width: 30px;
    height: 30px;
    background-image: url(${props => (props.dib ? dibs_after : dibs_before)});
    background-size: cover;
    cursor: pointer;
    transition: background-image 0.2s ease;

    @media (max-width: 500px) {
        width: 20px;
        height: 20px;
    }
`;
>>>>>>> eb5ccb75b1c7287ac61fb0bb840077643b0ba14d
