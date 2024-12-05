import React, { useEffect, useRef, useState } from "react";

export default function Map() {
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 35.8388067878402, lng: 128.75332721754552 });
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng), // 초기 중심 좌표
          level: 3, // 초기 줌 레벨
        };
        mapRef.current = new window.kakao.maps.Map(container, options);

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(mapRef.current, "click", (mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setMapCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
          searchPlaces(latlng.getLat(), latlng.getLng());
        });

        searchPlaces(mapCenter.lat, mapCenter.lng, mapRef.current);
      } else {
        console.error("Kakao map library is not loaded.");
      }
    };

    // 빵집 검색 함수
    const searchPlaces = (lat, lng, mapInstance = mapRef.current) => {
      const ps = new window.kakao.maps.services.Places();
      const location = new window.kakao.maps.LatLng(lat, lng);

      ps.keywordSearch(
        "빵집",
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setPlaces(data); // 검색된 장소 데이터를 상태에 저장
            displayMarkers(data, mapInstance);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("근처에 검색된 빵집이 없습니다.");
          } else {
            console.error("검색 중 오류가 발생했습니다.");
          }
        },
        { location, radius: 2000 } // 중심 좌표와 반경 2km 설정
      );
    };

    // 지도에 마커 표시 함수
    const displayMarkers = (places, mapInstance) => {
      const bounds = new window.kakao.maps.LatLngBounds();
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: mapInstance,
          position: markerPosition,
        });

        // 마커 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(`
            <div style="padding:5px;font-size:12px;">
              ${place.place_name} <br>
              <a href="${place.place_url}" target="_blank">상세보기</a>
            </div>
          `);
          infowindow.open(mapInstance, marker);
        });

        bounds.extend(markerPosition);
      });

      mapInstance.setBounds(bounds);
    };

    // 카카오맵 스크립트 로드 체크
    const checkScriptLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkScriptLoaded);
        initializeMap();
      }
    }, 100);

    return () => {
      clearInterval(checkScriptLoaded);
    };
  }, [mapCenter]);

  return (
    <div className="container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          font-family: 'Roboto', sans-serif; /* 기본 폰트 설정 */
        }

        #map {
          width: 70%;
          height: 600px;
          border-radius: 10px;
          margin-right: 20px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .place-list {
          width: 28%;
          max-height: 600px;
          overflow-y: auto;
          padding: 0;
          margin: 0;
          list-style: none;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fffaf0;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          font-family: 'Roboto', sans-serif; /* 폰트 설정 */
        }

        .place-item {
          padding: 15px;
          border-bottom: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s, background-color 0.3s;
          cursor: pointer;
        }

        .place-item:hover {
          transform: scale(1.02);
          background-color: #fef1b3;
        }

        .place-item:last-child {
          border-bottom: none;
        }

        .place-name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          font-family: 'Roboto', sans-serif; /* 폰트 설정 */
          color: #ff6347;
        }

        .place-address {
          font-size: 14px;
          color: gray;
          font-family: 'Roboto', sans-serif; /* 폰트 설정 */
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          #map {
            width: 100%;
            height: 400px;
            margin-right: 0;
          }

          .place-list {
            width: 100%;
            max-height: 300px;
            margin-top: 10px;
          }
        }
      `}</style>

      <div id="map"></div>

      <ul className="place-list">
        {places.map((place) => (
          <li key={place.id} className="place-item" onClick={() => window.open(place.place_url, "_blank")}> {/* 클릭 기능 추가 */}
            <div className="place-name">{place.place_name}</div>
            <div className="place-address">{place.road_address_name || place.address_name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}