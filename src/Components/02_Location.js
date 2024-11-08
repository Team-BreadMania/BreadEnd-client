import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Location() {
    useEffect(() => {
        const loadKakaoMap = () => {
            const mapApi = process.env.MAP_API_KEY1;
            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${mapApi}`; // 환경변수에서 API 키 가져오기
            script.async = true;
            script.onload = () => {
                const mapContainer = document.getElementById('map'); // 지도를 표시할 div
                const mapOption = { 
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

                // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
                new window.kakao.maps.Map(mapContainer, mapOption);
            };
            document.head.appendChild(script);
        };

        loadKakaoMap();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <MapContainer id="map">
            내위치
        </MapContainer>
    );
}

const MapContainer = styled.div`
    width: 100%;
    height: 350px;
`;
