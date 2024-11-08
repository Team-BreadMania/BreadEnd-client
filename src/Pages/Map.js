import React, { useEffect } from 'react';

export default function Map() {
  useEffect(() => {
    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 수준
        };
        new window.kakao.maps.Map(container, options);
      } else {
        console.error("Kakao map library is not loaded.");
      }
    };

    // 카카오맵 스크립트가 로드될 때까지 대기
    const checkScriptLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkScriptLoaded);
        initializeMap(); // 스크립트가 로드되면 초기화 진행
      }
    }, 100); // 100ms 간격으로 체크

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearInterval(checkScriptLoaded);
    };
  }, []);

  return (
    <div>
      <style>{`
        #map {
          width: 100%;
          height: 400px;
        }

        @media (max-width: 768px) {
          #map {
            height: 300px;
          }
        }
      `}</style>

      <h1>내 주변 가게</h1>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}
