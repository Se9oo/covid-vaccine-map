import React, { useEffect } from 'react';
import { locationData } from '../data/data';
import styled from 'styled-components';

const { kakao } = window;

const VaccineMap = () => {
  useEffect(() => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const options = {
        //center: new kakao.maps.LatLng(37.506502, 127.053617),
        center: new kakao.maps.LatLng(37.567817, 127.004501),
        level: 5,
      };

      const map = new kakao.maps.Map(mapContainer, options);

      locationData.data.forEach((data) => {
        // marker setting
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data.lng, data.lat),
          title: data.centerName,
          clickable: true,
        });

        marker.setMap(map);

        // overlay setting
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

        kakao.maps.event.addListener(marker, 'click', function () {
          overlay.isClicked ? overlay.setMap(null) : overlay.setMap(map);

          overlay.isClicked = !overlay.isClicked;
        });
      });
    });
  }, []);

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
