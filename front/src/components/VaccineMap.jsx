import React, { useEffect, useState } from 'react';
import { locationData } from '../data/data';
import styled from 'styled-components';

const { kakao } = window;

// kakao map 생성
function loadKakaoMap(setKakaoMap) {
  const mapContainer = document.getElementById('map');

  const options = {
    center: new kakao.maps.LatLng(37.567817, 127.004501),
    level: 5,
  };

  const map = new kakao.maps.Map(mapContainer, options);

  setKakaoMap(map);
}

// 지도에 그릴 marker, overlay 생성
function createMarkerAndOverlay(mapData = '', setMarkers, setOverlays) {
  const markerData = mapData === '' ? locationData.data : mapData;
  const markerArray = [];
  const overlayArray = [];

  markerData.map((data) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(data.lng, data.lat),
      title: data.centerName,
      clickable: true,
    });

    const overlay = new kakao.maps.CustomOverlay({
      content: `
        <div class="Container">
          <div class="OverlayContainer">
            <div class="title">
              <h2>
                ${data.facilityName}
              </h2>
            </div>
            <div class="content">
              <dl>
                <div class="content-item">
                  <dt>우편번호</dt>
                  <dd>${data.zipCode}</dd>
                </div>
                <div class="content-item">
                  <dt>주소</dt>
                  <dd>${data.address}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div class="triangle"></div>
        </div>
      `,
      position: new kakao.maps.LatLng(data.lng, data.lat),
      yAnchor: 1.3,
      isClicked: false,
    });

    markerArray.push(marker);
    overlayArray.push(overlay);
  });

  setMarkers(markerArray);
  setOverlays(overlayArray);
}

// 기존에 지도상에 있던 marker, overlay 제거
function clearMarkerAndOverlay(setMarkers, setOverlays) {
  setMarkers([]);
  setOverlays([]);
}

// 지도에 marker, overlay 세팅
function setMarkerAndOverlay(map, markers = [], overlays = []) {
  if (!map) {
    return;
  }

  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);

    kakao.maps.event.addListener(markers[i], 'click', function () {
      overlays[i].isClicked ? overlays[i].setMap(null) : overlays[i].setMap(map);

      overlays[i].isClicked = !overlays[i].isClicked;
    });
  }
}

const VaccineMap = ({ mapData = '' }) => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [overlays, setOverlays] = useState([]);

  // 초기 실행 (지도 생성)
  useEffect(() => {
    loadKakaoMap(setKakaoMap);
  }, []);

  // 지도 생성시 지도에 그릴 marker, overlay 생성
  useEffect(() => {
    createMarkerAndOverlay(mapData, setMarkers, setOverlays);
  }, [kakaoMap]);

  // marker, overlay 생성되면 지도에 marker, overlay 세팅
  useEffect(() => {
    setMarkerAndOverlay(kakaoMap, markers, overlays);
  }, [markers, overlays]);

  // 지역 검색으로 mapData가 바뀌면 기존 marker, overlay 제거
  useEffect(() => {
    clearMarkerAndOverlay(setMarkers, setOverlays);
  }, [mapData]);

  return <MapContainer id="map"></MapContainer>;
};

export default VaccineMap;

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
