import React, { useCallback } from 'react';
import styled from 'styled-components';

const LocationListItem = ({ location, setSelectLocation }) => {
  const onClickLocation = useCallback(() => {
    setSelectLocation(location);
  }, []);

  return (
    <StyledListItem onClick={onClickLocation}>
      <Title>{location.facilityName}</Title>
    </StyledListItem>
  );
};

export default LocationListItem;

const StyledListItem = styled.li`
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
`;

const Title = styled.strong`
  font-size: 1.4rem;
`;
