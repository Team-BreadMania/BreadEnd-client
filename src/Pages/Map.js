import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Map() {
  const [shops, setShops] = useState([]); // 매장 데이터 상태
  const [mapCenter, setMapCenter] = useState(null); // 지도 초기 중심 좌표
  const mapRef = useRef(null);
  const navigate = useNavigate();

  // 1. 매장 데이터 가져오기
  useEffect(() => {
    const fetchShops = async () => {
      const accessToken = Cookies.get("accessToken");

      try {
        const response = await axios.get("https://breadend.shop/home/close-shop", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const shopsData = response.data;
        setShops(shopsData);

        // 중심 좌표 설정
        if (shopsData.length > 0) {
          const firstShop = shopsData[0];
          const { location } = firstShop; // 예: "경기도 성남시 분당구 판교동"
          const dong = location.split(" ").pop(); // "판교동" 추출
          setInitialMapCenter(dong);
        }
      } catch (error) {
        console.error("매장 데이터를 가져오는데 실패했습니다.", error);
      }
    };

    const setInitialMapCenter = (dong) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(dong, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          setMapCenter(coords); // 중심 좌표 설정
        } else {
          console.error("초기 중심 좌표 설정 실패:", status);
          setMapCenter(new window.kakao.maps.LatLng(37.5665, 126.9780)); // 서울시청 기본 좌표
        }
      });
    };

    fetchShops();
  }, []);

  // 2. 지도 초기화 및 마커 표시
  useEffect(() => {
    if (mapCenter && shops.length > 0 && window.kakao && window.kakao.maps) {
      console.log("지도 초기화 및 마커 표시 시작");
      const container = document.getElementById("map");
      const options = {
        center: mapCenter, // 초기 중심 좌표
        level: 3, // 초기 줌 레벨
      };

      // 지도 초기화
      const mapInstance = new window.kakao.maps.Map(container, options);
      mapRef.current = mapInstance;

      // 마커 표시
      displayMarkers(shops, mapInstance);
    }
  }, [mapCenter, shops]);

  // 3. 마커 표시 로직
  const displayMarkers = (shopsData, mapInstance) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const bounds = new window.kakao.maps.LatLngBounds();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    shopsData.forEach((shop) => {
      geocoder.addressSearch(shop.detaillocation, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            map: mapInstance,
            position: coords,
          });

          // 마커 클릭 이벤트 등록
          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(`
              <div style="padding:5px;font-size:12px;">
                <img src="${shop.shopIMG}" alt="${shop.shop_name}" style="width:100px;height:60px;object-fit:cover;border-radius:5px;"/><br>
                <strong>${shop.shop_name}</strong><br>
                ${shop.detaillocation}<br>
                <a href="/ShopProduct?id=${shop.shopid}" target="_self">상세보기</a>
              </div>
            `);
            infowindow.open(mapInstance, marker);
          });

          bounds.extend(coords); // 영역 확장
        } else {
          console.error("마커 표시 실패:", shop.detaillocation);
        }
      });
    });

    // 지도의 경계 설정
    setTimeout(() => {
      mapInstance.setBounds(bounds); // 모든 마커가 보이도록 지도 설정
    }, 100); // 마커 생성 후 약간의 지연을 추가
  };

  const handleShopClick = (shopId) => {
    navigate(`/ShopProduct?id=${shopId}`);
  };

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

    .shop-list {
      width: 28%;
      max-height: 600px;
      overflow-y: auto;
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ddd;
      border-radius: 10px;
      background: #fffaf0;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .shop-item {
      display: flex;
      align-items: center; /* 이미지와 텍스트를 세로 정렬 */
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      transition: background-color 0.3s ease; /* 배경색 변경 애니메이션 */
    }

    .shop-item:hover {
      background-color: #fef1b3;
    }

    .shop-img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      object-fit: cover;
      margin-right: 15px; /* 이미지와 텍스트 간 간격 */
      flex-shrink: 0; /* 이미지 크기 고정 */
    }

    .shop-details {
      display: flex;
      flex-direction: column; /* 텍스트 세로 정렬 */
      justify-content: center; /* 텍스트가 가운데 정렬되도록 설정 */
    }

    .shop-name {
      font-size: 16px;
      font-weight: bold;
      color: #ff6347;
      margin-bottom: 5px; /* 이름과 주소 간격 */
    }

    .shop-address {
      font-size: 14px;
      color: gray;
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

      .shop-list {
        width: 100%;
        max-height: 300px;
        margin-top: 10px;
      }
    }
  `}</style>

  <div id="map"></div>

  <ul className="shop-list">
    {shops.map((shop) => (
      <li key={shop.shopid} className="shop-item" onClick={() => handleShopClick(shop.shopid)}>
        <img src={shop.shopIMG} alt={shop.shop_name} className="shop-img" />
        <div className="shop-details">
          <div className="shop-name">{shop.shop_name}</div>
          <div className="shop-address">{shop.detaillocation}</div>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}
