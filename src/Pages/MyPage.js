import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import Account from '../Components/Account';
import Reservation from '../Components/Reservation';
import Item from '../Components/BuyedItem';
import Review from '../Components/Review';
import Inquiry from '../Components/Inquiry';
import MenuIcon from '../Images/menu_icon1.jpg';
import SellerHome from './Home_seller';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

export default function MyPageBuyer() {
    const { userAuth, setUserAuth } = useContext(AuthContext);
    const [menuVisible, setMenuVisible] = useState(false);

    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        const userType = Cookies.get('userType');
        setUserAuth(userType);
    }, [setUserAuth]);

    const MenuToggle = (e) => {
        e.stopPropagation();
        setMenuVisible(!menuVisible);
    };

    const buyerMenuItems = [
        { tab: 'Account', text: '회원 정보' },
        { tab: 'Reservation', text: '찜 한 매장' },
        { tab: 'Item', text: '구매 내역' },
        { tab: 'Review', text: '리뷰관리' },
        { tab: 'Inquiry', text: '문의내역', protected: true },
    ];

    const renderInformationContainer = () => {
        if (userAuth === 'buyer') {
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
                default:
                    return <Account />;
            }
        } else if (userAuth === 'seller') {
            switch (activeTab) {
                default:
                    return <SellerHome />;
            }
        }
    };

    const [activeTab, setActiveTab] = useState('Account');

    const Buyer = () => {
        return (
            <Container onClick={() => setMenuVisible(false)}>
                <MobileNav isVisible={menuVisible}>
                    <MobileMenuContent>
                        <MypageContainer onClick={() => setActiveTab('Account')} isSelected={activeTab === 'Account'}>
                            마이페이지
                        </MypageContainer>
                        {buyerMenuItems.map((item, index) => (
                            <LinkContainer
                                key={index}
                                onClick={() => {
                                    setActiveTab(item.tab);
                                    setMenuVisible(false);
                                }}
                                isSelected={activeTab === item.tab}
                            >
                                {item.text}
                            </LinkContainer>
                        ))}
                    </MobileMenuContent>
                </MobileNav>
                <LeftContainer>
                    <ImformationContainer>
                        <MypageContainer onClick={() => setActiveTab('Account')} isSelected={activeTab === 'Account'}>
                            마이페이지
                        </MypageContainer>
                        {buyerMenuItems.map((item, index) => (
                            <LinkContainer key={index} onClick={() => setActiveTab(item.tab)} isSelected={activeTab === item.tab}>
                                {item.text}
                            </LinkContainer>
                        ))}
                    </ImformationContainer>
                </LeftContainer>
                <RightContainer>
                    <MenuBox onClick={MenuToggle}>
                        <MenuButton src={MenuIcon} />
                        <MenuTitle>{buyerMenuItems.find((item) => item.tab === activeTab)?.text || '마이페이지'}</MenuTitle>
                    </MenuBox>
                    <ToolContainer>{renderInformationContainer()}</ToolContainer>
                </RightContainer>
            </Container>
        );
    };
    const Seller = () => {
        return (
            <Container>
                <ToolContainer>{renderInformationContainer()}</ToolContainer>
            </Container>
        );
    };
    return <>{userAuth === 'buyer' ? <Buyer /> : <Seller />}</>;
}

const Container = styled.div`
    display: flex;
    border-radius: 5px;
    max-width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
`;

const MobileNav = styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;

    @media (max-width: 800px) {
        display: ${(props) => (props.isVisible ? 'block' : 'none')};
    }
`;

const MobileMenuContent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;

const LeftContainer = styled.div`
    box-sizing: border-box;
    min-width: 15%;
    font-size: 30px;
    padding: 3% 0 0 3%;
    border-right: 2px solid black;
    text-align: left;
    @media (max-width: 1500px) {
        font-size: 28px;
        min-width: 17%;
    }
    @media (max-width: 1250px) {
        font-size: 25px;
        min-width: 17%;
    }
    @media (max-width: 1000px) {
        font-size: 22px;
        padding-left: 2.5%;
        min-width: 24%;
    }
    @media (max-width: 800px) {
        display: none; // 모바일에서 숨김
    }
`;

const RightContainer = styled.div`
    min-width: 85%;
    padding: 4% 3% 0 3%;
    box-sizing: border-box;
    background-color: #f0e9dd;

    @media (max-width: 800px) {
        width: 100%;
        padding: 20px;
    }
`;

const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;

const MypageContainer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
    cursor: pointer;

    @media (max-width: 800px) {
        margin-bottom: 12px;
        font-size: 24px;
    }
`;

const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    font-size: 26px;
    margin-bottom: 15px;
    color: ${(props) => (props.isSelected ? '#white' : '#adb5bd')};
    cursor: pointer;

    &:hover {
        background-color: #f3f5f6;
    }

    @media (max-width: 2560px) {
        font-size: 24px;
    }
    @media (max-width: 1920px) {
        font-size: 22px;
    }
    @media (max-width: 1280px) {
        font-size: 20px;
    }
    @media (max-width: 800px) {
        font-size: 18px;
        padding: 10px 0;
    }
`;

const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 2;
    width: 100%;
    border-radius: 10px;
    background-color: white;
    padding: 3%;
    box-sizing: border-box;
    @media (max-width: 850px) {
        font-size: 16px;
        padding: 2%;
    }
    @media (max-width: 420px) {
        font-size: 14px;
        padding: 1%;
    }
`;

const MenuBox = styled.div`
    display: none;
    cursor: pointer;
    padding: 10px 0;
    align-items: center;

    @media (max-width: 800px) {
        display: flex;
    }
`;

const MenuButton = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    background-color: none;
`;

const MenuTitle = styled.div`
    font-weight: bold;
    font-size: 20px;
`;
