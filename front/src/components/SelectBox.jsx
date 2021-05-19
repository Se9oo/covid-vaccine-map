import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const SelectBox = ({ data, placeholder, onChange, value, setValue }) => {
  // select box clear
  const onClearSelect = () => {
    if (value === null) {
      return;
    }
    setValue(null);
  };

  return (
    <>
      <StyledLabel>{placeholder}</StyledLabel>
      <StyledSelect placeholder={placeholder} onChange={onChange} value={value} onClear={onClearSelect} allowClear>
        {data.length !== 0
          ? data.map((value) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })
          : null}
      </StyledSelect>
    </>
  );
};

export default SelectBox;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 1rem;
`;
