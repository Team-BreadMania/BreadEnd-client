import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Avata from '../Images/Generic_avatar.png';
import MannerTemperature from './MannerTemperature';
import EditUserInfo from './EditUserInform';
import edit_button from '../Images/edit_button.png';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Account() {
    const [nickname, setNickname] = useState('이름');
    const [email, setEmail] = useState('이메일');
    const [registDate, setRegistDate] = useState('2024-11-13');
    const [detail, setDetail] = useState('자기소개');
    const [location, setLocation] = useState('지역');
    const [userImg, setUserImg] = useState(null);
    const [number, setNumber] = useState(null);
    const [temp, setTemp] = useState(80);
    const [view, setViwe] = useState(false);

    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        if (accessToken) {
            fetchUserData(accessToken);
        }
    }, [accessToken]); // accessToken이 변경될 때마다 사용자 데이터를 가져옴

    const fetchUserData = async (accessToken) => {
        try {
            const response = await axios.get('https://breadend.shop/user/get-userinfo', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 포함
                },
            });

            if (response.status === 200) {
                console.log('유저 상세 정보 불러오기 성공:', response.data);
                const { nickname, phonenumber, location, regist_date, profileIMG } = response.data;
                setNickname(nickname);
                setNumber(phonenumber);
                setLocation(location);
                setRegistDate(regist_date);
                setUserImg(profileIMG);
            }
        } catch (error) {
            console.log(error.response);
        }
    };
    const MenuToggle = (e) => {
        e.stopPropagation();
        setViwe(!view);
    };

    const renderInformationContainer = () => {
        if (view) {
            return (
                <EditUserInfo
                    nickname={nickname}
                    setNickname={setNickname}
                    setNumber={setNumber}
                    setEmail={setEmail}
                    location={location}
                    setLocation={setLocation}
                    detail={detail}
                    setDetail={setDetail}
                    MenuToggle={MenuToggle} // Pass MenuToggle function
                />
            );
        }
        return null;
    };

    return (
        <Container>
            <UserContainer>
                <UserImage src={userImg} />
                <AllInformContainer>
                    <UserUpperContainer>
                        <UserInform>
                            <UserNameContainer>{nickname}</UserNameContainer>
                            <UserEmail>{number}</UserEmail>
                        </UserInform>
                        <MannerTemperature percentage={temp} />
                    </UserUpperContainer>
                    <UserLowerContainer>
                        <UserDetailInform>
                            <UserDate>가입일자 : {registDate}</UserDate>
                            <UserLocation>지역 : {location}</UserLocation>
                        </UserDetailInform>
                        <EditButton onClick={MenuToggle} />
                    </UserLowerContainer>
                </AllInformContainer>
            </UserContainer>
            <RenderContainer>{renderInformationContainer()}</RenderContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    @media (max-width: 800px) {
        padding: 15px;
    }
    @media (max-width: 400px) {
        padding: 8px 15px;
    }
`;

// 유저 정보 컨테이너
const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 기본적으로 왼쪽 정렬 */
    background-color: white;
    border-radius: 20px;
    width: 100%;
    padding: 10px; /* 여백 추가 */
    position: relative; /* 자식 요소의 절대 위치를 위한 설정 */
`;

// 유저 이름 컨테이너
const UserNameContainer = styled.div`
    font-size: 28px;
    margin-left: 18px;
    font-weight: bold;
    @media (max-width: 800px) {
        font-size: 17px;
        margin-left: 16px;
    }
    @media (max-width: 400px) {
        font-size: 14px;
        margin-left: 12px;
    }
`;

// 유저 이메일 컨테이너
const UserEmail = styled.div`
    font-size: 18px;
    margin-left: 21px;
    color: #6c757d;
    @media (max-width: 800px) {
        font-size: 16px;
        margin-left: 17px;
    }
    @media (max-width: 400px) {
        font-size: 14px;
        margin-left: 13px;
    }
`;

// 유저 가입날짜 컨테이너
const UserDate = styled.div`
    font-size: 14px;
    margin-left: 21px;
    color: #6c757d;
    margin-top: 5px;
    @media (max-width: 800px) {
        font-size: 12px;
        margin-left: 17px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
        margin-left: 13px;
    }
`;

// 유저 지역 컨테이너
const UserLocation = styled.div`
    font-size: 14px;
    margin-left: 21px;
    color: #6c757d;
    margin-top: 5px;
    @media (max-width: 800px) {
        font-size: 12px;
        margin-left: 17px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
        margin-left: 13px;
    }
`;

// 유저 이미지 컨테이너
const UserImage = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${(props) => props.src||Avata});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 20px;
    @media (max-width: 800px) {
        width: 80px;
        height: 80px;
        margin-right: 10px;
    }
    @media (max-width: 400px) {
        width: 70px;
        height: 70px;
        margin-right: 7px;
    }
`;

// 유저 이름, 이메일 정보 전체 컨테이너
const UserInform = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 6px;
`;

// 유저 가입일, 지역 정보 컨테이너
const UserDetailInform = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

// 유저 모든 정보 담는 컨테이너
const AllInformContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 */
    margin-right: 10px;
    &:last-child {
        justify-content: flex-end;
    }
`;
//이름, 이메일, 매너온도 묶은 컨테이너
const UserUpperContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
//가입일자, 지역, 에딧버튼 컴포넌트
const UserLowerContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

//정보 수정 렌더링되는 컨테이너
const RenderContainer = styled.div`
    width: 100%;
    background-color: white;
`;
const EditButton = styled.button`
    width: 30px;
    height: 30px;
    background-size: contain;
    background-image: url(${edit_button});
    background-color: white;
    background-repeat: no-repeat;
    &:hover,
    :active {
        background-color: grey;
    }
    @media (max-width: 800px) {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 400px) {
        width: 20px;
        height: 20px;
    }
`;
