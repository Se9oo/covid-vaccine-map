import React, { useCallback, useEffect, useState } from 'react';
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

  const handleResize = () => {
    if (window.innerWidth >= 980 && !showSearch) {
      setShowSearch(true);
    }
  };

  useEffect(() => {
    window.innerWidth < 980 ? setShowSearch(false) : setShowSearch(true);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  @media ${(props) => props.theme.laptop} {
    width: 390px;
    margin: 0;
  }
`;

const Title = styled.h1`
  padding: 0 1rem;
  font-size: 2rem;
  font-weight: 900;
`;

const SearchIcon = styled(SearchOutlined)`
  display: block;
  padding: 0 1rem;
  font-size: 2rem;
  cursor: pointer;

  @media ${(props) => props.theme.laptop} {
    display: none;
  }
`;

const SelectArea = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
  padding: 1rem;
  background-color: #ffffff;
  z-index: 999;

  @media ${(props) => props.theme.laptop} {
    display: block;
    width: 390px;
    height: calc(100vh - 50px);
  }
`;
