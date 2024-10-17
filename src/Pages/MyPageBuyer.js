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

export default function MyPageBuyer() {
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
                    <MypageContainer>
                        <a href="/MyPageBuyer" style={{ textDecoration: 'none', color: 'black' }}>
                            마이페이지
                        </a>
                    </MypageContainer>
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
                    <UserInform>
                        <UserNameContainer>이름</UserNameContainer>
                        <UserEmail>이메일</UserEmail>
                    </UserInform>
                    {/* <EditButton/> */}
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
    height: 100%;
`;
const LeftContainer = styled.div`
    box-sizing: border-box;
    min-width: 19%;
    font-size: 30px;
    padding-top: 3%;
    padding-left: 3%;
    border-right: 2px solid black;
    @media (max-width: 1500px) {
        font-size: 28px;
    }
    @media (max-width: 1250px) {
        font-size: 25px;
    }
    @media (max-width: 1000px) {
        font-size: 23px;
        padding-left: 2.5%;
        min-width: 21%;
    }
    @media (max-width: 800px) {
        font-size: 20px;
        min-width: 20%;
    }
    @media (max-width: 600px) {
        font-size: 20px;
        min-width: 28%;
        padding-left: 2.5%;
    }
    @media (max-width: 400px) {
        font-size: 16px;
        min-width: 31%;
    }
    @media (max-width: 350px) {
        padding-left: 2%;
    }
`;

const RightContainer = styled.div`
    min-width: 81%;
    padding: 4% 0 0 3%;
    box-sizing: border-box;
    background-color: #f4f6f8;
    @media (max-width: 800px) {
        width: 95%;
        padding-top: 5%;
    }
    @media (max-width: 800px) {
        min-width: 63%;
    }
`;

const MypageContainer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
    @media (max-width: 800px) {
        margin-bottom: 18px;
    }
    @media (max-width: 800px) {
        margin-bottom: 15px;
    }
`;

const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    color: black;
    font-size: 30px;
    margin-bottom: 15px;
    color: ${(props) => (props.isSelected ? '#white' : '#adb5bd')};
    cursor: pointer;
    &hover {
        background-color: #adb5bd;
    }
    @media (max-width: 2560px) {
        font-size: 28px;
    }
    @media (max-width: 1920px) {
        font-size: 25px;
    }
    @media (max-width: 1280px) {
        font-size: 20px;
    }
    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 3%;
    margin-bottom: 30px;
    border-radius: 20px;
    width: 88%;
`;
const UserNameContainer = styled.div`
    font-size: 33px;
    margin-left: 30px;
    padding-bottom: 6px;
    @media (max-width: 800px) {
        font-size: 25px;
    }
    @media (max-width: 400px) {
        font-size: 18px;
    }
`;
const UserEmail = styled.div`
    font-size: 16px;
    margin-left: 40px;
    padding-bottom: 6px;
    @media (max-width: 800px) {
        font-size: 14px;
    }
    @media (max-width: 400px) {
        font-size: 12px;
    }
`;
const UserIntro = styled.div`
    font-size: 16px;
    margin-left: 40px;
    @media (max-width: 800px) {
        font-size: 14px;
    }
    @media (max-width: 400px) {
        font-size: 12px;
    }
`;
const UserImage = styled.div`
    width: 19vw;
    height: 19vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
    @media (max-width: 800px) {
        width: 17vw;
        height: 17vw;
        margin-right: 0px;
    }
`;
const UserInform = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 88%;
    border-radius: 20px;
    background-color: white;
    padding: 3%;
    @media (max-width: 800px) {
        font-size: 16px;
    }
    @media (max-width: 400px) {
        font-size: 14px;
    }
`;
