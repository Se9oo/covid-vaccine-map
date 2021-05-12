import React, { useCallback, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import SelectLocation from './SelectLocation';

const Header = ({ onChangeMapData }) => {
  const [showSearch, setShowSearch] = useState(false);

  const ChangeShowSearch = useCallback(() => {
    setShowSearch((prev) => {
      return !prev;
    });
  }, []);

  return (
    <StyledHeader>
      <Main>
        <Title>COVACMAP</Title>
        <SearchIcon onClick={ChangeShowSearch} />
      </Main>
      {showSearch && (
        <SelectArea>
          <SelectLocation onChangeMapData={onChangeMapData} />
        </SelectArea>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  z-index: 999;
`;

const Main = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  padding: 0 1rem;
  font-size: 2rem;
  font-weight: 900;
`;

const SearchIcon = styled(SearchOutlined)`
  padding: 0 1rem;
  font-size: 2rem;
  cursor: pointer;
`;

const SelectArea = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  z-index: 999;
`;
