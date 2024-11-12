import React, { useState } from 'react';
import styled from 'styled-components';
import Avata from '../Images/Generic_avatar.png';

export default function Account() {
    const [name, setName] = useState('이름');
    const [email, setEmail] = useState('이메일');
    const [detail, setDetail] = useState('자기소개');
    const [location, setLocation] = useState('지역');

    return (
        <Container>
            <UserContainer>
                <UserImage />
                <UserInform>
                    <UserNameContainer>{name}</UserNameContainer>
                    <UserEmail>{email}</UserEmail>
                    <UserDetail>{detail}</UserDetail>
                    <UserLocation>{location}</UserLocation>
                </UserInform>
            </UserContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    @media (max-width: 800px) {
        padding: 15px;
    }
`;

// 유저 정보 컨테이너
const UserContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    margin-bottom: 30px;
    border-radius: 20px;
    width: 100%;    
    padding: 15px;
    border: solid #ebebeb 1px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// 유저 이름 컨테이너
const UserNameContainer = styled.div`
    font-size: 28px;
    margin-left: 20px;
    font-weight: bold;
    @media (max-width: 800px) {
        font-size: 24px;
    }
    @media (max-width: 400px) {
        font-size: 20px;
    }
`;

// 유저 이메일 컨테이너
const UserEmail = styled.div`
    font-size: 16px;
    margin-left: 20px;
    color: #6c757d;
    @media (max-width: 800px) {
        font-size: 14px;
    }
    @media (max-width: 400px) {
        font-size: 12px;
    }
`;

// 유저 자기소개 컨테이너
const UserDetail = styled.div`
    font-size: 14px;
    margin-left: 20px;
    color: #6c757d;
    margin-top: 5px;
    @media (max-width: 800px) {
        font-size: 12px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
    }
`;

// 유저 지역 컨테이너
const UserLocation = styled.div`
    font-size: 14px;
    margin-left: 20px;
    color: #6c757d;
    margin-top: 5px;
    @media (max-width: 800px) {
        font-size: 12px;
    }
    @media (max-width: 400px) {
        font-size: 10px;
    }
`;

// 유저 이미지 컨테이너
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
        margin-right: 10px;
    }
`;

// 유저 이름, 이메일 정보 전체 컨테이너
const UserInform = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
`;
