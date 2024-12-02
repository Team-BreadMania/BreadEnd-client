import React from 'react';
import styled from 'styled-components';
import Temperate from '../Images/Temperate.png';

const ThermometerContainer = styled.div`
    width: 300px; /* 가로 길이 */
    height: 30px; /* 세로 길이 */
    background-color: #f2f2f2; /* 배경색 */
    border-radius: 30px; /* 모서리 둥글게 */
    position: relative; /* 자식 요소의 절대 위치를 위한 설정 */
    overflow: hidden; /* 자식 요소가 컨테이너를 넘지 않도록 */
    @media (max-width: 800px) {
        width: 150px; /* 가로 길이 */
        height: 20px; /* 세로 길이 */
    }
    @media (max-width: 450px) {
        width: 90px; /* 가로 길이 */
        height: 12px; /* 세로 길이 */
    }
`;

const Thermometer = styled.div`
    height: 100%; /* 전체 높이 */
    width: ${(props) => props.percentage}%; /* 비율에 따라 너비 설정 */
    background-color: ${(props) => {
        if (props.percentage >= 80) {
            return '#00b894'; // 초록색
        } else if (props.percentage >= 50) {
            return '#ffa500'; // 주황색
        } else {
            return '#e74c3c'; // 빨간색
        }
    }};
    border-radius: 30px; /* 모서리 둥글게 */
    transition: width 0.5s ease-in-out; /* 애니메이션 효과 */
`;

const Label = styled.div`
    position: absolute; /* 절대 위치 */
    top: 50%; /* 수직 중앙 */
    left: 50%; /* 수평 중앙 */
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    font-size: 18px; /* 글자 크기 */
    font-weight: bold; /* 글자 두께 */
    color: #fff; /* 글자 색상 */
    @media (max-width: 800px) {
        font-size: 12px; /* 글자 크기 */
    }
`;

const TemperatureLabel = styled.span`
    display: block; /* 블록 요소로 설정 */
    font-size: 14px; /* 글자 크기 */
    color: #666; /* 글자 색상 */
    text-align: center; /* 중앙 정렬 */
    margin-top: 5px; /* 위쪽 여백 */
`;

const MannerTemperature = ({ percentage = 0 }) => {
    return (
        <ThermometerContainer>
            <Thermometer percentage={percentage} />
            <Label>{percentage.toFixed(0)} ℃</Label>
            <TemperatureLabel>매너온도</TemperatureLabel>
        </ThermometerContainer>
    );
};

export default MannerTemperature;
