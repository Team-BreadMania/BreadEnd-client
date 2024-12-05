import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditProductPopup = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const productData = params.get('products');
        if (productData) {
            setProducts(JSON.parse(decodeURIComponent(productData)));
        }
    }, []);

    const handleSave = async () => {
        try {
            // Send updated product data to the API
            const updatePromises = products.map((product) =>
                axios.put(`https://breadend.shop/seller/update`, product, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                })
            );

            await Promise.all(updatePromises);

            alert('상품 정보가 성공적으로 업데이트되었습니다.');
            window.close(); // Close popup
        } catch (error) {
            console.error('Error updating products:', error);
            alert('상품 정보를 업데이트하는 데 실패했습니다.');
        }
    };

    const handleInputChange = (index, field, value) => {
        setProducts((prev) => prev.map((product, i) => (i === index ? { ...product, [field]: value } : product)));
    };

    return (
        <Container>
            <h2>상품 정보 수정</h2>
            {products.map((product, index) => (
                <ProductForm key={product.productid}>
                    <label>
                        상품명:
                        <input type="text" value={product.itemname} onChange={(e) => handleInputChange(index, 'itemname', e.target.value)} />
                    </label>
                    <label>
                        판매가:
                        <input type="number" value={product.price} onChange={(e) => handleInputChange(index, 'price', e.target.value)} />
                    </label>
                    <label>
                        카테고리:
                        <input type="text" value={product.itemtype} onChange={(e) => handleInputChange(index, 'itemtype', e.target.value)} />
                    </label>
                    <label>
                        재고:
                        <input type="text" value={product.count} onChange={(e) => handleInputChange(index, 'count', e.target.value)} />
                    </label>
                    <label>
                        상세정보:
                        <input type="text" value={product.info} onChange={(e) => handleInputChange(index, 'info', e.target.value)} />
                    </label>
                </ProductForm>
            ))}
            <SaveButton onClick={handleSave}>저장</SaveButton>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    background-color: #fff;
`;

const ProductForm = styled.div`
    margin-bottom: 10px;
    label {
        display: block;
        margin-bottom: 5px;
    }
    input {
        width: 100%;
        padding: 5px;
        margin-bottom: 10px;
    }
`;

const SaveButton = styled.button`
    background-color: #1cc88a;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #19b47c;
    }
`;

export default EditProductPopup;
