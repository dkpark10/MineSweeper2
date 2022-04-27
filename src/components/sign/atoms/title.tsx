import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.h1`
  color:${({theme}) => theme.mainColor};
  text-align:center;
  margin: 15px 0px;
`;

interface Props{
  children: JSX.Element | string;
}

export default function Title({children}: Props){
  return <TitleStyle>{children}</TitleStyle>
}