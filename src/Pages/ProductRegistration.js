import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';

export default function ProductRegistration() {

    const [productName, setProductName] = useState(""); // 상품명
    const [category, setCategory] = useState(""); // 상품 카테고리
    const [price, setPrice] = useState(0); // 상품 가격
    const [quantity, setQuantity] = useState(0); // 판매 수량
    const [manufactureTime, setManufactureTime] = useState(""); // 제조일자
    const [saleTime, setSaleTime] = useState(""); // 판매시간
    const [productDescription, setProductDescription] = useState(""); // 상품설명
    const [imageFiles, setImageFiles] = useState([]); // 상품 이미지(파일 객체)
    const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기(Base64 문자열)

    const handleInputChange = (setter) => (e) => { // 입력제한 메서드
        const value = e.target.value;
        if (/^\d*$/.test(value)) { 
            setter(Number(value)); 
        }
    };

    const renderTimeOptions = (isSaleTime) => { // 시간선택 메서드
        return Array.from({ length: 24 }, (_, index) => {
            const hour = index % 12 === 0 ? 12 : index % 12; 
            const period = index < 12 ? "오전" : "오후"; 
            const suffix = isSaleTime ? "까지" : ""; 
            return (
                <option key = {index} value = {`오늘 ${period} ${hour}시${suffix}`}>
                    {`오늘 ${period} ${hour}시 ${suffix}`}
                </option>
            );
        });
    };

    const handleImageChange = (e) => { // 이미지 업로드 메서드
        const files = Array.from(e.target.files);
        const fileReaders = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result); 
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then((base64Images) => {
            setImageFiles(files); 
            setImagePreviews(base64Images); 
        });
    };
    

    const handleImageRemove = (index) => { // 이미지 삭제 메서드
        setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index)); 
        setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index)); 
    };    

    const handleSubmit = async (e) => { // 상품 등록 메서드
        e.preventDefault(); 

        const formData = new FormData();
        formData.append('product[itemName]', productName); 
        formData.append('product[price]', price); 
        formData.append('product[info]', productDescription); 
        formData.append('product[itemType]', category); 
        formData.append('product[count]', quantity); 
        formData.append('product[makedate]', manufactureTime); 
        formData.append('product[expireddate]', saleTime); 

        imageFiles.forEach((image) => {
            formData.append("images", image);
        });

        console.log('전송할 데이터:');
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: [파일] ${value.name}`); 
            } else {
                console.log(`${key}: ${value}`); 
            }
        }

        const accessToken = Cookies.get("accessToken"); 

        try {
            const response = await axios.post('https://breadend.shop/product/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                },
            });
            console.log('상품 등록 성공 :', response.data);
        } catch (error) {
            console.error('상품 등록 실패 :', error);
        }
    };

    return (
        <Container>
            <RegistrationBox>
                <Title>상품 등록</Title>
                <InnerContainer>
                    <RecentlyRegistered>최근등록상품<br/>정보 불러오기</RecentlyRegistered>
                    <InnerBox>
                        <Label>상품명</Label>
                        <InputField type = "text" 
                                    placeholder = "상품명을 입력해주세요" 
                                    value = {productName} 
                                    onChange = {(e) => setProductName(e.target.value)} 
                                    required
                        />
                    </InnerBox>
                    <InnerBox>
                        <Label>상품 카테고리</Label>
                        <SelectField value = {category} onChange = {(e) => setCategory(e.target.value)} required>
                            <option value = "">상품 카테고리를 선택</option>
                            <option value = "발효빵">발효빵</option>
                            <option value = "효모빵">효모빵</option>
                            <option value = "납작한 빵">납작한 빵</option>
                            <option value = "사워도">사워도</option>
                            <option value = "흰빵">흰빵</option>
                            <option value = "토스트">토스트</option>
                            <option value = "퀵브레드">퀵브레드</option>
                            <option value = "튀긴 빵">튀긴 빵</option>
                            <option value = "풀빵">풀빵</option>
                            <option value = "와플">와플</option>
                            <option value = "단빵">단빵</option>
                            <option value = "과일빵">과일빵</option>
                            <option value = "롤빵">롤빵</option>
                            <option value = "콘브레드">콘브레드</option>
                        </SelectField>
                    </InnerBox>
                    <InnerBox>
                        <Label>개당 가격</Label>
                        <InputField type = "text" 
                                    placeholder = "가격을 입력해주세요" 
                                    value = {price === 0 ? "" : price} 
                                    onChange = {handleInputChange(setPrice)} 
                                    required
                        />
                    </InnerBox>
                    <InnerBox>
                        <Label>판매 수량</Label>
                        <InputField 
                            type = "text"
                            placeholder = "판매할 수량을 입력해주세요" 
                            value = {quantity === 0 ? "" : quantity} 
                            onChange = {handleInputChange(setQuantity)} 
                            required
                        />
                    </InnerBox>
                    <TimeBox>
                        <InnerBox style = {{width: "45%", marginRight: "10%"}}>
                            <Label>제조일자</Label>
                            <SelectField 
                                value = {manufactureTime} 
                                onChange = {(e) => setManufactureTime(e.target.value)} 
                                required
                            >
                                <option value = "">제조 시간을 선택</option>
                                {renderTimeOptions(false)} 
                            </SelectField>
                        </InnerBox>
                        <InnerBox style = {{width: "45%"}}>
                            <Label>판매시간</Label>
                            <SelectField 
                                value = {saleTime} 
                                onChange = {(e) => setSaleTime(e.target.value)} 
                                required
                            >
                                <option value="">판매 시간을 선택</option>
                                {renderTimeOptions(true)} 
                            </SelectField>
                        </InnerBox>
                    </TimeBox>
                    <InnerBox style = {{height: "140px"}}>
                        <Label>상품설명 & 제빵사의 말</Label>
                        <TextArea 
                            placeholder = "상품 설명을 입력해주세요" 
                            value = {productDescription} 
                            onChange = {(e) => setProductDescription(e.target.value)} 
                            required
                        />
                    </InnerBox>
                    <InnerBox style = {{height: "200px", marginTop: "0px"}}>
                        <Label>상품 이미지 업로드</Label>
                        <InputFile
                            type = "file" 
                            multiple 
                            accept = "image/*" 
                            onChange = {handleImageChange} 
                        />
                        <ImagePreview>
                            {imagePreviews.map((image, index) => ( 
                                <ImageContainer key={index}>
                                    <img src={image} alt={`uploaded ${index}`} />
                                    <RemoveButton onClick={() => handleImageRemove(index)}>X</RemoveButton>
                                </ImageContainer>
                            ))}
                        </ImagePreview>
                    </InnerBox>
                </InnerContainer>
                <SubmitButton type = "button" onClick = {handleSubmit}>상품 등록하기</SubmitButton>
            </RegistrationBox>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    display: flex;
    justify-content: center;
    width: 100%;
`;

const RegistrationBox = styled.div` // 상품 등록 컨테이너
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 2.5%;

    @media (max-width: 1300px) {
        width: 60%; 
    }

    @media (max-width: 1200px) {
        width: 65%; 
    }

    @media (max-width: 1100px) {
        width: 70%; 
    }

    @media (max-width: 1000px) {
        width: 80%; 
    }

    @media (max-width: 800px) {
        width: 90%; 
    }

    @media (max-width: 600px) {
        width: 95%; 
    }
`;

const Title = styled.div` // 제목
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    font-family: maple-font;
    text-align: center;

    @media (max-width: 600px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 500px) {
        font-size: 25px;
    }
`;

const InnerContainer = styled.div` // 내부 컨테이너 
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 10px;
    margin-top: 2.5%;
    padding-bottom: 2.5%;
    background-color: #F5F5F5;
`;

const InnerBox = styled.div` // 내부 박스
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    width: 95%;
    height: 70px;
`;

const Label = styled.div` // 라벨 제목
    font-size: 15px;
    font-weight: bold;
`;

const InputField = styled.input` // 인풋필드
    border: 1px solid #C1C1C1;
    border-radius: 5px; 
    margin-top: 10px;
    font-size: 15px; 
    background-color: white; 

    &:focus {
        border-color: black;
    }
`;

const SelectField = styled.select` // 선택 드롭박스
    border: 1px solid #C1C1C1;
    border-radius: 5px; 
    margin-top: 10px;
    font-size: 15px; 
    background-color: white; 

    &:focus {
        border-color: black;
    }
`;

const TimeBox = styled.div` // 제조시간 & 판매시간 박스
    display: flex;
    width: 95%;
`;

const TextArea = styled.textarea` // 상품설명 & 제빵사의 말
    border: 1px solid #C1C1C1;
    border-radius: 5px; 
    margin-top: 10px;
    font-size: 15px; 
    background-color: white; 
    resize: none; 
    width: 100%; 
    height: 90px;
`;

const InputFile = styled.input` // 이미지 업로드 인풋
    height: 30px;
    margin-top: 10px;
    border-radius: 0px;
    font-size: 15px; 
    background-color: white; 
    cursor: pointer;
`;

const ImagePreview = styled.div` // 이미지 미리보기 박스
    display: flex;
    width: 100%;
    height: 140px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #C1C1C1;
    background-color: white;
    overflow-x: auto;

    img {
        width: 90px;
        height: 90px; 
        object-fit: cover; 
        margin: 12.5px 7.5px 0 7.5px;
        border-radius: 5px;
    }
`;

const ImageContainer = styled.div` // 이미지 컨테이너
    position: relative; 
`;

const RemoveButton = styled.button` // 이미지 삭제 버튼
    position: absolute;
    display: flex; 
    align-items: center; 
    justify-content: center;
    font-size: 15px; 
    top: -5px;
    right: 0px;
    background: #888888;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;


    &:hover {
        background: #6E6E6E;
    }
`;

const SubmitButton = styled.div` // 상품등록 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: #0075FF;
    color: #FFFFFF;
    margin-top: 20px;
    margin-bottom: 100px;
    cursor: pointer;
`;

const RecentlyRegistered = styled.div` // 최근등록상품 정보 불러오기 버튼
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    margin-left: 65%;
    width: 30%;
    height: 50px;
    border-radius: 5px;
    background-color: #0075FF;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
`;