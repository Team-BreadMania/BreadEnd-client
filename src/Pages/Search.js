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
    align-items: center;
    padding: 20px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const SearchBar = styled.div`
    display: flex;
    width: 80%;
    max-width: 600px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const SearchButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-left: none;
    background-color: #333;
    color: white;
    border-radius: 0 4px 4px 0;
    cursor: pointer;

    &:hover {
        background-color: #555;
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
    }
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
`;

const Tab = styled.div`
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 20px;
    background-color: ${({ active }) => (active ? '#000' : '#f0f0f0')};
    color: ${({ active }) => (active ? '#fff' : '#000')};
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #000;
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
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
`;

const SearchTag = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 5px;
    background-color: #f0f0f0;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0;
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
    color: red;
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
    text-align: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;
