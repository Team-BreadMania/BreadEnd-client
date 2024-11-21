import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import breadImg1 from '../Images/breadImg1.jfif';
import breadImg2 from '../Images/breadImg2.jpg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ProductManagement() {
    const navigate = useNavigate();
    const [waitItem, setWaitItem] = useState("");
    const [sellItem, setSellItem] = useState("");
    const handleSubmit = () => {
        navigate('/ProductRegistration');
    };

    const accessToken = Cookies.get('accessToken');

    const [products, setProducts] = useState([
        {
            img: breadImg1,
            id: 106,
            name: '밤식빵1',
            category: '식빵',
            price: 2000,
            status: '판매중',
            count: 5,
            views: 58,
            createdAt: '2022-03-31',
            saleAt: '2022-03-31',
            badges: ['NEW', 'SALE'],
        },
        {
            img: breadImg2,
            id: 31,
            name: '밤식빵2',
            category: '식빵',
            price: 1500,
            status: '판매중',
            count: 3,
            views: 0,
            createdAt: '2020-01-14',
            saleAt: '2022-03-17',
        },
    ]);

    const SellingItemData = async (accessToken) => {
        try {
            const response = await axios.get('http://43.203.241.42/seller/show/wait', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`, 
                },
            });
    
            if (response.status === 200) {
                console.log('유저정보 불러오기 성공:', response.data);
    
                const transformedProducts = response.data.map(product => ({
                    // img: product.imgpaths[0], // 첫 번째 이미지 경로 사용
                    id: product.productid,
                    name: product.itemname,
                    category: product.itemtype,
                    price: product.price,
                    status: '판매중',
                    count: product.count,
                    createdAt: product.makedate, // 등록일
                    saleAt: product.expireddate, // 만료일
                }));
    
                setProducts(transformedProducts);
            }
            else{
                console.log('데이터 가져오기 실패:', response.data);
            }
        } catch (error) {
            console.error('상품 데이터를 가져오는 데 실패했습니다:', error.response);
            // 사용자에게 에러 메시지를 표시하는 방법 추가
        }
    };
    
    useEffect(() => {
        if (accessToken) {
            SellingItemData(accessToken);
        }
    }, [accessToken]); // accessToken이 변경될 때마다 사용자 데이터를 가져옴

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
                        <StatValue>2</StatValue>
                    </StatBox>
                    <StatBox>
                        <StatLabel>판매중</StatLabel>
                        <StatValue>2</StatValue>
                    </StatBox>
                    <StatBox>
                        <StatLabel>판매완료</StatLabel>
                        <StatValue>0</StatValue>
                    </StatBox>
                </StatsContainer>

                <ProductGrid>
                    <ProductHeader>
                        <div>
                            <input type="checkbox" />
                        </div>
                        <div>No</div>
                        <div>상품명</div>
                        <div>판매가</div>
                        <div>카테고리</div>
                        <div>상태</div>
                        <div>재고</div>
                        <div>등록일</div>
                        <div>수정일</div>
                    </ProductHeader>

                    {products.map((product) => (
                        <ProductRow key={product.id}>
                            <ProductCell mobileHidden>
                                <input type="checkbox" />
                            </ProductCell>
                            <ProductCell label="No">{product.id}</ProductCell>
                            <ProductCell label="상품명">
                                <ProductInfo>
                                    <ProductImage src={product.img} />
                                    <ProductDetails>
                                        {/* <div>
                                            {product.badges?.map((badge) => (
                                                <Badge key={badge} type={badge}>
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </div> */}
                                        <div>{product.name}</div>
                                    </ProductDetails>
                                    <MobileActions>
                                        <MoreVertical size={20} color="#6b7280" />
                                    </MobileActions>
                                </ProductInfo>
                            </ProductCell>
                            <ProductCell label="판매가">{product.price.toLocaleString()}원</ProductCell>
                            <ProductCell label="카테고리">{product.category}</ProductCell>
                            <ProductCell label="상태">{product.status}</ProductCell>
                            <ProductCell label="재고">{product.count}</ProductCell>
                            <ProductCell label="등록일">{product.createdAt}</ProductCell>
                            <ProductCell label="수정일">{product.saleAt}</ProductCell>
                        </ProductRow>
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
    grid-template-columns: 40px 60px 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    padding: 1rem;
    background: #d3b790;
    font-weight: bold;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    gap: 1rem;

    @media (max-width: 1024px) {
        display: none;
    }
`;

const ProductRow = styled.div`
    display: grid;
    grid-template-columns: 40px 60px 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    padding: 1rem;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    gap: 1rem;

    &:hover {
        background: #f9fafb;
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
`;

const ProductCell = styled.div`
    @media (max-width: 1024px) {
        display: ${(props) => (props.mobileHidden ? 'none' : 'block')};

        ${(props) =>
            !props.mobileHidden &&
            `
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &:before {
        // content: '${(props) => props.label}';
        font-weight: 500;
        color: #374151;
      }
    `}
    }
`;

const Badge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    margin-right: 0.25rem;

    ${(props) =>
        props.type === 'NEW' &&
        `
    background: #dbeafe;
    color: #1e40af;
  `}

    ${(props) =>
        props.type === 'SALE' &&
        `
    background: #fee2e2;
    color: #991b1b;
  `}
  
  ${(props) =>
        props.type === 'HOT' &&
        `
    background: #fef3c7;
    color: #92400e;
  `}
`;

const ProductImage = styled.div`
    width: 50px;
    height: 50px;
    background: #f3f4f6;
    border-radius: 4px;
    flex-shrink: 0;
    background-image: url(${(props) => props.src});
    background-position: center center;
    background-size: cover;
`;

const ProductInfo = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 1024px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

const ProductDetails = styled.div`
    flex: 1;
`;

const MobileActions = styled.div`
    display: none;

    @media (max-width: 1024px) {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
`;