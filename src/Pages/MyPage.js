import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avata from '../Images/Generic_avatar.png';
import Account from '../Components/Account';
import Reservation from '../Components/Reservation';
import Item from '../Components/Item';
import Review from '../Components/Review';
import Inquiry from '../Components/Inquiry';
import Location from '../Components/Location';
import List_Pointer from '../Images/List_Pointers.jpg';
import Cross from '../Images/Cross.jpg';

export default function MyPageBuyer() {
    const [isMobile, setIsMobile] = useState(false);
    const [userLogin, setUserLogin] = useState(true);
    const [userAuth, setUserAuth] = useState('buyer');

    const buyerMenuItems = [
        { tab: 'Account', text: '내 계정 정보' },
        { tab: 'Reservation', text: '찜 한 매장' },
        { tab: 'Item', text: '구매 내역' },
        { tab: 'Review', text: '리뷰관리' },
        { tab: 'Location', text: '내 지역관리' },
        { tab: 'Inquiry', text: '문의내역', protected: true },
    ];

    const sellerMenuItems = [
        { tab: 'Account', text: '내 계정 정보' },
        // { tab: 'ItemRegistration', text: '판매 제품 관리' },
        { tab: 'Review', text: '리뷰조회' },
        { tab: 'Inquiry', text: '문의내역', protected: true },
    ];

    const menuItems = !userLogin ? buyerMenuItems : userAuth === 'seller' ? sellerMenuItems : buyerMenuItems;

    const resizingHandler = () => {
        setIsMobile(window.innerWidth <= 430);
    };

    useEffect(() => {
        setIsMobile(window.innerWidth <= 430);
        window.addEventListener('resize', resizingHandler);
        return () => {
            window.removeEventListener('resize', resizingHandler);
        };
    }, []);

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

    const pcMenu = ({ activeTab, setActiveTab }) => {
        return (
            <Container>
                <LeftContainer>
                    <ImformationContainer>
                        <MypageContainer onClick={() => setActiveTab('Account')} isSelected={activeTab === 'Account'}>
                            마이페이지
                        </MypageContainer>
                        {menuItems.map((item, index) => (
                            <LinkContainer key={index} onClick={() => setActiveTab(item.tab)} isSelected={activeTab === item.tab}>
                                {item.text}
                            </LinkContainer>
                        ))}
                    </ImformationContainer>
                </LeftContainer>
                <RightContainer>
                    <UserContainer>
                        <UserImage />
                        <UserInform>
                            <UserNameContainer>이름</UserNameContainer>
                            <UserEmail>이메일</UserEmail>
                        </UserInform>
                    </UserContainer>
                    <ToolContainer>{renderInformationContainer()}</ToolContainer>
                </RightContainer>
            </Container>
        );
    };

    const mobileMenu = ({ activeTab, setActiveTab }) => {
        return (
            <Container>
                <RightContainer>
                    <UserContainer>
                        <UserImage />
                        <UserInform>
                            <UserNameContainer>이름</UserNameContainer>
                            <UserEmail>이메일</UserEmail>
                        </UserInform>
                    </UserContainer>
                    <ToolContainer>{renderInformationContainer()}</ToolContainer>
                </RightContainer>
            </Container>
        );
    };

    return (
        <Container>
            <LeftContainer>
                <ImformationContainer>
                    <MypageContainer onClick={() => setActiveTab('Account')} isSelected={activeTab === 'Account'}>
                        마이페이지
                    </MypageContainer>
                    {menuItems.map((item, index) => (
                        <LinkContainer key={index} onClick={() => setActiveTab(item.tab)} isSelected={activeTab === item.tab}>
                            {item.text}
                        </LinkContainer>
                    ))}
                </ImformationContainer>
            </LeftContainer>
            <RightContainer>
                <UserContainer>
                    <UserImage />
                    <UserInform>
                        <UserNameContainer>이름</UserNameContainer>
                        <UserEmail>이메일</UserEmail>
                    </UserInform>
                </UserContainer>
                <ToolContainer>{renderInformationContainer()}</ToolContainer>
            </RightContainer>
        </Container>
    );
}
//전체 컨테이너
const Container = styled.div`
    display: flex;
    border-radius: 5px;
    max-width: 100%;
    height: 100%;
`;
//마이페이지 왼쪽 컨테이너
const LeftContainer = styled.div`
    box-sizing: border-box;
    min-width: 15%;
    font-size: 30px;
    padding: 3% 0 0 3%;
    /* padding-left: 3%; */
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
    @media (max-width: 850px) {
        font-size: 20px;
        min-width: 20%;
    }
    @media (max-width: 600px) {
        font-size: 20px;
        min-width: 29%;
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
const MobileMenu = styled.div`
    background-image: url(${List_Pointer});
    background-position: center;
    background-size: contain;
`;
//마이페이지 오른쪽 컨테이너
const RightContainer = styled.div`
    min-width: 85%;
    padding: 4% 0 0 3%;
    box-sizing: border-box;
    background-color: #faf6e3;
    @media (max-width: 800px) {
        width: 95%;
        padding-top: 5%;
    }
    @media (max-width: 800px) {
        min-width: 63%;
    }
`;
//마이페이지 글자 컨테이너
const MypageContainer = styled.div`
    font-weight: bold;
    margin-bottom: 25px;
    @media (max-width: 800px) {
        margin-bottom: 12px;
    }
    @media (max-width: 400px) {
        margin-bottom: 9px;
    }
    cursor: pointer;
`;
//메뉴바 글자 컨테이너
const LinkContainer = styled.div`
    display: block;
    text-decoration: none;
    font-size: 26px;
    margin-bottom: 15px;
    color: ${(props) => (props.isSelected ? '#white' : '#adb5bd')};
    cursor: pointer;
    &hover {
        background-color: #b5b7ba;
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
        font-size: 14px;
    }
`;
//마이페이지 네비바 전체 컨테이너
const ImformationContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    margin-top: 1vh;
    z-index: 3;
`;
//유저 정보 컨테이너
const UserContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 3%;
    margin-bottom: 30px;
    border-radius: 20px;
    width: 88%;
`;
//유저 이름 컨테이너
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
//유저 이메일 컨테이너
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
//유저 이미지 컨테이너
const UserImage = styled.div`
    width: 17vw;
    height: 17vw;
    max-width: 120px;
    max-height: 120px;
    background-image: url(${Avata});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 20px;
    @media (max-width: 800px) {
        width: 15vw;
        height: 15vw;
        margin-right: 0px;
    }
`;

//유저 이름, 이메일 정보 전체 컨테이너
const UserInform = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`;

//렌더링 컨테이너
const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 88%;
    border-radius: 10px;
    background-color: white;
    padding: 3%;
    @media (max-width: 800px) {
        font-size: 16px;
    }
    @media (max-width: 400px) {
        font-size: 14px;
        padding: 1%;
    }
`;
//전체 배경 스타일
const Body = styled.div`
    background-color: #333;
    width: 500px;
    margin: 30px auto;
`;

// 메뉴 트리거 스타일
const MenuTrigger = styled.a`
    margin-right: 70px;
    margin-bottom: 50px;
    position: relative;
    width: 50px;
    height: 44px;
    display: inline-block;
    transition: all 0.4s;
    box-sizing: border-box;

    span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: #fff;
        border-radius: 4px;
        transition: all 0.4s;

        &:nth-of-type(1) {
            top: 0;
        }

        &:nth-of-type(2) {
            top: 20px;
        }

        &:nth-of-type(3) {
            bottom: 0;
        }
    }
`;
