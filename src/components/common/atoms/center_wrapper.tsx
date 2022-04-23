import React from 'react';
import styled from 'styled-components';

const CenterWrapperStyle = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;

interface Props {
  children: JSX.Element;
}

export default function CenterWrapper({ children }: Props) {
  return (
    <CenterWrapperStyle>
      {children}
    </CenterWrapperStyle>
  )
}