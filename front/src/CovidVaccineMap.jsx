import React, { useCallback, useState } from 'react';
import Header from './components/Header';
import VaccineMap from './components/VaccineMap';
import GlobalStyles, { theme } from './common/GlobalStyles';
import 'antd/dist/antd.css';
import styled, { ThemeProvider } from 'styled-components';

const CovidVaccineMap = () => {
  const [mapData, setMapData] = useState('');
  const [selectLocation, setSelectLocation] = useState(null);

  const onChangeMapData = useCallback((data) => {
    setMapData(data);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header mapData={mapData} onChangeMapData={onChangeMapData} setSelectLocation={setSelectLocation} />
          <VaccineMap mapData={mapData} selectLocation={selectLocation} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CovidVaccineMap;

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100vh;

  @media ${(props) => props.theme.laptop} {
    display: flex;
    aligin-items: center;
  }
`;
