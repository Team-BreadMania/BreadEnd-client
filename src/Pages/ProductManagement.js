/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditProductPopup from '../Components/EditProductPopup';

export default function ProductManagement() {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/ProductRegistration');
    };
    const [isMobile, setIsMobile] = useState(false);

    const accessToken = Cookies.get('accessToken');
    const [waitProducts, setWaitProducts] = useState([]);
    const [sellProducts, setSellProducts] = useState([]);
    const [ongoingProducts, setOngoinProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const waitProductLength = waitProducts.length;
    const ongoingProductsLength = ongoingProducts.length;
    const sellProductLenght = sellProducts.length;
    const [activeTab, setActiveTab] = useState('all');

    const filteredWaitProducts = activeTab === 'all' || activeTab === 'wait' ? waitProducts : [];
    const filteredOngoingProducts = activeTab === 'all' || activeTab === 'ongoing' ? ongoingProducts : [];
    const filteredSellProducts = activeTab === 'all' || activeTab === 'sell' ? sellProducts : [];

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
            // 현재 보여지는 모든 제품의 ID와 연관된 주문 ID 선택
            const allProductIds = [...waitProducts.map((p) => p.productid), ...ongoingProducts.flatMap((p) => [p.productid, p.orderid]), ...sellProducts.flatMap((p) => [p.productid, p.orderid])];
            // 중복 제거
            const uniqueSelectedProducts = [...new Set(allProductIds)];
            setSelectedProducts(uniqueSelectedProducts);
        } else {
            // 모든 선택 해제
            setSelectedProducts([]);
        }
    };

    // 전체 선택 상태 확인 함수
    const isAllSelected = () => {
        // 모든 제품의 ID와 관련 주문 ID 배열 생성
        const allProductAndOrderIds = [...waitProducts.map((p) => p.productid), ...ongoingProducts.flatMap((p) => [p.productid, p.orderid]), ...sellProducts.flatMap((p) => [p.productid, p.orderid])];

        // 모든 ID가 선택되었는지 확인
        return allProductAndOrderIds.every((id) => selectedProducts.includes(id));
    };

    // 개별 상품 선택/해제 핸들러
    const handleProductSelect = (productId, orderid = null) => {
        setSelectedProducts((prev) => {
            // 제품 ID가 이미 선택되어 있는지 확인
            const isProductSelected = prev.includes(productId);

            // 주문 ID가 있는 경우 (판매예약, 판매완료 상품)
            if (orderid) {
                if (isProductSelected) {
                    // 제품 ID와 주문 ID 모두 제거
                    return prev.filter((id) => id !== productId && id !== orderid);
                } else {
                    // 제품 ID와 주문 ID 모두 추가
                    return [...prev, productId, orderid];
                }
            } else {
                // 일반 상품 (판매중)의 경우 기존 로직 유지
                return isProductSelected ? prev.filter((id) => id !== productId) : [...prev, productId];
            }
        });
    };
    //판매 대기중인 제품 정보 제공
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
    //판매 완료된 제품 정보 제공
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
    //구매 예약중인 제품 정보 제공
    const fetchOngoingItem = async () => {
        try {
            const response = await axios.get(`https://breadend.shop/seller/show/ongoing`, {
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
    //상품 정보 수정 기능
    const handleUpdateProducts = async () => {
        if (selectedProducts.length === 0) {
            alert('수정할 상품을 선택해 주세요.');
            return;
        }
        const selectedProductsData = waitProducts.concat(ongoingProducts, sellProducts).filter((product) => selectedProducts.includes(product.productid));

        const productDataString = encodeURIComponent(JSON.stringify(selectedProductsData));

        // Open the popup
        window.open(`/EditProductPopup?products=${productDataString}`, '상품 정보 수정', 'width=600,height=400,scrollbars=yes');
    };

    // 상품 삭제 핸들러
    const handleDeleteProducts = async () => {
        try {
            // 선택된 각 상품에 대해 삭제 요청
            const deletePromises = selectedProducts.map((productId) =>
                axios.put(`https://breadend.shop/seller/delete?productid=${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            );

            await Promise.all(deletePromises);

            // 삭제 후 상품 목록 새로고침
            await Promise.all([fetchwaitItem(), fetchsellItem(), fetchOngoingItem()]);

            // 선택 상태 초기화
            setSelectedProducts([]);

            alert('선택한 상품들이 삭제되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error('상품 삭제 중 오류:', error);
            alert('상품 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleSellProducts = async () => {
        try {
            // Filter out only order IDs for products in ongoing or reserved state
            const orderIds = selectedProducts.filter((id) => ongoingProducts.some((product) => product.orderid === id));

            if (orderIds.length === 0) {
                alert('판매 완료할 상품을 선택해주세요.');
                return;
            }

            // Create promises for each order confirmation
            const sellPromises = orderIds.map((orderid) =>
                axios.put(
                    `https://breadend.shop/seller/confirm?orderid=${orderid}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
            );

            // Wait for all sell confirmations to complete
            await Promise.all(sellPromises);

            // Refresh product lists after selling
            await Promise.all([fetchwaitItem(), fetchsellItem(), fetchOngoingItem()]);

            // Clear selected products
            setSelectedProducts([]);

            await Swal.fire({
                icon: 'success',
                title: '판매 완료',
                text: '선택한 상품들의 판매가 완료되었습니다.',
            });
        } catch (error) {
            console.error('상품 판매 중 오류:', error);
            await Swal.fire({
                icon: 'error',
                title: '판매 실패',
                text: '상품 판매에 실패했습니다. 다시 시도해주세요.',
            });
        } 
    };
    const handleReservCancleProducts = async () => {
        try {
            // Filter out only order IDs for products in ongoing or reserved state
            const orderIds = selectedProducts.filter((id) => ongoingProducts.some((product) => product.orderid === id));

            if (orderIds.length === 0) {
                alert('예약 취소할 상품을 선택해주세요.');
                return;
            }

            // Create promises for each order confirmation
            const sellPromises = orderIds.map((orderid) =>
                axios.put(
                    `https://breadend.shop/seller/cancel?orderid=${orderid}`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
            );

            // Wait for all sell confirmations to complete
            await Promise.all(sellPromises);

            // Refresh product lists after selling
            await Promise.all([fetchwaitItem(), fetchsellItem(), fetchOngoingItem()]);

            // Clear selected products
            setSelectedProducts([]);

            alert('선택한 상품의 예약이 취소되었습니다.');
        } catch (error) {
            console.error('예약 취소 중 오류:', error);
            alert('예약 취소에 실패했습니다. 다시 시도해주세요.');
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
                        <StatBox onClick={() => setActiveTab('all')} active={activeTab === 'all'}>
                            <StatLabel>전체</StatLabel>
                            <StatValue>{waitProductLength + sellProductLenght + ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox onClick={() => setActiveTab('wait')} active={activeTab === 'wait'}>
                            <StatLabel>판매중</StatLabel>
                            <StatValue>{waitProductLength}</StatValue>
                        </StatBox>
                        <StatBox onClick={() => setActiveTab('ongoing')} active={activeTab === 'ongoing'}>
                            <StatLabel>판매예약</StatLabel>
                            <StatValue>{ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox onClick={() => setActiveTab('sell')} active={activeTab === 'sell'}>
                            <StatLabel>판매완료</StatLabel>
                            <StatValue>{sellProductLenght}</StatValue>
                        </StatBox>
                    </StatsContainer>

                    <ProductGrid>
                        <ProductHeader>
                            <input type="checkbox" checked={isAllSelected()} onChange={handleSelectAll} /> <div>No</div>
                            <div>상품명</div>
                            <div>판매가</div>
                            <div>카테고리</div>
                            <div>상태</div>
                            <div>수량</div>
                            <div>등록일</div>
                            <div>수정일</div>
                        </ProductHeader>
                        {/*판매중*/}
                        {filteredWaitProducts.map((product) => (
                            <ProductRow key={product.productid}>
                                <input
                                    type="checkbox"
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid)}
                                    onChange={() => handleProductSelect(product.productid)}
                                    styled={{ margin: '0px' }}
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
                                <ProductCell label="수량">{product.count}</ProductCell>
                                <ProductCell label="제조일자">{product.makedate}</ProductCell>
                                <ProductCell label="판매시간">{product.expireddate}</ProductCell>
                            </ProductRow>
                        ))}
                    </ProductGrid>
                    {/*판매예약*/}
                    <ProductGrid>
                        {filteredOngoingProducts.map((product) => (
                            <ProductRow key={product.productid}>
                                <input
                                    type="checkbox"
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid) && selectedProducts.includes(product.orderid)}
                                    onChange={() => handleProductSelect(product.productid, product.orderid)}
                                    styled={{ margin: '0px' }}
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
                                <ProductCell label="상태">판매예약</ProductCell>
                                <ProductCell label="수량">{product.count}</ProductCell>
                                <ProductCell label="제조일자">{product.makedate}</ProductCell>
                                <ProductCell label="판매시간">{product.expireddate}</ProductCell>
                            </ProductRow>
                        ))}
                    </ProductGrid>
                    {/*판매완료*/}
                    <ProductGrid>
                        {filteredSellProducts.map((product) => (
                            <ProductRow key={product.productid}>
                                <input
                                    type="checkbox"
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid) && selectedProducts.includes(product.orderid)}
                                    onChange={() => handleProductSelect(product.productid, product.orderid)}
                                    styled={{ margin: '0px' }}
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
                                <ProductCell label="상태">판매완료</ProductCell>
                                <ProductCell label="수량">{product.count}</ProductCell>
                                <ProductCell label="제조일자">{product.makedate}</ProductCell>
                                <ProductCell label="판매시간">{product.expireddate}</ProductCell>
                            </ProductRow>
                        ))}
                    </ProductGrid>
                    <ButtonContainer>
                        <ReservCancleButton onClick={handleReservCancleProducts}>예약취소</ReservCancleButton>
                        <SellButton onClick={handleSellProducts}>판매완료</SellButton>
                        <EditButton onClick={handleUpdateProducts}>수정</EditButton>
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
                        <AddButton onClick={handleSubmit}>상품추가</AddButton>
                    </HeaderContent>
                </Header>

                <MainContent>
                    <StatsContainer>
                        <StatBox onClick={() => setActiveTab('all')} active={activeTab === 'all'}>
                            <StatLabel>전체</StatLabel>
                            <StatValue>{waitProductLength + sellProductLenght + ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox onClick={() => setActiveTab('wait')} active={activeTab === 'wait'}>
                            <StatLabel>판매중</StatLabel>
                            <StatValue>{waitProductLength}</StatValue>
                        </StatBox>
                        <StatBox onClick={() => setActiveTab('ongoing')} active={activeTab === 'ongoing'}>
                            <StatLabel>판매예약</StatLabel>
                            <StatValue>{ongoingProductsLength}</StatValue>
                        </StatBox>
                        <StatBox onClick={() => setActiveTab('sell')} active={activeTab === 'sell'}>
                            <StatLabel>판매완료</StatLabel>
                            <StatValue>{sellProductLenght}</StatValue>
                        </StatBox>
                    </StatsContainer>

                    <ProductGrid>
                        <MobileHeader>
                            <div style={{ marginRight: '6px' }}>
                                <input type="checkbox" checked={isAllSelected()} onChange={handleSelectAll} />
                            </div>
                            <SelectAllDiv>전체선택</SelectAllDiv>
                        </MobileHeader>
                        {/*판매중*/}
                        {filteredWaitProducts.map((product) => (
                            <MobileProduct key={product.productid}>
                                <input
                                    type="checkbox"
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid)}
                                    onChange={() => handleProductSelect(product.productid)}
                                    styled={{ margin: '0px' }}
                                />{' '}
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
                        {/*판매예약*/}
                        {filteredOngoingProducts.map((product) => (
                            <MobileProduct key={product.productid}>
                                <input
                                    type="checkbox"
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid) && selectedProducts.includes(product.orderid)}
                                    onChange={() => handleProductSelect(product.productid, product.orderid)}
                                    styled={{ margin: '0px' }}
                                />
                                <MobileDiv>{product.productid}</MobileDiv>
                                <MobileImg src={product.imgpaths[0]} />
                                <MobileInfoContainer>
                                    <MobileDiv>{product.itemname}</MobileDiv>
                                    <MobileDiv>{product.price}</MobileDiv>
                                </MobileInfoContainer>
                                <MobileDiv>판매예약</MobileDiv>
                                <MobileDiv>{product.count}</MobileDiv>
                            </MobileProduct>
                        ))}
                        {/*판매완료*/}
                        {filteredSellProducts.map((product) => (
                            <MobileProduct key={product.productid}>
                                <input
                                    type="checkbox"
                                    value={product.productid}
                                    checked={selectedProducts.includes(product.productid) && selectedProducts.includes(product.orderid)}
                                    onChange={() => handleProductSelect(product.productid, product.orderid)}
                                    styled={{ margin: '0px' }}
                                />
                                <MobileDiv>{product.productid}</MobileDiv>
                                <MobileImg src={product.imgpaths[0]} />
                                <MobileInfoContainer>
                                    <MobileDiv>{product.itemname}</MobileDiv>
                                    <MobileDiv>{product.price}</MobileDiv>
                                </MobileInfoContainer>
                                <MobileDiv>판매완료</MobileDiv>
                                <MobileDiv>{product.count}</MobileDiv>
                            </MobileProduct>
                        ))}
                    </ProductGrid>
                    <ButtonContainer>
                        <ReservCancleButton onClick={handleReservCancleProducts}>예약취소</ReservCancleButton>
                        <SellButton onClick={handleSellProducts}>판매완료</SellButton>
                        <EditButton onClick={handleUpdateProducts}>수정</EditButton>
                        <DeleteButton onClick={handleDeleteProducts}>삭제</DeleteButton>
                    </ButtonContainer>
                </MainContent>
            </Container>
        );
    };
    return <div style={{ width: '100%' }}>{isMobile ? <MobileView /> : <PCView />}</div>;
}
const Container = styled.div`
    min-height: 100vh;
    background-color: #f0e9dd;
    height: 100%;
    padding-bottom: 150px;
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
    @media (max-width: 450px) {
        font-size: 1.2rem;
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
    height: 100%;
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.6rem;
    }

    /* @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap:0.6rem;
    } */
`;

const StatBox = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    background-color: ${(props) => (props.active ? '#D3B790' : 'white')};
    color: ${(props) => (props.active ? 'white' : 'black')};

    &:hover {
        background-color: ${(props) => (props.active ? '#D3B790' : '#f0f0f0')};
    }
    @media (max-width: 450px) {
        padding: 0.7rem 1rem;
    }
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: #6b7280;
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const StatValue = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }
`;

const ProductGrid = styled.div`
    background: white;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProductHeader = styled.div`
    display: grid;
    grid-template-columns: 40px 60px 1.6fr 1fr 1fr 1fr 0.85fr 1fr 1.2fr;
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
    grid-template-columns: 40px 60px 1.6fr 1fr 1fr 1fr 0.85fr 1fr 1.2fr;
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
    @media (max-width: 520px) {
        font-size: 15px;
    }

    @media (max-width: 400px) {
        font-size: 13px;
    }
    @media (max-width: 400px) {
        font-size: 11px;
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
    @media screen {
    }
`;

const MobileInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const SelectAllDiv = styled.div`
    font-size: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: right;
    margin: 20px 0px;
    float: right;
`;
const EditButton = styled.div`
    background-color: #1cc88a;
    color: white;
    border-radius: 5px;
    padding: 8px 16px;
    &:hover {
        background-color: #19b47c;
    }
    margin: 0 8px;
    @media (max-width: 400px) {
        font-size: 15px;
    }
    @media (max-width: 350px) {
        font-size: 13px;
    }
`;
const DeleteButton = styled.div`
    background-color: #dc2e1c;
    color: white;
    border-radius: 5px;
    padding: 8px 16px;
    &:hover {
        background-color: #c62919;
    }
    @media (max-width: 400px) {
        font-size: 15px;
    }
    @media (max-width: 365px) {
        font-size: 13px;
    }
`;
const SellButton = styled.div`
    background-color: #c6855b;
    color: white;
    border-radius: 5px;
    padding: 8px 16px;
    margin-left: 8px;
    &:hover {
        background-color: #b16b3d;
    }
    @media (max-width: 400px) {
        font-size: 15px;
    }
    @media (max-width: 350px) {
        font-size: 13px;
    }
`;
const ReservCancleButton = styled.div`
    background-color: #c6855b;
    color: white;
    border-radius: 5px;
    padding: 8px 16px;
    &:hover {
        background-color: #b16b3d;
    }
    @media (max-width: 400px) {
        font-size: 15px;
    }
    @media (max-width: 350px) {
        font-size: 13px;
    }
`;
