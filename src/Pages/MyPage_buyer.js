import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Avata from '../Images/Generic_avatar.png';
import Favorite from '../Images/favorite.png';
import Account from './02_Account';
import Reservation from './02_Reservation';
import Item from './02_Item';
import Review from './02_Review';
import Inquiry from './02_Inquiry';
import Location from './02_Location';

export default function MyPage_buyer() {
    const renderInformationContainer = () => {
        switch (activeTab) {
            case 'Account':
                return <Account />;
            case 'Reservation':
                return <Reservation />;
            case 'Item':
                return <Item />;
            case 'Review':
                return <Review />;
            case 'Inquiry':
                return <Inquiry />;
            case 'Location':
                return <Location />;
            default:
                return <Account />;
        }
    };
    const [activeTab, setActiveTab] = useState('Account');
    return (
        //구매자 마이페이지
        <Container>
            <LeftContainer>
                <ImformationContainer>
                    <MypageContaer>
                        <a href="/MyPage_buyer" style={{ textDecoration: 'none', color: 'black' }}>
                            마이페이지
                        </a>
                    </MypageContaer>
                    <LinkContainer onClick={() => setActiveTab('Account')} isSelected={activeTab === 'Account'}>
                        내 계정 정보
                    </LinkContainer>
                    <LinkContainer onClick={() => setActiveTab('Reservation')} isSelected={activeTab === 'Reservation'}>
                        구매 예약 제품
                    </LinkContainer>
                    <LinkContainer onClick={() => setActiveTab('Item')} isSelected={activeTab === 'Item'}>
                        구매한 제품
                    </LinkContainer>
                    <LinkContainer onClick={() => setActiveTab('Review')} isSelected={activeTab === 'Review'}>
                        리뷰 관리
                    </LinkContainer>
                    <LinkContainer onClick={() => setActiveTab('Location')} isSelected={activeTab === 'Location'}>
                        내 지역 관리
                    </LinkContainer>
                    <LinkContainer onClick={() => setActiveTab('Inquiry')} isSelected={activeTab === 'Inquiry'}>
                        내 문의 내역
                    </LinkContainer>
                </ImformationContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <UserNameContainer>이름</UserNameContainer>
                </UserContainer>
                <ToolContainer>{renderInformationContainer()}</ToolContainer>
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    border-radius: 5px;
    max-width: 100%;
    padding: 0 10%;
    height: auto;
`;
const LeftContainer = styled.div`
    min-width: 19%;
    font-size: 1.875rem;
    padding-top: 3%;
    margin-right: 20px;
    padding-left: 20px;
    border-right: 2px solid black;
`;

const MypageContaer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
`;

const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    color: black;
    font-size: 1.875rem;
    margin-bottom: 15px;
    background-color: ${(props) => (props.isSelected ? '#adb5bd' : '#white')};
    cursor: pointer;
    &hover {
        background-color: #adb5bd;
    }
`;

const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;
const RightContainer = styled.div`
    min-width: 71%;
    padding-top: 3%;
    margin-left: 3%;
`;
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
`;
const UserNameContainer = styled.div`
    font-size: 2.1rem;
    margin-left: 30px;
`;
const UserImage = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
`;
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
