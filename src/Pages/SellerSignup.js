import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NormalSignup.css';

export default function SellerSignup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        region: '',
        detaillocation: '',
        contact: '',
        shopName: '',
        shopNumber: '',
        name: '', // 이름 필드 추가
        likedCategory: '', // 좋아하는 카테고리 추가
    });

    const [imageFile, setImageFile] = useState(null);
    const [idCheckMessage, setIdCheckMessage] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isIdEntered, setIsIdEntered] = useState(false);

    useEffect(() => {
        setIsIdEntered(formData.id.length > 0);
    }, [formData.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleIdCheck = () => {
        setIsIdAvailable(true);
        setIdCheckMessage(`${formData.id}는 사용 가능한 아이디입니다.`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isIdAvailable) {
            try {
                const requestData = new FormData();
                requestData.append('userid', formData.id);
                requestData.append('password', formData.password);
                requestData.append('name', formData.name);
                requestData.append('phoneNumber', formData.contact);
                requestData.append('nickname', formData.nickname);
                requestData.append('registDate', new Date().toISOString());
                requestData.append('shopName', formData.shopName);
                requestData.append('shopNumber', formData.shopNumber);
                requestData.append('userType', 'seller');
                requestData.append('location', formData.region);
                requestData.append('detaillocation', formData.detaillocation);
                requestData.append('liked_category', formData.likedCategory); // 좋아하는 카테고리 추가

                if (imageFile) {
                    requestData.append('image', imageFile); // 이미지 파일 추가
                }

                console.log('요청 데이터:', requestData);

                const response = await axios.post('http://43.203.241.42/user/regist', requestData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // 파일 전송 시 Content-Type 설정
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
                alert('회원가입 실패: 서버 오류가 발생했습니다.');
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
                <div className="form-group">
                    <label htmlFor="shopName">판매지점 이름</label>
                    <input
                        type="text"
                        id="shopName"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleChange}
                        placeholder="판매지점 이름 입력..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="shopNumber">판매지점 번호</label>
                    <input
                        type="text"
                        id="shopNumber"
                        name="shopNumber"
                        value={formData.shopNumber}
                        onChange={handleChange}
                        placeholder="판매지점 번호 입력..."
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
