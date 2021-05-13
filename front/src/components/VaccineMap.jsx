import React, { useEffect, useState } from 'react';
import { locationData } from '../data/data';
import styled from 'styled-components';

const { kakao } = window;

const TestVaccineMap = ({ mapData = '' }) => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [overlays, setOverlays] = useState([]);

  const createMap = () => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.567817, 127.004501),
        level: 5,
      };

      const map = new kakao.maps.Map(mapContainer, options);
      setKakaoMap(map);
    });
  };

  const createMarkersAndOverlays = () => {
    const markerData = mapData === '' ? locationData.data : mapData;
    const markerArray = [];
    const overlayArray = [];

    markerData.map((location, idx) => {
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(location.lng, location.lat),
        title: location.centerName,
        clickable: true,
      });

      // 검색한 지역의 첫번째 예방접종 병원위치로 map 이동
      if (kakaoMap !== null && idx === 0) {
        console.log(kakaoMap);
        kakaoMap.panTo(new kakao.maps.LatLng(location.lng, location.lat));
      }

      const overlay = new kakao.maps.CustomOverlay({
        content: `
          <div class="Container">
            <div class="OverlayContainer">
              <div class="title">
                <h2>
                  ${location.facilityName}
                </h2>
              </div>
              <div class="content">
                <dl>
                  <div class="content-item">
                    <dt>우편번호</dt>
                    <dd>${location.zipCode}</dd>
                  </div>
                  <div class="content-item">
                    <dt>주소</dt>
                    <dd>${location.address}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div class="triangle"></div>
          </div>
        `,
        position: new kakao.maps.LatLng(location.lng, location.lat),
        yAnchor: 1.3,
        isClicked: false,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        overlay.isClicked ? overlay.setMap(null) : overlay.setMap(kakaoMap);

        overlay.isClicked = !overlay.isClicked;
      });

      markerArray.push(marker);
      overlayArray.push(overlay);

      marker.setMap(kakaoMap);
    });

    setMarkers(markerArray);
    setOverlays(overlayArray);
  };

  const clearMarkersAndOverlays = () => {
    markers.map((marker) => {
      marker.setMap(null);
    });

    overlays.map((overlay) => {
      overlay.setMap(null);
    });
  };

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    clearMarkersAndOverlays();
    map && locationData.data.length && createMarkersAndOverlays();
  }, [kakaoMap, mapData]);

  return <MapContainer id="map"></MapContainer>;
};

export default TestVaccineMap;

const MapContainer = styled.section`
  width: 100%;
  height: 100%;

  & .Container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .OverlayContainer {
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.6);

    & .title {
      display: flex;
      aligin-items: center;
      border-bottom: 1px solid #e5e5e5;

      & h2 {
        width: 100%;
        padding: 1rem;
        font-size: 1.8rem;
        font-weight: 700;
      }
    }

    & .content {
      padding: 1rem;

      & .content-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;

        & dt {
          margin-right: 1rem;
          font-weight: 700;
        }

        & dt::after {
          content: ' :';
        }
      }
    }
  }

  & .triangle {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 1rem;
    border-color: #ffffff transparent transparent transparent;
  }
`;
