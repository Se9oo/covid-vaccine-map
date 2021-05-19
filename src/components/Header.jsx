import React, { useCallback, useEffect, useState } from 'react';
import SelectLocation from './SelectLocation';
import LocationList from './LocationList';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Header = ({ mapData, onChangeMapData, setSelectLocation }) => {
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
        <Title>CoVacMap</Title>
        <SearchIcon onClick={ChangeShowSearch} />
      </Main>
      {showSearch && (
        <>
          <SelectArea>
            <SelectLocation onChangeMapData={onChangeMapData} />
          </SelectArea>
          <LocationList mapData={mapData} setSelectLocation={setSelectLocation} />
        </>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: relative;
  height: auto;
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
  margin: 0;
  background-color: #ffffff;

  @media ${(props) => props.theme.laptop} {
    position: static;
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
  padding: 1rem;
  background-color: #ffffff;
  z-index: 999;

  @media ${(props) => props.theme.laptop} {
    position: static;
    display: block;
    width: 390px;
  }
`;
