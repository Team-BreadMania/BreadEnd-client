import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import breadImg1 from '../Images/breadImg1.jfif';
import breadImg2 from '../Images/breadImg2.jpg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Temp() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/ProductRegistration');
    };
    const accessToken = Cookies.get('accessToken');
    //판매 대기 제품 저장 배열
    const [waitProducts, setWaitProducts] = useState([]);
    //판매 완료 제품 저장 배열
    const [sellProducts, setSellProducts] = useState([]);
    //판매중인 제품 개수
    const waitProductLength = waitProducts.length;
    //판매완료 제품 개수
    const sellProductLenght = sellProducts.length;

    const fetchwaitItem = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/seller/show/wait`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('판매중 불러오기 성공', response.data);
            setWaitProducts(response.data);
        } catch (error) {
            console.error('API 요청 에러:', error);
            // Optionally, set an error state to show to the user
        }
    };
    const fetchsellItem = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/seller/show/sell`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('판매완료 불러오기 성공', response.data);
            setSellProducts(response.data);
        } catch (error) {
            console.error('API 요청 에러:', error);
            // Optionally, set an error state to show to the user
        }
    };
    useEffect(() => {
        if (accessToken) {
            fetchwaitItem();
            fetchsellItem();
        }
    }, [accessToken, fetchwaitItem, fetchsellItem]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Title>상품관리</Title>
                    <AddButton onClick={handleSubmit}>상품 추가</AddButton>
                </HeaderContent>
            </Header>

            <MainContent>
                <StatsContainer>
                    <StatBox>
                        <StatLabel>전체</StatLabel>
                        <StatValue>{waitProductLength + sellProductLenght}</StatValue>
                    </StatBox>
                    <StatBox>
                        <StatLabel>판매중</StatLabel>
                        <StatValue>{waitProductLength}</StatValue>
                    </StatBox>
                    <StatBox>
                        <StatLabel>판매완료</StatLabel>
                        <StatValue>{sellProductLenght}</StatValue>
                    </StatBox>
                </StatsContainer>

                <ProductGrid>
                    <MobileHeader>
                        <div style={{ marginRight: '6px' }}>
                            <input type="checkbox" />
                        </div>
                        <SelectAllDiv>전체선택</SelectAllDiv>
                    </MobileHeader>

                    {waitProducts.map((product) => (
                        <MobileProduct key={product.productid}>
                            <input type="checkbox" />
                            <MobileDiv>{product.productid}</MobileDiv>
                            <MobileImg src={product.imgpaths[0]} />
                            <MobileInfoContainer>
                                <MobileDiv>{product.itemname}</MobileDiv>
                                <MobileDiv>{product.price}</MobileDiv>
                            </MobileInfoContainer>
                            <MobileDiv>판매중</MobileDiv>
                            <MobileDiv>{product.count}</MobileDiv>
                        </MobileProduct>
                    ))}
                </ProductGrid>
            </MainContent>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
    background-color: #f0e9dd;
`;

const Header = styled.header`
    padding: 1rem;
    background: white;
    border-bottom: 1px solid #eee;
`;

const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: bold;
`;

const AddButton = styled.button`
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
    width: 15%;

    &:hover {
        background: #2563eb;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const MainContent = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const StatBox = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: #6b7280;
`;

const StatValue = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`;

const ProductGrid = styled.div`
    background: white;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProductHeader = styled.div`
    display: grid;
    grid-template-columns: 40px 60px 1.5fr 1fr 1fr 1fr 0.85fr 1fr 1fr;
    padding: 1rem 0.7rem;
    background: #d3b790;
    font-weight: bold;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    gap: 0.8rem;

    @media (max-width: 1024px) {
        display: none;
    }
`;
const MobileHeader = styled.div`
    display: flex;
    background: #d3b790;
    font-weight: bold;
    color: #433b30;
    border-bottom: 1px solid #e5e7eb;
    align-items: center;
    padding: 0.5rem 0.7rem;
`;
const MobileProduct = styled.div`
    display: grid;
    padding: 1rem 0.7rem;
    grid-template-columns: 20px 40px 1fr 1.5fr 1.1fr 0.8fr;

    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    justify-content: space-between;
    &:hover {
        background: #f9fafb;
    }
    @media (max-width: 1024px) {
        grid-template-columns: 20px 50px 1fr 1fr 1fr 1fr;
    }
    @media (max-width: 450px) {
        font-size: 16px;
        grid-template-columns: 20px 33px 0.8fr 1.6fr 1.1fr 0.8fr;
    }
    @media (max-width: 400px) {
        font-size: 14px;
        grid-template-columns: 20px 33px 0.8fr 1.6fr 1.1fr 0.8fr;
    }
`;
const MobileImg = styled.div`
    width: 50px;
    height: 50px;
    background: #f3f4f6;
    border-radius: 4px;
    flex-shrink: 0;
    background-image: url(${(props) => props.src});
    background-position: center center;
    background-size: cover;
    @media (max-width: 400px) {
        width: 40px;
        height: 40px;
    }
`;

const MobileDiv = styled.div`
    padding: 1px 8px;
`;

const MobileInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const SelectAllDiv = styled.div`
    font-size: 16px;
`;
