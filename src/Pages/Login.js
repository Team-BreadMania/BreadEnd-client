import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await axios.post('/user/sign-in', {
                    userid: username,
                    password: password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.status === 200) {
                    console.log('로그인 성공:', response.data);
                    navigate('/Home');
                } else {
                    console.log('로그인 실패:', response.data);
                    alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
                }
            } catch (error) {
                console.error('로그인 중 오류 발생:', error);
                alert('로그인 실패: 서버 오류가 발생했습니다.');
            }
        } else {
            console.log('로그인 실패: 아이디 또는 비밀번호가 없습니다.');
            alert('로그인 실패: 아이디 또는 비밀번호를 입력하세요.');
        }
    };
    return (
        <LoginPage>
            <IconContainer>
                <Icon
                    src="https://cdn-icons-png.flaticon.com/512/121/121046.png"
                    alt="아이콘"
                />
            </IconContainer>
            <LoginFormContainer>
                <Title>빵끝마켓🍞</Title>
                <LoginForm onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputField
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디"
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputField
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                            required
                        />
                    </InputContainer>
                    <LoginButton type="submit">로그인</LoginButton>
                </LoginForm>
            </LoginFormContainer>
        </LoginPage>
    );
}export default Login;
const LoginPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    gap: 20px;
    @media screen and (max-width: 1440px) {
        flex-direction: column;
        height: auto;
    }
`;
const IconContainer = styled.div`
    @media screen and (max-width: 1440px) {
        display: none;
    }
`;
const Icon = styled.img`
    width: 200px;
    height: 200px;
`;
const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    padding: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    @media screen and (max-width: 1440px) {
        width: 90%;
        padding: 20px;
    }
`;
const Title = styled.h1`
    font-size: 40px;
    font-family: 'Black Han Sans', sans-serif;
`;
const LoginForm = styled.form`
    width: 100%;
`;
const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    &:nth-of-type(1) {
        margin-bottom: 6px;
    }
`;
const InputField = styled.input`
    padding: 15px;
    font-size: 18px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s ease;
    &::placeholder {
        text-align: left;
    }
    @media screen and (max-width: 1440px) {
        padding: 12px;
        font-size: 16px;
        height: 45px;
    }
`;
const LoginButton = styled.button`
    padding: 15px;
    width: 100%;
    height: 50px;
    background-color: black;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #444;
    }
    @media screen and (max-width: 1440px) {
        padding: 12px;
        height: 45px;
        font-size: 16px;
    }
`;
