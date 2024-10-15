import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import './Login.css';  // CSS 파일 임포트

function Login() {
    const [username, setUsername] = useState('');  // username(아이디) 상태
    const [password, setPassword] = useState('');  // password 상태
    const navigate = useNavigate(); // useNavigate 훅으로 navigate 함수 생성

    const handleSubmit = (e) => {
        e.preventDefault();  // 페이지 새로고침 방지

        // 임의의 로그인 성공 조건 (예: 아이디와 비밀번호가 비어있지 않으면 성공)
        if (username && password) {
            console.log('로그인 성공:', { username, password });
            navigate('/Home'); // 로그인 성공 시 Home 페이지로 이동
        } else {
            console.log('로그인 실패: 아이디 또는 비밀번호가 없습니다.');
            alert('로그인 실패: 아이디 또는 비밀번호를 입력하세요.');
        }
    };

    return (
        <div className="login-page">
            {/* 이미지 */}
            <div className="icon-container">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/121/121046.png"
                    alt="아이콘"
                    className="inputIcon"
                />
            </div>

            {/* 로그인 폼 */}
            <div className="login-form-container">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    
                    {/* 아이디 입력 필드 */}
                    <label className="input-container">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디"
                            required
                            className="inputField"
                        />
                    </label>
                    
                    {/* 비밀번호 입력 필드 */}
                    <label className="input-container">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                            required
                            className="inputField"
                        />
                    </label>

                    {/* 로그인 버튼 */}
                    <button type="submit" className="loginButton">로그인</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
