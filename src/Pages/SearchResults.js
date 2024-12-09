import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchProduct from '../Components/SearchProduct'; // 데이터 가져오기
import SearchShop from '../Components/SearchShop'; // 데이터 가져오기


export default function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
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


    return (
        <Container>
            <Title>{query ? `"${query}"에 대한 검색결과입니다.` : "검색결과가 없습니다😓."}</Title>

                    <SearchProduct />
                    <SearchShop /> {/* 여기에 API 데이터를 렌더링하는 컴포넌트를 배치 */}
            
      
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
    @media (max-width: 600px) {
        font-size: 20px; /* 모바일에서 제목 크기 줄이기 */
        margin-bottom: 20px;
    }
`;




const Empty = styled.div`
    height: 15vh;

    @media (max-width: 600px) {
        height: 10vh; /* 모바일 화면에서 빈 공간 줄이기 */
    }
`;