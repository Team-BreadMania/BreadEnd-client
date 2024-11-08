import React, { useState } from 'react';
import styled from 'styled-components';

export default function Item() {
    const [quantity, setQuantity] = useState(1);
    const priceUnit = 2000;
    const totalPrice = quantity?Number(quantity)*priceUnit:0;
    return <Container>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>총 가격</th>
                    </tr>
                </thead>
                <tr>
                    <th>이미지</th>
                    <th>빵이름</th>
                    <th>{priceUnit}</th>
                    <th>
                    <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <option value=''>수량 선택</option>
                    <option value='1'>1개</option>
                    <option value='2'>2개</option>
                    <option value='3'>3개</option>
                    <option value='4'>4개</option>
                    <option value='5'>5개</option>
                </select>
                    </th>
                    <th>{totalPrice}원</th>
                </tr>
            </table>
        </Container>;
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
`;