import React, { useCallback, useEffect, useState } from 'react';
import { getSelectOptionSido, getSelectOptionSigungu, getMapData } from '../common/util';
import SelectBox from './SelectBox';
import { Button } from 'antd';
import styled from 'styled-components';

const SelectLocation = ({ onChangeMapData }) => {
  // 초기 시/도 저장 배열
  const sidoArray = getSelectOptionSido();
  // 선택한 시/도
  const [sido, setSido] = useState(null);
  // 선택한 시/군/구
  const [sigungu, setSigungu] = useState(null);
  // 선택한 시/도에 해당하는 시/군/구 배열
  const [sigunguArray, setSigunguArray] = useState([]);

  // 시/도 선택
  const onChangeSido = useCallback((optionValue) => {
    if (optionValue) {
      setSido(optionValue);
      // 시/도가 바뀌면 시/군/구 값을 초기화
      setSigungu(null);
    }
  }, []);

  // 시/군/구 선택
  const onChangeSigungu = useCallback((optionValue) => {
    if (optionValue) {
      setSigungu(optionValue);
    }
  }, []);

  const onClickSearchBtn = useCallback(() => {
    if (!sido) {
      alert('시/도를 선택하세요.');
      return;
    }

    const mapData = getMapData(sido, sigungu);

    onChangeMapData(mapData);
  }, [sido, sigungu]);

  // 시/도를 선택하면 해당 시/도에 속해있는 시/군/구 목록을 가져옴
  useEffect(() => {
    if (sido) {
      setSigunguArray(getSelectOptionSigungu(sido));
    }
  }, [sido]);

  return (
    <>
      <SelectBox data={sidoArray} placeholder="시/도" onChange={onChangeSido} value={sido} setValue={setSido} />
      <SelectBox
        data={sigunguArray}
        placeholder="시/군/구"
        onChange={onChangeSigungu}
        value={sigungu}
        setValue={setSigungu}
      />
      <StyledButton type="primary" onClick={onClickSearchBtn}>
        검색
      </StyledButton>
    </>
  );
};

export default SelectLocation;

const StyledButton = styled(Button)`
  width: 100%;
`;
