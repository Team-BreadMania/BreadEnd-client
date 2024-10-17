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
import edit_button from '../Images/edit_button.png'

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
    min-width: 100%;
    /* padding: 0 10%; */
    height: 100%;
`;
const LeftContainer = styled.div`
    min-width: 14%;
    font-size: 26px;
    padding : 4% 20px 0 5%;    
    border-right: 2px solid black;
    text-align:left;
    @media (max-width: 1500px) {
        font-size: 26px;
    }
    @media (max-width: 1250px) {
        font-size: 26px;
        width:24%;
    }
    @media (max-width: 850px) {
        font-size: 20px;
        /* margin-right: 10px; */
        min-width:25%;
        padding-right:10px;
    }
    @media (max-width: 400px) {
        font-size: 16px;
        min-width: 27%;
        padding-left:15px;
    }
    @media (max-width:350px){
        font-size: 16px;
        margin-right: 8px;
        min-width: 31%;
    }
`;
const RightContainer = styled.div`
    min-width: 70%;
    padding : 4% 5% 0 3%;
    background-color:#F4F6F8;
    @media (max-width: 850px) {
        min-width: 65%;
        padding : 4% 0% 0 3%;
    }
    @media (max-width: 400px) {
        min-width: 63%;
        padding : 4% 0% 0 3%;
    }
    @media (max-width:350px){
        min-width:59%;
        padding : 4% 0% 0 3%;
    }
`;
const MypageContainer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
    @media (max-width: 800px) {
        margin-bottom: 12px;
    }
    @media (max-width: 400px) {
        margin-bottom: 9px;
    }
`;

const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    font-size: 26px;
    margin-bottom: 15px;
    color: ${(props) => (props.isSelected ? '#black' : '#b5b7ba')};
    cursor: pointer;
    &hover {
        background-color: #b5b7ba;
    }
    @media (max-width: 2560px) {
        font-size: 26px;
    }
    @media (max-width: 1920px) {
        font-size: 26px;
    }
    @media (max-width: 1280px) {
        font-size: 24px;
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
    padding:30px;
    margin-bottom: 30px;
    position:relative;
    background-color:white;
    border-radius:20px;
    width:85%;
    @media (max-width:850px){
        border-top: 0;
        border-right: 0;
        border-bottom: 0;
        border-left: 0;
        padding:10px;
        margin-bottom: 15px;
    }
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

const UserImage = styled.div`
    width: 17vw;
    height: 17vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 40px;
    @media(max-width:800px){
        margin-right:0px;
    }
`;

const UserInform = styled.div`
    display: flex;
    flex-direction: column;
`;
const EditButton = styled.div`    
    @media (max-width:850px){
        background-image:url(${edit_button});
        width:20px;
        height:20px;
        background-size:contain;
        position:absolute;
        bottom:0px;
        right:100px;
    }
`
const ToolContainer = styled.div`
    display: flex;
    align-items: center;
    padding:30px;
    margin-bottom: 30px;
    position:relative;
    background-color:white;
    border-radius:20px;
    font-size:25px;
    width:85%;
    @media (max-width:850px){
        border-top: 0;
        border-right: 0;
        border-bottom: 0;
        border-left: 0;
        padding:10px;
    }
`;
