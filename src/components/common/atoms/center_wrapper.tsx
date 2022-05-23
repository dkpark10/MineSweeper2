import React from 'react';
import styled from 'styled-components';

const CenterWrapperStyle = styled.main`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;

export const MarginCenterWrapper = styled.div`
  margin:auto;
`;

export default CenterWrapperStyle;