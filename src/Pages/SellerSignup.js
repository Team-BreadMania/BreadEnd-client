import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const [isIdEntered, setIsIdEntered] = useState(false);

    useEffect(() => {
        // 아이디 입력 여부에 따라 상태 업데이트
        setIsIdEntered(formData.id.length > 0);

        // 스타일 태그 동적으로 추가
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            .duplicate-check {
                padding: 10px;
                font-size: 14px;
                cursor: not-allowed;
                border-radius: 20px;
                border: 1px solid #ddd;
                background-color: #f0f0f0;
                margin-top: 10px;
                transition: background-color 0.2s;
            }
            .duplicate-check.active {
                background-color: #007BFF;
                color: #fff;
                cursor: pointer;
            }
            .duplicate-check.active:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(styleTag);

        // 컴포넌트가 언마운트될 때 스타일 제거
        return () => {
            document.head.removeChild(styleTag);
        };
    }, [formData.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleIdCheck = () => {
        setIsIdAvailable(true);
        setIdCheckMessage(`${formData.id}는 사용 가능한 아이디입니다.`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isIdAvailable) {
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
            <h1>판매자 가입 페이지</h1>
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
                    <button
                        type="button"
                        className={`duplicate-check ${isIdEntered ? 'active' : ''}`}
                        onClick={handleIdCheck}
                        disabled={!isIdEntered}
                    >
                        중복 체크
                    </button>
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
                    <label htmlFor="region">판매지점등록</label>
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
                    <label htmlFor="contact">판매지점연락처</label>
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
