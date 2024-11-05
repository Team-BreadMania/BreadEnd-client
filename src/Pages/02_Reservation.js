import React, { useState } from 'react';
import styled from 'styled-components';
import bread_img from '../Images/bread_img.png';
import choc_img from '../Images/chocosora.jpg';

export default function Reservation() {
    const [quantity, setQuantity] = useState(1);
    const [priceUnit, setPriceUnit] = useState(0)
    const totalPrice = quantity ? Number(quantity) * priceUnit : 0;

    return (
        <Container>
            <NameContainer>찜 한 제품</NameContainer>
            <Table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>총 가격</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ReservImage backgroundImage={bread_img} />
                        </td>
                        <td>JMT 생크림 소금빵</td>
                        <td>{priceUnit}원</td>
                        <td>
                            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                <option value='1'>1개</option>
                                <option value='2'>2개</option>
                                <option value='3'>3개</option>
                                <option value='4'>4개</option>
                                <option value='5'>5개</option>
                            </select>
                        </td>
                        <td>{totalPrice}원</td>
                    </tr>
                    <tr>
                        <td>
                            <ReservImage backgroundImage={choc_img} />
                        </td>
                        <td>초코소라빵</td>
                        <td>1500원</td>
                        <td>
                            <select>
                                <option value='1'>1개</option>
                                <option value='2'>2개</option>
                                <option value='3'>3개</option>
                                <option value='4'>4개</option>
                                <option value='5'>5개</option>
                            </select>
                        </td>
                        <td>1500원</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px; // Add padding for better spacing
    box-sizing: border-box; // Ensure padding is included in width
`;

const NameContainer = styled.div`
    text-align: left;
    border-bottom: 1px solid #bdbdbd;
    margin-bottom: 20px;
    font-size: 20px;
    @media(max-width: 1200px){
        font-size:16px;
    };
    @media (max-width:1000px) {
        font-size:14px;
    }
    @media (max-width:800px) {
        font-size:12px;
    }
    @media (max-width:400px) {
        font-size:10px;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        text-align: center;
        padding: 10px;
        border: 1px solid #bdbdbd; 
    }

    // Responsive styles
    @media (max-width: 768px) {
        th, td {
            font-size: 0.9em; // Decrease font size on smaller screens
        }
    }

    @media (max-width: 480px) {
        th, td {
            font-size: 0.8em; // Further decrease font size on very small screens
        }

        td {
            display: block; // Stack table cells vertically
            width: 100%; // Full width for each cell
            box-sizing: border-box; // Include padding in width
        }

        tr {
            display: flex;
            flex-direction: column; // Stack rows vertically
            margin-bottom: 10px; // Add space between rows
        }
    }
`;

const ReservImage = styled.div`
    width: 15vw;
    height: 15vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    margin-right: 20px;

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
