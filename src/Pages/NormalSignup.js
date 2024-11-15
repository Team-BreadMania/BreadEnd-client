import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NormalSignup.css';

export default function NormalSignup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        region: '',
        detaillocation: '',
        contact: '',
        name: '',
        likedCategory: '',    
    });

    const [imageFile, setImageFile] = useState(null);
    const [idCheckMessage, setIdCheckMessage] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isIdEntered, setIsIdEntered] = useState(false);

    useEffect(() => {
        setIsIdEntered(formData.userId.length > 0);
    }, [formData.userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // 실제 파일을 상태로 저장
    };

    const handleIdCheck = () => {
        if (formData.userId.trim() === '') {
            alert('아이디를 입력하세요.');
            return;
        }
        setIsIdAvailable(true);
        setIdCheckMessage(`${formData.userId}는 사용 가능한 아이디입니다.`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isIdAvailable) {
            if (formData.password !== formData.confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            try {
                const requestData = new FormData();
                
                const userObject = {
                    userid: formData.userId,
                    password: formData.password,
                    name: formData.name,
                    phoneNumber: formData.contact,
                    nickname: formData.nickname,
                    liked_category: formData.likedCategory,
                    registDate: new Date().toISOString(),
                    userType: 'buyer',
                    location: formData.region,
                    detaillocation: formData.detaillocation,
                };

                if (formData.shopName) userObject.shopName = formData.shopName;
                if (formData.shopNumber) userObject.shopNumber = formData.shopNumber;

                requestData.append('user', JSON.stringify(userObject)); // JSON 문자열로 변환하여 추가
                if (imageFile) {
                    requestData.append('image', imageFile); // 이미지 파일 추가
                }

                const response = await axios.post('http://43.203.241.42/user/regist', requestData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // 필요 시 설정, 자동 설정되도록 생략해도 됨
                    },
                });

                if (response.status === 200) {
                    console.log('회원가입 성공:', response.data);
                    navigate('/home');
                } else {
                    console.log('회원가입 실패:', response.data);
                    alert('회원가입 실패: 입력 정보를 확인하세요.');
                }
            } catch (error) {
                console.error('회원가입 중 오류 발생:', error);
                if (error.response) {
                    console.error('서버 응답 데이터:', error.response.data);
                    alert(`회원가입 실패: ${error.response.data.message}`);
                } else {
                    alert('회원가입 실패: 서버 오류가 발생했습니다.');
                }
            }
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
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
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
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름 입력"
                        required
                    />
                </div>
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
                    <label htmlFor="detaillocation">상세 지역</label>
                    <input
                        type="text"
                        id="detaillocation"
                        name="detaillocation"
                        value={formData.detaillocation}
                        onChange={handleChange}
                        placeholder="상세 주소 입력..."
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
                <div className="form-group">
                    <label htmlFor="likedCategory">좋아하는 카테고리</label>
                    <input
                        type="text"
                        id="likedCategory"
                        name="likedCategory"
                        value={formData.likedCategory}
                        onChange={handleChange}
                        placeholder="좋아하는 카테고리 입력"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">프로필 이미지</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
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
