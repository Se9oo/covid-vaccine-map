import React from 'react';
import { Button, Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const SelectLocation = () => {
  return (
    <Container>
      <label>시/도</label>
      <StyledSelect placeholder="시/도">
        <Option value="seoul">서울특별시</Option>
      </StyledSelect>
      <label>시/군/구</label>
      <StyledSelect placeholder="시/군/구">
        <Option value="songpa">송파구</Option>
      </StyledSelect>
      <StyledButton type="primary">검색</StyledButton>
    </Container>
  );
};

export default SelectLocation;

const Container = styled.div`
  & label {
    display: block;
    margin-bottom: 1rem;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
