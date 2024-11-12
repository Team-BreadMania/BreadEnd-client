import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [activeTab, setActiveTab] = useState('추천검색어');

    useEffect(() => {
        // 로컬 스토리지에서 최근 검색어 불러오기
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim() !== '') {
            const updatedSearches = [searchTerm, ...recentSearches.filter(item => item !== searchTerm)].slice(0, 10);
            setRecentSearches(updatedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
        setSearchTerm('');
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
            <Title>고객님, 어떤 상품을 찾으세요?</Title>
            <SearchBar>
                <SearchInput
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="검색어를 입력하세요"
                />
                <SearchButton onClick={handleSearchSubmit}>검색</SearchButton>
            </SearchBar>
            <TabContainer>
                <Tab active={activeTab === '추천검색어'} onClick={() => handleTabClick('추천검색어')}>추천검색어</Tab>
                <Tab active={activeTab === '최근검색어'} onClick={() => handleTabClick('최근검색어')}>최근검색어</Tab>
            </TabContainer>
            {activeTab === '추천검색어' && (
                <NoRecentSearches>추천 검색어가 없습니다.</NoRecentSearches>
            )}
            {activeTab === '최근검색어' && (
                <RecentSearchesContainer>
                    {recentSearches.length > 0 ? (
                        recentSearches.map((item, index) => (
                            <SearchTag key={index}>
                                {item}
                                <DeleteButton onClick={() => handleDeleteSearch(item)}>X</DeleteButton>
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
    width: 100%;
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
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 5px;
    background-color: #f0e9dd;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0d8c8;
    }

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 12px;
    }
`;

const DeleteButton = styled.button`
    margin-left: 10px;
    background: none;
    border: none;
    color: #b22222;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        font-weight: bold;
    }

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

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
