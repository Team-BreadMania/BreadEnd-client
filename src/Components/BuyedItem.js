import React, { useState } from 'react';
import styled from 'styled-components';
import bread_img from '../Images/bread_img.png';
import choc_img from '../Images/chocosora.jpg';

export default function Item() {
    const [quantity, setQuantity] = useState(null);
    const [priceUnit, setPriceUnit] = useState(null);
    const totalPrice = quantity ? Number(quantity) * priceUnit : 0;
    const [buyedItem, setBuyedItem] = useState([]);

    return <Container>구매한 제품 페이지</Container>;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReservImage = styled.div`
    width: 17vw;
    height: 17vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: center;
    text-align: center;
    @media (max-width: 768px) {
        width: 30vw;
        height: 30vw;
    }

    @media (max-width: 480px) {
        width: 80vw;
        height: 80vw;
        margin: 0 auto;
    }
`;
