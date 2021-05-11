import React, { useCallback, useEffect, useState } from 'react';
import { getSelectOptionSido, getSelectOptionSigungu } from '../common/util';
import SelectBox from './SelectBox';
import { Button } from 'antd';
import styled from 'styled-components';

const SelectLocation = () => {
  // 초기 시/도 저장 배열
  const sidoArray = getSelectOptionSido();
  // 선택한 시/도
  const [sido, setSido] = useState('');
  // 선택한 시/군/구
  const [sigungu, setSigungu] = useState('');
  // 선택한 시/도에 해당하는 시/군/구 배열
  const [sigunguArray, setSigunguArray] = useState([]);

  // 시/도 선택
  const onChangeSido = useCallback((optionValue) => {
    if (optionValue) {
      setSido(optionValue);
    }
  }, []);

  // 시/군/구 선택
  const onChangeSigungu = useCallback((optionValue) => {
    if (optionValue) {
      setSigungu(optionValue);
    }
  }, []);

  // 시/도를 선택하면 해당 시/도에 속해있는 시/군/구 목록을 가져옴
  useEffect(() => {
    if (sido) {
      setSigunguArray(getSelectOptionSigungu(sido));
    }
  }, [sido]);

  return (
    <>
      <SelectBox data={sidoArray} placeholder="시/도" onChange={onChangeSido} />
      <SelectBox data={sigunguArray} placeholder="시/군/구" onChange={onChangeSigungu} />
      <StyledButton type="primary">검색</StyledButton>
    </>
  );
};

export default SelectLocation;

const StyledButton = styled(Button)`
  width: 100%;
`;
