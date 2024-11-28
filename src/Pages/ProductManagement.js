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
    const handleSubmit = () => {
        navigate('/ProductRegistration');
    };
    const [isMobile, setIsMobile] = useState(false);

    const accessToken = Cookies.get('accessToken');
    //판매 대기 제품 저장 배열
    const [waitProducts, setWaitProducts] = useState([]);
    //판매 완료 제품 저장 배열
    const [sellProducts, setSellProducts] = useState([]);
    //구매 예약 제품 저장 배열
    const [ongoingProducts, setOngoinProducts] = useState([]);
     // 선택된 상품 ID들을 저장할 상태 추가
     const [selectedProducts, setSelectedProducts] = useState([]);
    //판매중인 제품 개수
    const waitProductLength = waitProducts.length;
    //판매예약 제품 개수
    const ongoingProductsLength = ongoingProducts.length;
    //판매완료 제품 개수
    const sellProductLenght = sellProducts.length;

    // 모바일 뷰, 태블릿 뷰 식별
    const resizeHandler = () => {
        setIsMobile(window.innerWidth <= 1024);
    };

    // 뷰포트 확인 후 조절
    useEffect(() => {
        resizeHandler(); // 초기 로드 시 크기 확인
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    // 전체 선택/해제 핸들러
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            // 현재 보여지는 모든 제품의 ID 선택
            const allProductIds = [
                ...waitProducts.map(p => p.productid),
                ...ongoingProducts.map(p => p.productid),
                ...sellProducts.map(p => p.productid)
            ];
            setSelectedProducts(allProductIds);
        } else {
            // 모든 선택 해제
            setSelectedProducts([]);
        }
    };
     // 개별 상품 선택/해제 핸들러
     const handleProductSelect = (productId) => {
        setSelectedProducts(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

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
    const fetchOngoingItem = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/seller/show/sell`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('판매예약 불러오기 성공', response.data);
            setOngoinProducts(response.data);
        } catch (error) {
            console.error('API 요청 에러:', error);
            // Optionally, set an error state to show to the user
        }
    };

    // 상품 삭제 핸들러
    const handleDeleteProducts = async () => {
        try {
            // 선택된 각 상품에 대해 삭제 요청
            const deletePromises = selectedProducts.map(productId => 
                axios.delete(`https://breadend.shop/seller/delete?productid=${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            );

            await Promise.all(deletePromises);

            // 삭제 후 상품 목록 새로고침
            await Promise.all([
                fetchwaitItem(),
                fetchsellItem(),
                fetchOngoingItem()
            ]);

            // 선택 상태 초기화
            setSelectedProducts([]);

            alert('선택한 상품들이 삭제되었습니다.');
        } catch (error) {
            console.error('상품 삭제 중 오류:', error);
            alert('상품 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchwaitItem();
            fetchsellItem();
            fetchOngoingItem();
        }
    }, [accessToken]); // accessToken이 변경될 때마다 사용자 데이터를 가져옴

    const PCView = () => {
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
                            <StatValue>{waitProductLength + sellProductLenght + ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel>판매중</StatLabel>
                            <StatValue>{waitProductLength}</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel>판매예약</StatLabel>
                            <StatValue>{ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel>판매완료</StatLabel>
                            <StatValue>{sellProductLenght}</StatValue>
                        </StatBox>
                    </StatsContainer>

                    <ProductGrid>
                        <ProductHeader>
                            <input 
                                type="checkbox" 
                                checked={selectedProducts.length === waitProductLength + ongoingProductsLength + sellProductLenght}
                                onChange={handleSelectAll}
                            />
                            <div>No</div>
                            <div>상품명</div>
                            <div>판매가</div>
                            <div>카테고리</div>
                            <div>상태</div>
                            <div>재고</div>
                            <div>등록일</div>
                            <div>수정일</div>
                        </ProductHeader>

                        {waitProducts.map((product) => (
                            <ProductRow key={product.productid}>
                                <input 
                                    type="checkbox" 
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid)}
                                    onChange={() => handleProductSelect(product.productid)}
                                    styled={{margin:'0px'}}
                                />
                                <ProductCell label="No">{product.productid}</ProductCell>
                                <ProductCell label="상품명">
                                    <ProductInfo>
                                        <ProductImage src={product.imgpaths[0]} />
                                        <ProductDetails>
                                            <div>{product.itemname}</div>
                                        </ProductDetails>
                                        <MobileActions>
                                            <MoreVertical size={20} color="#6b7280" />
                                        </MobileActions>
                                    </ProductInfo>
                                </ProductCell>
                                <ProductCell label="판매가">{product.price.toLocaleString()}원</ProductCell>
                                <ProductCell label="카테고리">{product.itemtype}</ProductCell>
                                <ProductCell label="상태">판매중</ProductCell>
                                <ProductCell label="재고">{product.count}</ProductCell>
                                <ProductCell label="등록일">{product.makedate}</ProductCell>
                                <ProductCell label="수정일">{product.expireddate}</ProductCell>
                            </ProductRow>
                        ))}
                    </ProductGrid>
                    <ProductGrid>
                        {ongoingProducts.map((product) => (
                            <ProductRow key={product.productid}>
                                <input 
                                    type="checkbox" 
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid)}
                                    onChange={() => handleProductSelect(product.productid)}
                                />
                                <ProductCell label="No">{product.productid}</ProductCell>
                                <ProductCell label="상품명">
                                    <ProductInfo>
                                        <ProductImage src={product.imgpaths[0]} />
                                        <ProductDetails>
                                            <div>{product.name}</div>
                                        </ProductDetails>
                                        <MobileActions>
                                            <MoreVertical size={20} color="#6b7280" />
                                        </MobileActions>
                                    </ProductInfo>
                                </ProductCell>
                                <ProductCell label="판매가">{product.price.toLocaleString()}원</ProductCell>
                                <ProductCell label="카테고리">{product.itemtype}</ProductCell>
                                <ProductCell label="상태">판매예약</ProductCell>
                                <ProductCell label="재고">{product.count}</ProductCell>
                                <ProductCell label="등록일">{product.makedate}</ProductCell>
                                <ProductCell label="수정일">{product.expireddate}</ProductCell>
                            </ProductRow>
                        ))}
                    </ProductGrid>
                    <ProductGrid>
                        {sellProducts.map((product) => (
                            <ProductRow key={product.productid}>
                                <input 
                                    type="checkbox" 
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid)}
                                    onChange={() => handleProductSelect(product.productid)}
                                />                               
                                <ProductCell label="No">{product.productid}</ProductCell>
                                <ProductCell label="상품명">
                                    <ProductInfo>
                                        <ProductImage src={product.imgpaths[0]} />
                                        <ProductDetails>
                                            <div>{product.name}</div>
                                        </ProductDetails>
                                        <MobileActions>
                                            <MoreVertical size={20} color="#6b7280" />
                                        </MobileActions>
                                    </ProductInfo>
                                </ProductCell>
                                <ProductCell label="판매가">{product.price.toLocaleString()}원</ProductCell>
                                <ProductCell label="카테고리">{product.itemtype}</ProductCell>
                                <ProductCell label="상태">판매완료</ProductCell>
                                <ProductCell label="재고">{product.count}</ProductCell>
                                <ProductCell label="등록일">{product.makedate}</ProductCell>
                                <ProductCell label="수정일">{product.expireddate}</ProductCell>
                            </ProductRow>
                        ))}
                    </ProductGrid>
                    <ButtonContainer>
                        <EditButton>수정</EditButton>
                        <DeleteButton onClick={handleDeleteProducts}>삭제</DeleteButton>
                    </ButtonContainer>

                </MainContent>

            </Container>
        );
    };

    const MobileView = () => {
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
                            <StatValue>{waitProductLength + sellProductLenght + ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel>판매중</StatLabel>
                            <StatValue>{waitProductLength}</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel>판매예약</StatLabel>
                            <StatValue>{ongoingProductsLength}</StatValue>
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
                    <ButtonContainer><EditButton>수정</EditButton><DeleteButton>삭제</DeleteButton></ButtonContainer>
                </MainContent>
            </Container>
        );
    };
    return <div style={{ width: '100%' }}>{isMobile ? <MobileView /> : <PCView />}</div>;
}
const Container = styled.div`
    min-height: 100vh;
    background-color: #f0e9dd;
    height:100%;
    padding-bottom:150px;
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
        gap: 0.5rem;
    }
`;

const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: bold;
    @media (max-width:450px) {
        font-size : 1.2rem;
    }
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
    height:100%;
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
    @media (max-width:450px) {
        padding:0.7rem 1rem;
    }
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
    gap: 0.8rem;
    padding: 1rem 0.7rem;
    background: #d3b790;
    font-weight: bold;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;

    @media (max-width: 1024px) {
        display: none;
    }    
`;

const ProductRow = styled.div`
    display: grid;
    grid-template-columns: 40px 60px 1.5fr 1fr 1fr 1fr 0.85fr 1fr 1fr;
    gap: 0.8rem;
    padding: 1rem 0.7rem;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;

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
    @media (max-width: 520px) {
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

const ButtonContainer = styled.div`
    display:flex;   
    align-items:right;
    margin:20px 0px;
    float:right;

`;
const EditButton = styled.div`
    background-color:#1cc88a;
    color:white;
    border-radius:5px;
    padding:8px 16px;
    &:hover{
        background-color:#19b47c;
    }
    margin-right:8px;
`
const DeleteButton = styled.div`
    background-color:#dc2e1c;
    color:white;
    border-radius:5px;
    padding:8px 16px;
    &:hover{
        background-color:#c62919; 
    }
`
