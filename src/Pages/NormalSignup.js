import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NormalSignup.css';

export default function NormalSignup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        region: '',
        contact: '',
    });

    const [idCheckMessage, setIdCheckMessage] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleIdCheck = () => {
        // 무조건 사용 가능한 아이디로 표시
        setIsIdAvailable(true);
        setIdCheckMessage(`${formData.id}는 사용 가능한 아이디입니다.`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isIdAvailable) {
            // 가입이 완료되면 환영 페이지로 이동
            navigate('/home'); 
        } else {
            alert('아이디 중복 확인을 해주세요.');
        }
    };

    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <div className="signup-container">
            <h2>일반 사용자 가입 페이지</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="아이디 (13자 이내 중복확인)"
                        required
                    />
                    <button type="button" className="duplicate-check" onClick={handleIdCheck}>중복 체크</button>
                </div>
                {idCheckMessage && (
                    <div className="id-check-message">
                        {idCheckMessage}
                        {isIdAvailable && <button type="button" className="use-id-button">사용</button>}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호 (20자 이내)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="비밀번호(RE) 비밀번호 확인"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="닉네임 (3자리 이상)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="region">지역</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        placeholder="경상북도 경산시..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">연락처</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="(+82) 010xxxxxxxx"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit">가입 확인</button>
                    <button type="button" onClick={handleCancel}>
                        가입 취소
                    </button>
                </div>
            </form>
        </div>
    );
}
