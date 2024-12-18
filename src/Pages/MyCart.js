import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "../Fonts/font.css";
import X_icon from "../Images/X_icon.png";
import trachcan_icon from "../Images/trashcan_icon.png";
import { CartContext } from '../CartContext'; 

export default function MyCart() {

    const navigate = useNavigate(); 
    const { cartItems, setCartItems } = useContext(CartContext); // 장바구니 항목 상태
    const [totalPrice, setTotalPrice] = useState(0); // 전체 금액 상태
    const [selectedItems, setSelectedItems] = useState({}); // 선택된 상품 상태

    useEffect(() => {
        const fetchCartItems = async () => {
            const accessToken = Cookies.get("accessToken");
            
            try {
                const response = await axios.get('https://breadend.shop/cart/view', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setCartItems(response.data);
                localStorage.setItem('cartItems', JSON.stringify(response.data)); 
                console.log(response.data);

                const total = response.data.reduce((acc, item) => acc + item.product.price * item.product.count, 0);
                setTotalPrice(total);

                const initialSelectedItems = response.data.reduce((acc, item) => {
                    acc[item.cartid] = true;
                    return acc;
                }, {});
                setSelectedItems(initialSelectedItems);
            } catch (error) {
                console.error("장바구니 항목을 가져오는데 실패했습니다.", error);
                setCartItems([]);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    const handleProductClick = (productId) => { // 상품 상세페이지 이동 메서드
        navigate(`/ProductDetailPage?id=${productId}`);
    };

    const calculateSelectedTotal = () => { // 선택된 상품 가격 계산 메서드
        return cartItems.reduce((total, item) => {
            if (selectedItems[item.cartid]) {
                return total + item.product.price * item.product.count;
            }
            return total;
        }, 0);
    };

    const handleDelete = async (cartids) => { // 선택 상품 삭제 메서드
        const accessToken = Cookies.get("accessToken");
        
        try {
            console.log("Deleting products with IDs:", cartids);
            await axios.delete('https://breadend.shop/cart/delete', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                data: cartids, 
            });
    
            return true; 
        } catch (error) {
            console.error("상품 삭제에 실패했습니다.", error);
            return false; 
        }
    };
    
    const handleSingleDelete = async (cartid) => { // 개별삭제 메서드
        const result = await handleDelete([cartid]);
        if (result) {
            setCartItems(prevItems => {
                const updatedItems = prevItems.filter(item => item.cartid !== cartid);

                const updatedSelectedItems = { ...selectedItems };
                delete updatedSelectedItems[cartid]; 
                setSelectedItems(updatedSelectedItems);
    
                const updatedTotal = updatedItems.reduce((acc, item) => acc + item.product.price * item.product.count, 0);
                setTotalPrice(updatedTotal);
                localStorage.setItem('cartItems', JSON.stringify(updatedItems));
                
                return updatedItems; 
            });
        }
    };
    
    const handleBulkDelete = async () => { // 선택상품 일괄삭제 메서드
        const selectedCartIds = Object.keys(selectedItems).filter(cartid => selectedItems[cartid]);
        if (selectedCartIds.length > 0) {
            const result = await handleDelete(selectedCartIds);
            if (result) {
                setCartItems(prevItems => {
                    const updatedItems = prevItems.filter(item => !selectedCartIds.includes(item.cartid));
    
                    const updatedSelectedItems = { ...selectedItems };
                    selectedCartIds.forEach(cartid => delete updatedSelectedItems[cartid]); 
                    setSelectedItems(updatedSelectedItems);

                    const updatedTotal = updatedItems.reduce((acc, item) => acc + item.product.price * item.product.count, 0);
                    setTotalPrice(updatedTotal);
                    
                    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
                    return updatedItems; 
                });
            }
        } else {
            alert("삭제할 상품을 선택해 주세요.");
        }
    };    

    const handleOrderAll = async () => { // 전체 상품 주문 메서드
        const accessToken = Cookies.get("accessToken");
        
        const orderItems = cartItems.map(item => ({
            cartid: item.cartid, 
            productid: item.product.productid,
            count: item.product.count,
        }));
    
        try {
            await axios.post('https://breadend.shop/cart/addorder', orderItems, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            alert("전체 상품 주문이 완료되었습니다.");
            
            setCartItems([]);
            setTotalPrice(0); 
            localStorage.removeItem('cartItems');
        } catch (error) {
            console.error("전체 상품 주문에 실패했습니다.", error);
        }
    };
    
    const handleOrderSelected = async () => { // 선택된 상품 주문 메서드
        const accessToken = Cookies.get("accessToken");
        
        const orderItems = cartItems
            .filter(item => selectedItems[item.cartid])
            .map(item => ({
                cartid: item.cartid, 
                productid: item.product.productid,
                count: item.product.count,
            }));
    
        if (orderItems.length === 0) {
            alert("선택된 상품이 없습니다.");
            return;
        }
    
        try {
            await axios.post('https://breadend.shop/cart/addorder', orderItems, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            alert("선택된 상품 주문이 완료되었습니다.");
    
            setCartItems(prevItems => {
                const updatedItems = prevItems.filter(item => !selectedItems[item.cartid]);
                const updatedTotal = updatedItems.reduce((acc, item) => acc + item.product.price * item.product.count, 0);
                setTotalPrice(updatedTotal); 
                localStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("선택된 상품 주문에 실패했습니다.", error);
        }
    };          

    return (
        <Container>
            <MyCartContainer>
                <Title>장바구니 목록</Title>
                <MyCartBox>
                    {cartItems.length === 0 ? (
                        <NoProduct>장바구니에 담긴 상품이 없습니다.</NoProduct>
                    ) : (
                        cartItems.map((item) => (
                            <ProductContainer key = {item.cartid}>
                                <CheckBoxContainer>
                                    <CheckBox 
                                        checked = {selectedItems[item.cartid] || false} 
                                        onChange = {() => {
                                            setSelectedItems(prev => ({
                                                ...prev,
                                                [item.cartid]: !prev[item.cartid]
                                            }));
                                        }} 
                                    />
                                </CheckBoxContainer>
                                <ImageBox onClick = {() => handleProductClick(item.product.productid)}>
                                    {item.product && item.product.imgpaths && item.product.imgpaths.length > 0 ? (
                                        <ProductImage img = {item.product.imgpaths[0]} />
                                    ) : (
                                        <div>이미지 없음</div> 
                                    )}
                                </ImageBox>
                                <ProductInfoBox onClick = {() => handleProductClick(item.product.productid)}>
                                    <ProductName>
                                        {item.product && item.product.itemname ? item.product.itemname : "상품 이름이 없습니다."}
                                    </ProductName>
                                    <ShopName>
                                        {item.product && item.product.shopname ? item.product.shopname : "매장 이름이 없습니다."}
                                    </ShopName>
                                    <ProductQuantity>수량 : {item.product ? item.product.count : "정보 없음"}개</ProductQuantity>
                                    <ProductPrice>
                                        {item.product ? item.product.price.toLocaleString() : "가격 정보 없음"}원
                                    </ProductPrice>
                                </ProductInfoBox>
                                <DeleteBox>
                                    <DeleteIcon onClick = {(e) => { 
                                        e.stopPropagation(); 
                                        handleSingleDelete(item.cartid);
                                    }}/>
                                </DeleteBox>
                            </ProductContainer>
                        ))
                    )}
                </MyCartBox>
                <TrashBox onClick = {handleBulkDelete}>
                    <TrashIcon/>
                    <Text>선택상품 일괄삭제</Text>
                </TrashBox>
                <TotalPrice>
                    선택된 상품 금액 = {calculateSelectedTotal().toLocaleString()}원 / 전체 상품 금액 = {totalPrice.toLocaleString()}원
                </TotalPrice>
                <BuyBox>
                    <SelectedBuyButton onClick = {handleOrderSelected}>선택한 상품만 구매예약</SelectedBuyButton>
                    <TotalBuyButton onClick = {handleOrderAll}>전체 상품 구매예약</TotalBuyButton>
                </BuyBox>
            </MyCartContainer>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    justify-content: center;
    width: 100%;
`;

const MyCartContainer = styled.div` // 장바구니 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 2.5%;

    @media (max-width: 1300px) {
        width: 60%; 
    }

    @media (max-width: 1200px) {
        width: 65%; 
    }

    @media (max-width: 1100px) {
        width: 70%; 
    }

    @media (max-width: 1000px) {
        width: 80%; 
    }

    @media (max-width: 800px) {
        width: 90%; 
    }

    @media (max-width: 600px) {
        width: 95%; 
    }
`;

const Title = styled.div` // 제목
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    font-family: maple-font;
    text-align: center;

    @media (max-width: 600px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 500px) {
        font-size: 25px;
    }
`;

const MyCartBox = styled.div` // 장바구니 박스 
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    margin-top: 2.5%;
    padding-bottom: 2.5%;
    background-color: #F0E9DD;
`;

const ProductContainer = styled.div` // 상품 컨테이너
    display: flex;
    width: 95%;
    height: 150px;
    background-color: white;
    border-radius: 10px;
    margin: 2.5% 0 0 2.5%;
    cursor: pointer;

    @media (max-width: 600px) {
        height: 125px;
    }
`;

const CheckBoxContainer = styled.div` // 체크박스 컨테이너
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
    height: 100%;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })` // 체크박스
    width: 20px;
    height: 20px;

    &:hover {
        cursor: pointer; 
    }

    @media (max-width: 800px) {
        width: 17.5px;
        height: 17.5px;
    }
`;

const ImageBox = styled.div` // 상품 이미지 컨테이너
    display: flex;
    align-items: center;
    width: 25%;
    height: 100%;  
    margin: 0 2.5%;
`;

const ProductImage = styled.div` // 상품 이미지
    width: 100%;
    height: 90%;
    background-image: url(${props => props.img});
    background-size: cover;

    @media (max-width: 500px) {
        height: 80%;
    }

    @media (max-width: 400px) {
        height: 70%;
    }
`;

const ProductInfoBox = styled.div` // 상품 정보 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
`;

const ShopName = styled.div` // 매장 이름
    font-size: 15px;
    font-weight: bold;
    color: #787878;
    margin-bottom: 5%;

    @media (max-width: 600px) {
        font-size: 12.5px;
        margin-bottom: 7.5%;
    }

    @media (max-width: 500px) {
        margin-bottom: 10%;
    } 
`;  

const ProductName = styled.div` // 상품 이름
    font-size: 20px;
    font-weight: bold;
    margin-top: 5%;

    @media (max-width: 600px) {
        font-size: 15px;
    }

    @media (max-width: 500px) {
        margin-top: 7.5%;
    }
`;

const ProductQuantity = styled.div` // 상품 수량
    font-size: 15px;
    font-weight: bold;
    color: #787878;

    @media (max-width: 600px) {
        font-size: 12.5px;
    }
`;

const ProductPrice = styled.div` // 상품 가격
    font-size: 20px;
    font-weight: bold;
    color: black;

    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const DeleteBox = styled.div` // 삭제버튼 컨테이너
    display: flex;
    justify-content: right;
    margin: 10px 10px 0 0;
    width: 10%;
    height: 100%;
    margin-left: auto;
`; 

const DeleteIcon = styled.div` // 삭제버튼
    width: 42%;
    height: 20%;
    background-image: url(${X_icon});
    background-size: cover;

    &:hover {
        opacity: 0.5; 
        cursor: pointer; 
    }

    @media (max-width: 900px) {
        width: 45%;
        height: 19%;
    }

    @media (max-width: 800px) {
        width: 40%;
        height: 16.5%;
    }

    @media (max-width: 700px) {
        width: 42%;
        height: 15%;
    }

    @media (max-width: 600px) {
        width: 42%;
        height: 16%;
    }

    @media (max-width: 500px) {
        width: 55%;
        height: 16%;
    }

    @media (max-width: 400px) {
        width: 60%;
        height: 16%;
    }
`;

const TrashBox = styled.div` // 선택상품 삭제버튼 컨테이너
    display: flex;
    width: 20%;
    height: 30px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 25px 0 25px auto;

    &:hover {
        cursor: pointer; 
    }

    @media (max-width: 750px) {
        width: 25%;
        margin: 20px 0 20px auto;
    }

    @media (max-width: 550px) {
        width: 30%;
        margin: 15px 0 15px auto;
    }

    @media (max-width: 500px) {
        width: 35%;
        margin: 10px 0 10px auto;
    }

    @media (max-width: 400px) {
        width: 40%;
    }
`;

const TrashIcon = styled.div` // 쓰레기통 아이콘
    width: 20%;
    height: 100%;
    background-image: url(${trachcan_icon});
    background-size: cover;
`;

const Text = styled.div` // 텍스트
    font-size: 13px;
    font-weight: bold;
    line-height: 30px;

    @media (max-width: 900px) {
        font-size: 12px;
    }
`; 

const TotalPrice = styled.div` // 전체 상품 가격
    width: 100%;
    height: 50px;
    border: 1px solid black;
    border-radius: 15px;
    font-size: 15px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;

    @media (max-width: 500px) {
        font-size: 13px;
    }
`;

const BuyBox = styled.div` // 구매버튼 컨테이너
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    line-height: 100px;
    margin-top: 30px;
    margin-bottom: 100px; 

    @media (max-width: 750px) {
        height: 80px;
        line-height: 80px;
        margin-top: 20px;
        font-size: 20px;
    }

    @media (max-width: 550px) {
        height: 70px;
        line-height: 70px;
        margin-top: 15px;
        font-size: 15px;
    }

    @media (max-width: 500px) {
        height: 60px;
        line-height: 60px;
        margin-top: 10px;
    }
`;

const TotalBuyButton = styled.div` // 전체상품 구매버튼
    width: 47.5%;
    height: 100%;
    color: white;
    background-color: #A46E2C;
    border-radius: 15px;

    &:hover {
        opacity: 0.9;
        cursor: pointer; 
    }

    @media (max-width: 550px) {
        width: 49%;
        border-radius: 10px;
    }
`;

const SelectedBuyButton = styled.div` // 선택된 상품 구매버튼
    width: 47.5%;
    height: 100%;
    color: white;
    background-color: #D1A064;
    border-radius: 15px;

    &:hover {
        opacity: 0.9;
        cursor: pointer; 
    }

    @media (max-width: 550px) {
        width: 49%;
        border-radius: 10px;
    }
`;

const NoProduct = styled.div` // 대체 메세지
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    font-family: maple-font;
    width: 100%;
    height: 100px;
    margin-top: 2.5%;
    color: #C17E4E;
`;