import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Popular() {
    const [popularSearches, setPopularSearches] = useState([
        "조영동",
        "판교동",
        "크림빵",
        "초코빵",
        "소금빵",
        "단팥빵",
        "경상북도 경산시",
        "경기도 분당시",
        "생크림빵",
        "붕어빵"
    ]);
    const navigate = useNavigate();

    // 백엔드에서 인기 검색어 가져오기
    useEffect(() => {
        // 예시 API 호출
        fetch('/api/popularSearches') // API URL 교체 필요
            .then((response) => response.json())
            .then((data) => {
                const updatedSearches = data.slice(0, 10); // 백엔드에서 가져온 데이터를 1~10위까지 설정
                setPopularSearches(updatedSearches);
            })
            .catch((error) => {
                console.error('Error fetching popular searches:', error);
            });
    }, []);

    // 검색어 클릭 핸들러
    const handleSearchClick = (searchTerm) => {
        // 최근 검색어에 추가
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        const updatedSearches = [searchTerm, ...storedSearches.filter(item => item !== searchTerm)].slice(0, 10);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        navigate(`/SearchResults?query=${encodeURIComponent(searchTerm)}`);
    };
    return (
        <PopularContainer>
            {popularSearches.length > 0 ? (
                <SearchList>
                    {popularSearches.map((item, index) => (
                        <SearchItem key={index} onClick={() => handleSearchClick(item)}>
                            <Rank>{index + 1}</Rank>
                            <ItemText>{item}</ItemText>
                        </SearchItem>
                    ))}
                </SearchList>
            ) : (
                <NoPopularSearches>인기 검색어가 없습니다.</NoPopularSearches>
            )}
        </PopularContainer>
    );
}
// Styled-components CSS 설정
const PopularContainer = styled.div`
    margin-left: ${({ marginLeft }) => marginLeft || 100}px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width || 50}%;
    padding: ${({ padding }) => padding || 20}px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: ${({ padding }) => (padding ? padding - 5 : 15)}px;
        width: 100%;
        margin-left: 0;
        box-shadow: none;
    }
`;

const SearchList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const SearchItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        padding: 8px 0;
    }
`;

const Rank = styled.span`
    font-size: ${({ size }) => size || 16}px;
    font-weight: bold;
    color: #d4b896;
    margin-right: 15px;

    @media (max-width: 768px) {
        font-size: ${({ size }) => (size ? size - 2 : 14)}px;
        margin-right: 5px;
    }
`;

const ItemText = styled.span`
    font-size: ${({ size }) => size || 16}px;
    color: #4a4a4a;

    @media (max-width: 768px) {
        font-size: ${({ size }) => (size ? size - 2 : 14)}px;
    }
`;

const NoPopularSearches = styled.div`
    font-size: ${({ size }) => (size ? size - 2 : 14)}px;
    color: #888;
    text-align: center;

    @media (max-width: 768px) {
        font-size: ${({ size }) => (size ? size - 4 : 12)}px;
    }
`;
