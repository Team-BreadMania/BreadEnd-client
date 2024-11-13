import React, { useState } from 'react';
import styled from 'styled-components';
import Avata from '../Images/Generic_avatar.png';
import MannerTemperature from './MannerTemperature';

export default function Account() {
    const [nickname, setNickname] = useState('이름');
    const [email, setEmail] = useState('이메일');
    const [registDate, setRegistDate] = useState('2024-11-13');
    const [detail, setDetail] = useState('자기소개');
    const [location, setLocation] = useState('지역');

    return (
        <Container>
            <PCUserContainer>
                <UserImage />
                <AllInformContainer>
                    <UserUpperContainer>
                        <UserInform>
                            <UserNameContainer>{nickname}</UserNameContainer>
                            <UserEmail>{email}</UserEmail>
                        </UserInform>
                        <MannerTemperature percentage={75} />
                    </UserUpperContainer>
                    <UserDetailInform>
                        <UserDate>가입일자 : {registDate}</UserDate>
                        <UserLocation>지역 : {location}</UserLocation>
                    </UserDetailInform>
                </AllInformContainer>
            </PCUserContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 800px) {
        padding: 15px;
    }
`;

// 유저 정보 컨테이너
const PCUserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 기본적으로 왼쪽 정렬 */
    background-color: white;
    margin-bottom: 30px;
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
    background-image: url(${Avata});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 20px;
    @media (max-width: 800px) {
        width: 70px;
        height: 70px;
        margin-right: 10px;
    }
    @media (max-width: 400px) {
        width: 60px;
        height: 60px;
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
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 */
    margin-right: 10px;
`;

const UserUpperContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
