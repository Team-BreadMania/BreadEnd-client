import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";

export default function ShopLocation({ address }) {

    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (address) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    if (result && result[0]) {
                        const { y, x } = result[0]; 
                        setPosition({ lat: parseFloat(y), lng: parseFloat(x) });
                    } else {
                        console.error("좌표를 찾을 수 없습니다.");
                    }
                } else {
                    console.error("주소 변환 실패 :", status);
                }
            });
        }
    }, [address]);

    return (
        <Container>
            <Map style = {{width: "100%", height: "100%"}} level = {3} center = {position || {lat: 33.450701, lng: 126.570667}}> 
                {position && (
                    <MapMarker position = {position}/>
                )}
                <MapTypeControl position = {{top: 10, right: 10}} />
                <ZoomControl position = {{top: 50, right: 10}} />
            </Map>
        </Container>
    );
}

// 아래부터 styled-components CSS 설정

const Container = styled.div` // 최상단 컨테이너
    width: 100%;
    height: 100%;
    position: relative;
`;