import { useEffect, useState } from 'react';
import styled from 'styled-components';
import profile_img from '../Images/profileimg.png';
import shop_img from '../Images/breadshop_img.jpg';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function SellerHome() {
    // 유저정보
    const [storeName, setStoreName] = useState('오둥이 빵집');
    const [isEditing, setIsEditing] = useState(false);
    const [workTime, setWorkTime] = useState('08:30~19:00');
    const [number, setNumber] = useState('02-546-7588');
    const [location, setLocation] = useState('서울특별시 강남구 압구정동');
    const [detailLocation, setDetailLocation] = useState('서울특별시 강남구 압구정로30길 9');

    // 유저 정보 수정
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [newStoreName, setNewStoreName] = useState(storeName);
    const [newNumber, setNewNumber] = useState(number);
    const [newWorkTime, setNewWorkTime] = useState(workTime);
    const [newLocation, setNewLocation] = useState(location);
    const [newDetailLocation, setNewDetailLocation] = useState(detailLocation);

    // 모바일 뷰, 태블릿 뷰 식별
    const resizeHandler = () => {
        setIsMobile(window.innerWidth <= 550);
        setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1100);
    };

    // 뷰포트 확인 후 조절
    useEffect(() => {
        resizeHandler(); // 초기 로드 시 크기 확인
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    // 수정 버튼 클릭
    const handleEditClick = () => {
        setIsEditing(true);
        setNewStoreName(storeName);
        setNewNumber(number);
        setNewWorkTime(workTime);
        setNewLocation(location);
        setNewDetailLocation(detailLocation);
    };

    // 저장 버튼 클릭
    const handleSaveClick = () => {
        setStoreName(newStoreName);
        setNumber(newNumber);
        setWorkTime(newWorkTime);
        setLocation(newLocation);
        setDetailLocation(newDetailLocation);
        setIsEditing(false);
    };

    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        if (accessToken) {
            fetchUserData(accessToken);
        }
    }, [accessToken]); // accessToken이 변경될 때마다 사용자 데이터를 가져옴

    const fetchUserData = async (accessToken) => {
        try {
            const response = await axios.get('http://43.203.241.42/user/get-userinfo', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 포함
                },
            });

            if (response.status === 200) {
                console.log('유저정보 불러오기 성공:', response.data);
                const { shop_name, shop_number, location, detaillocation } = response.data;
                setStoreName(shop_name);
                setNumber(shop_number);
                setLocation(location);
                setDetailLocation(detaillocation);
            }
        } catch (error) {
            console.log(error.response);
        }
    };
    const PCView = () => {
        return (
            <Container>
                <TextContainer>가게 정보</TextContainer>
                <StoreContainer>
                    <StoreNameContainer>
                        <StoreProfile src={profile_img} />
                        {storeName}
                    </StoreNameContainer>
                    <StoreInfoContainer>
                        <StoreDetailPage>
                            <StoreImageContainer src={shop_img} />
                            <StoreDetailInform>
                                <StoreWorkTime>영업시간 : {workTime}</StoreWorkTime>
                                <StoreNumber>매장 전화번호 : {number}</StoreNumber>
                            </StoreDetailInform>
                            <StoreLocationContainer>
                                <StoreLocation>주소 : {location}</StoreLocation>
                                <StoreDetailLocation>상세주소 : {detailLocation}</StoreDetailLocation>
                            </StoreLocationContainer>
                            {!isTablet ? <PCEditContainer /> : null}
                        </StoreDetailPage>
                    </StoreInfoContainer>
                </StoreContainer>
                {isTablet ? <TabletEditContainer /> : null}
                <TextContainer>리뷰조회</TextContainer>
                <div style={{ margin: '0 0 10px 5px' }}>등록된 리뷰가 없습니다</div>
                <TextContainer>문의내역</TextContainer>
                <div style={{ margin: '0 0 10px 5px' }}>등록된 문의가 없습니다</div>
            </Container>
        );
    };

    const MobileView = () => {
        return (
            <Container>
                <TextContainer>가게 정보</TextContainer>
                <StoreContainer>
                    <StoreNameContainer>
                        <StoreProfile src={profile_img} />
                        {storeName}
                    </StoreNameContainer>
                    <StoreDetailPage>
                        <StoreImageContainer src={shop_img} />
                        <StoreDetailInform>
                            <StoreWorkTime>
                                영업시간 <br /> {workTime}
                            </StoreWorkTime>
                            <StoreNumber>
                                매장 전화번호 <br /> {number}
                            </StoreNumber>
                        </StoreDetailInform>
                    </StoreDetailPage>
                    <StoreLocationContainer>
                        <StoreLocation>주소 : {location}</StoreLocation>
                        <StoreDetailLocation>상세주소 : {detailLocation}</StoreDetailLocation>
                    </StoreLocationContainer>
                </StoreContainer>
                <TextContainer>리뷰조회</TextContainer>
                <div style={{ margin: '0 0 10px 5px' }}>등록된 리뷰가 없습니다</div>
                <TextContainer>문의내역</TextContainer>
                <div style={{ margin: '0 0 10px 5px' }}>등록된 문의가 없습니다</div>
            </Container>
        );
    };
    const PCEditContainer = () => {
        return (
            <ButtonContainer>
                {isEditing ? (
                    <>
                        <Input type="text" value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} placeholder="가게 이름" />
                        <Input type="text" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder="전화번호" />
                        <Input type="text" value={newWorkTime} onChange={(e) => setNewWorkTime(e.target.value)} placeholder="영업시간" />
                        <Input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="주소" />
                        <Input type="text" value={newDetailLocation} onChange={(e) => setNewDetailLocation(e.target.value)} placeholder="상세주소" />
                        <Button onClick={handleSaveClick}>저장</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleEditClick}>수정</Button>
                    </>
                )}
            </ButtonContainer>
        );
    };
    const TabletEditContainer = () => {
        return (
            <ButtonContainer>
                {isEditing ? (
                    <>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <EditText>
                                <Text>가게이름 : &nbsp; </Text>
                                <Text>전화번호 : &nbsp; </Text>
                                <Text>영업시간 : &nbsp; </Text>
                                <Text>주소 : &nbsp; </Text>
                                <Text>상세주소 : &nbsp; </Text>
                            </EditText>
                            <EditInput>
                                <Input type="text" value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} placeholder="가게 이름" />
                                <Input type="text" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder="전화번호" />
                                <Input type="text" value={newWorkTime} onChange={(e) => setNewWorkTime(e.target.value)} placeholder="영업시간" />
                                <Input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="주소" />
                                <Input type="text" value={newDetailLocation} onChange={(e) => setNewDetailLocation(e.target.value)} placeholder="상세주소" />
                            </EditInput>
                        </div>

                        <Button onClick={handleSaveClick}>저장</Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleEditClick}>정보 수정</Button>
                    </>
                )}
            </ButtonContainer>
        );
    };

    return <div style={{ width: '100%' }}>{isMobile ? <MobileView /> : <PCView />}</div>;
}
//전체컨테이너
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (max-width: 800px) {
        padding: 10px 0 0 0;
    }
`;
//해당 정보 명시 컨테이너
const TextContainer = styled.div`
    font-weight: bold;
    font-size: 20px;
    border-bottom: 1px solid black;
    padding: 0 0 8px 5px;
    margin-bottom: 10px;
    @media (max-width: 860px) {
        font-size: 16px;
    }
`;
//가게정보 컨테이너
const StoreInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
//가게 컨테이너
const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    border: black 2px solid;
    margin: 0 auto 10px auto;
    width: 100%;
    @media (max-width: 1200px) {
        width: 100%;
    }
    @media (max-width: 860px) {
        width: 95%;
    }
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
    display: flex;
    background-color: #faf6e3;
    font-weight: bold;
    font-size: 20px;
    justify-content: center;
    border-radius: 20px 20px 0 0px;
    align-items: center;
`;
//가게 상세정보 컨테이너
const StoreDetailPage = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px black solid;
    justify-content: space-between;
    @media (min-width: 700px) {
        border-bottom: 0px solid black;
    }
    @media (max-width: 1100px) {
        justify-content: left;
    }
`;
//가게 이미지 컨테이너
const StoreImageContainer = styled.div`
    width: 300px;
    height: 225px;
    background-image: url(${shop_img});
    background-size: cover;
    background-position: center center;
    @media (min-width: 700px) {
        border-radius: 0 0 0 18px;
    }
    @media (max-width: 1500px) {
        width: 300px;
        height: 225px;
    }
    @media (max-width: 1350px) {
        width: 280px;
        height: 210px;
    }
    @media (max-width: 1200px) {
        width: 260px;
        height: 195px;
    }
    @media (max-width: 850px) {
        width: 150px;
        height: 120px;
        margin-right: 10px;
    }
`;
const StoreDetailInform = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;
const StoreWorkTime = styled.div`
    font-size: 20px;
    @media (max-width: 1500px) {
        font-size: 17.5px;
    }
    @media (max-width: 1350px) {
        font-size: 16px;
    }
    @media (max-width: 1200px) {
        font-size: 14.5px;
    }
    @media (max-width: 860px) {
        font-size: 13px;
    }
`;

const StoreNumber = styled.div`
    font-size: 20px;
    @media (max-width: 1500px) {
        font-size: 17.5px;
    }
    @media (max-width: 1350px) {
        font-size: 16px;
    }
    @media (max-width: 1200px) {
        font-size: 14.5px;
    }
    @media (max-width: 860px) {
        font-size: 13px;
    }
`;
const StoreLocation = styled.div`
    font-size: 20px;
    @media (max-width: 1500px) {
        font-size: 17.5px;
    }
    @media (max-width: 1350px) {
        font-size: 16px;
    }
    @media (max-width: 1200px) {
        font-size: 14.5px;
    }
    @media (max-width: 860px) {
        font-size: 13px;
    }
`;
const StoreDetailLocation = styled.div`
    font-size: 20px;
    @media (max-width: 1500px) {
        font-size: 17.5px;
    }
    @media (max-width: 1350px) {
        font-size: 16px;
    }
    @media (max-width: 1200px) {
        font-size: 14.5px;
    }
    @media (max-width: 860px) {
        font-size: 13px;
    }
`;
const StoreLocationContainer = styled.div`
    padding: 8px;
`;
//버튼 컨테이너
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-right: 20px;
    align-items: center;
    @media (max-width: 1650px) {
        width: 25%;
    }
    @media (max-width: 1250px) {
        width: 22%;
    }
    @media (max-width: 1100px) {
        width: 50%;
        margin: auto;
    }
`;
const Input = styled.input`
    font-size: 14px;
    padding: 5px;
    max-height: 20px;
    margin-bottom: 6px;
    @media (max-width: 1100px) {
        width: 100%;
    }
    @media (max-width: 800px) {
        width: 100%;
    }
`;
const Text = styled.div`
    font-size: 14px;
    padding: 5px;
    max-height: 20px;
    margin-bottom: 6px;
    text-align: right;
`;
const Button = styled.button`
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    margin: 0 0 5px 0;
    color: white;
    border: none;
    border-radius: 5px;
    &:hover {
        background-color: #0056b3;
    }
    @media (max-width: 1650px) {
        font-size: 14px;
    }
    @media (max-width: 1500px) {
        font-size: 12px;
    }
`;
const EditText = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
`;
const EditInput = styled.div`
    display: flex;
    flex-direction: column;
`;
