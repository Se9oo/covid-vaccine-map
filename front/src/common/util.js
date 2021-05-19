import { locationData } from '../data/data';

export function getSelectOptionSido() {
  const sidoSet = new Set();

  locationData.data.map((info) => {
    sidoSet.add(info.sido);
  });

  const result = [...sidoSet];

  return result;
}

export function getSelectOptionSigungu(sido) {
  const sigunguSet = new Set();

  locationData.data.map((info) => {
    if (info.sido === sido) {
      sigunguSet.add(info.sigungu);
    }
  });

  const result = [...sigunguSet];

  return result;
}

export function getMapData(sido, sigungu) {
  // 시/도 값이 없다면 전체 조회
  const mapData =
    sido === null
      ? locationData.data
      : locationData.data.filter((info) => {
          return sigungu === null ? info.sido === sido : info.sido === sido && info.sigungu === sigungu;
        });

  return mapData;
}
