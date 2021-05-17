import React from 'react';
import { locationData } from '../data/data';
import styled from 'styled-components';
import LocationListItem from './LocationListitem';

const LocationList = ({ mapData = '', setSelectLocation }) => {
  const data = mapData === '' ? locationData.data : mapData;

  return (
    <StyledList>
      {data.map((location) => {
        return <LocationListItem key={location.id} location={location} setSelectLocation={setSelectLocation} />;
      })}
    </StyledList>
  );
};

export default LocationList;

const StyledList = styled.ul`
  display: none;

  @media ${(props) => props.theme.laptop} {
    display: block;
    width: 100%;
    height: calc(100% - 50px - 20%);
    padding: 1rem;
    overflow-y: auto;
  }
`;
