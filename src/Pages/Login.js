import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { userAuth, setUserAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const userType = Cookies.get('userType');
        setUserAuth(userType);
    }, [setUserAuth]);

    const handleSignUpClick = () => { // 회원가입 페이지로 이동
        navigate('/SignUp'); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const response = await axios.post(
                    'https://breadend.shop/user/sign-in',
                    {
                        userid: username,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('로그인 성공:', response.data);
                    Cookies.set('accessToken', response.data.accessToken,);
                    Cookies.set('refreshToken', response.data.accessToken,);
                    Cookies.set('userType', response.data.userType);
                    const userType = response.data.userType;
                    setUserAuth(userType);
                    if (userType === 'buyer') {
                        navigate('/Home');
                    } else if (userType === 'seller') {
                        navigate('/MyPage');
                    }
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
                <Icon src="https://cdn-icons-png.flaticon.com/512/5919/5919928.png" alt="아이콘" />
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
                <Text2>아직 회원이 아니신가요? -&gt; 
                    <span style = {{ color: "#D4A373", cursor: "pointer" }} onClick = {handleSignUpClick}> 회원가입 이동하기</span>
                </Text2>
            </LoginFormContainer>
        </LoginPage>
    );
}

export default Login;

// 스타일 정의
const LoginPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
    padding-top: 10%;
    gap: 20px;

    @media (max-width: 1200px) {
        padding-top: 15%;
    }

    @media (max-width: 1000px) {
        padding-top: 20%;
    }

    @media (max-width: 1000px) {
        padding-top: 25%;
    }
    @media screen and (max-width: 1440px) {
        flex-direction: column;
    }
`;
const IconContainer = styled.div`
    width: 100px; /* 기본 크기 */
    height: 100px; /* 기본 크기 */
    display: flex; /* 아이콘 정렬 */
    align-items: center;
    justify-content: center;
    position: relative; /* 위치 조정을 위해 relative 추가 */

    /* 좌우 방향 조정을 위한 props 추가 */
    margin-left: ${({ marginLeft }) => marginLeft || '0px'};
    margin-right: ${({ marginRight }) => marginRight || '25px'};

    @media screen and (max-width: 1440px) {
        display: none; /* 1440px 이하에서 숨김 */
    }

    @media screen and (min-width: 1441px) {
        width: 150px; /* 1441px 이상에서 크기 키움 */
        height: 150px;
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
    margin-top: 50px; /* 원하는 위치로 이동 */
    max-width: 400px;
    padding: 30px; /* 기본 패딩 */
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    @media screen and (max-width: 1440px) {
        width: 90%;
        padding: 20px; /* 중간 화면 크기 패딩 */
    }

    @media screen and (max-width: 768px) {
        padding: 0; /* 모바일 뷰에서 패딩 제거 */
        width: 100%; /* 너비를 화면에 맞춤 */
        margin-top: 85px; /* 모바일에서 적절한 위치 */
        border: none; /* 선택적으로 테두리 제거 */
        box-shadow: none; /* 선택적으로 그림자 제거 */
    }
`;

const Title = styled.h1`
    color: #d4a373;
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
    background-color: #d4a373;
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

const Text2 = styled.div` // 텍스트 
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    color: black;
`;