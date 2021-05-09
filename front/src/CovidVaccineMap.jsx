import React from 'react';
import Header from './components/Header';
import VaccineMap from './components/VaccineMap';
import GlobalStyles, { theme } from './common/GlobalStyles';
import 'antd/dist/antd.css';
import styled, { ThemeProvider } from 'styled-components';

const CovidVaccineMap = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header />
          <VaccineMap />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CovidVaccineMap;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
