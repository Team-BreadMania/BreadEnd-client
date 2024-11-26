import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Temp() {
    const accessToken = Cookies.get('accessToken');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (accessToken) {
            fetchUserData(accessToken);
        }
    }, [accessToken]); // accessToken이 변경될 때마다 사용자 데이터를 가져옴

    const fetchUserData = async (accessToken) => {
        try {
            const response = await axios.get('https://breadend.shop/seller/show/wait', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 포함
                },
            });

            if (response.status === 200) {
                console.log('유저정보 불러오기 성공:', response.data);
                const transformedProducts = response.data.map((product) => ({
                    img: product.imgpaths[0], // 첫 번째 이미지 경로 사용
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
        } catch (error) {
            console.log(error.response);
        }
    };
    return (
        <div>
            <h1>상품 목록</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <img src={product.img} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>카테고리: {product.category}</p>
                        <p>가격: {product.price}원</p>
                        <p>상태: {product.status}</p>
                        <p>수량: {product.count}</p>
                        <p>등록일: {product.createdAt}</p>
                        <p>만료일: {product.saleAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
