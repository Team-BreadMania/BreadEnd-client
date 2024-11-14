import { useState } from "react";
import styled from "styled-components";
import profile_img from "../Images/profileimg.png";
import shop_img from "../Images/breadshop_img.jpg";


export default function SellerHome() {
    const [storeName, setStoreName] = useState('오둥이 빵집');
    const [isEditing, setIsEditing] = useState(false);
    const [newStoreName, setNewStoreName] = useState(storeName);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setStoreName(newStoreName);
        setIsEditing(false);
    };

    return (
        <Container>
            <TextContainer>가게 정보</TextContainer>
            <StoreContainer>
                <StoreNameContainer>
                    <StoreProfile src={profile_img} />오둥이 빵집
                </StoreNameContainer>
                <StoreDetailPage>
                    <StoreImageContainer src={shop_img}/>

                </StoreDetailPage>
                {/* {isEditing ? (
                    <>
                        <Input
                            type="text"
                            value={newStoreName}
                            onChange={(e) => setNewStoreName(e.target.value)}
                        />
                        <Button onClick={handleSaveClick}>저장</Button>
                    </>
                ) : (
                    <>
                        <StoreNameContainer>{storeName}</StoreNameContainer>
                        <Button onClick={handleEditClick}>수정</Button>
                    </>
                )} */}                
            </StoreContainer>
            <TextContainer>리뷰조회</TextContainer>
            <TextContainer>문의내역</TextContainer>
        </Container>
    );
}
//전체컨테이너
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (max-width:800px) {
        padding: 10px 0 0 0;
    }
`;
//해당 정보 명시 컨테이너
const TextContainer = styled.div`
    font-weight:bold;
    font-size:16px;
    border-bottom:1px solid black;
    padding-bottom:10px;
    margin-bottom:10px;

`;
//가게 컨테이너
const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: black 2px solid;
    margin-bottom:10px;
`;
// 가게 프로필 이미지
const StoreProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${profile_img});
    background-size: cover;
`;
//가게 이름 컨테이너
const StoreNameContainer = styled.div`
    display:flex;
    background-color: #faf6e3;
    font-weight: bold;
    font-size: 20px;
    justify-content: center;
    border-radius:20px 20px 0 0px;
    align-items:center;
`;
//가게 상세정보 컨테이너
const StoreDetailPage=styled.div`
    display:flex;
    width:100%;
    align-items:center;
    justify-content:center;
`;
//가게 이미지 컨테이너
const StoreImageContainer = styled.div`
    width: 200px;
    height: 150px;
    background-image: url(${shop_img});
    background-size: cover;
`;
const Input = styled.input`
    font-size: 18px;
    padding: 5px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    &:hover {
        background-color: #0056b3;
    }
`;
