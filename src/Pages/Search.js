import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Popular from "../Components/Popular";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [activeTab, setActiveTab] = useState('인기검색어');
    const navigate = useNavigate();

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm) {
            const updatedSearches = [searchTerm, ...recentSearches.filter(item => item !== searchTerm)].slice(0, 10);
            setRecentSearches(updatedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

            // DB에 검색어 저장 (POST 방식)
            fetch('/api/saveSearchTerm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm })
            }).catch((error) => console.error('Error saving search term:', error));

            navigate(`/SearchResults?query=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate('/SearchResults');
        }
    };

    const handleRecentSearchClick = (search) => {
        setSearchTerm(search);

        // DB에 검색어 저장 (POST 방식)
        fetch('/api/saveSearchTerm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchTerm: search })
        }).catch((error) => console.error('Error saving search term:', error));

        navigate(`/SearchResults?query=${encodeURIComponent(search)}`);
    };

    const handleDeleteSearch = (search) => {
        const updatedSearches = recentSearches.filter(item => item !== search);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <SearchContainer>
            <Title>고객님, 어떤 상품🛒을 찾으세요?🤔</Title>
            <SearchBar>
                <SearchInput
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="검색어를 입력하세요"
                />
                <SearchButton onClick={handleSearchSubmit}>검색🗸</SearchButton>
            </SearchBar>
            <TabContainer>
                <Tab active={activeTab === '인기검색어'} onClick={() => handleTabClick('인기검색어')}>인기검색어</Tab>
                <Tab active={activeTab === '최근검색어'} onClick={() => handleTabClick('최근검색어')}>최근검색어</Tab>
            </TabContainer>
            {activeTab === '인기검색어' && <Popular />} {/* 인기검색어 컴포넌트 */}
            {activeTab === '최근검색어' && (
                <RecentSearchesContainer>
                    {recentSearches.length > 0 ? (
                        recentSearches.map((item, index) => (
                            <SearchTag key={index} onClick={() => handleRecentSearchClick(item)}>
                                {item}
                                <DeleteButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSearch(item);
                                }}>X</DeleteButton>
                            </SearchTag>
                        ))
                    ) : (
                        <NoRecentSearches>최근 검색어가 없습니다.</NoRecentSearches>
                    )}
                </RecentSearchesContainer>
            )}
        </SearchContainer>
    );
}


    // Styled-components CSS 설정
    const SearchContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        position: absolute;
        top: ${({ top }) => top || '160px'};
        left: ${({ left }) => left || '0px'};
        padding: 0;
        width: 90%;
        height: 100vh;
        background-color: #ffffff;
    `;

    const Title = styled.h1`
        font-family: 'Arial, sans-serif';
        font-size: 24px;
        margin: 20px 0 10px 10%;
        text-align: left;
        color: #4a4a4a;

        @media (max-width: 768px) {
            font-size: 20px;
            margin: 15px 0 10px 10%;
        }
    `;

    const SearchBar = styled.div`
        display: flex;
        width: 80%;
        max-width: 700px;
        margin-bottom: 20px;
        margin-left: 10%;
        border-radius: 30px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        @media (max-width: 768px) {
            width: 85%;
            margin-left: 10%;
        }
    `;

    const SearchInput = styled.input`
        flex: 4;
        padding: 10px;
        font-size: 16px;
        border: none;
        background-color: #fff;
        color: #4a4a4a;

        @media (max-width: 768px) {
            padding: 8px;
        }
    `;

    const SearchButton = styled.button`
        flex: 1;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        background-color: #d4b896;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #bfa17d;
        }

        @media (max-width: 768px) {
            padding: 8px 16px;
        }
    `;

    const TabContainer = styled.div`
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-left: 10%;
        width: 80%;
        overflow-x: auto;
        white-space: nowrap;
    `;

    const Tab = styled.div`
        margin: 0 10px;
        font-size: 16px;
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 20px;
        background-color: ${({ active }) => (active ? '#d4b896' : '#f0e9dd')};
        color: ${({ active }) => (active ? '#fff' : '#4a4a4a')};
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            background-color: #bfa17d;
            color: #fff;
        }

        @media (max-width: 768px) {
            padding: 8px 16px;
            font-size: 14px;
        }
    `;

    const RecentSearchesContainer = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-left: 10%;
        width: 80%;
    `;

    const SearchTag = styled.div`
    display: flex; /* 가로 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    flex-direction: row; /* 콘텐츠를 가로 방향으로 배치 */
    justify-content: space-between; /* 텍스트와 버튼 간 적절한 간격 */
    padding: 8px 12px; /* 내부 여백 조정 */
    margin: 5px;
    background-color: #f0e9dd; /* 배경색 */
    border-radius: 20px; /* 둥근 모서리 */
    font-size: 14px; /* 텍스트 크기 */
    cursor: pointer;
    transition: background-color 0.3s;

    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    overflow: hidden; /* 텍스트가 길면 잘리도록 설정 */
    text-overflow: ellipsis; /* 텍스트가 잘릴 때 "..." 표시 */

    &:hover {
        background-color: #e0d8c8;
    }

    @media (max-width: 768px) {
        padding: 6px 10px; /* 모바일에서 적절한 여백 */
        font-size: 12px;
    }
`;



   const DeleteButton = styled.button`
   margin-left: 5px; /* 검색어와 버튼 간 간격 */
   background: none; /* 기본 배경 제거 */
   border: none; /* 테두리 제거 */
   color: #000000  ; /* 기본 텍스트 색상 */
   cursor: pointer;
   font-size: 12px; /* 폰트 크기 조정 */
   padding: 2px 4px; /* 버튼 내부 여백 최소화 */
   line-height: 1.3; /* 텍스트 정렬 문제 방지 */
   transition: background-color 0.3s, color 0.3s; /* 부드러운 전환 효과 */

   &:hover {
    background-color: #ffffff; /* 호버 시 배경색 흰색으로 변경 */
    color: #000000; /* 텍스트 색상 유지 */
    border-radius: 4px; /* 모서리 둥글게 */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 약간의 그림자 효과 */
   }

   @media (max-width: 768px) {
    font-size: 10px; /* 모바일 화면에서 더 작은 크기 */
  }
` ;



    const NoRecentSearches = styled.div`
        font-size: 14px;
        color: #888;
        margin-top: 20px;
        margin-left: 10%;
        text-align: left;

        @media (max-width: 768px) {
            font-size: 12px;
        }
    `;