import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const TitleStyle = styled.h2`
  font-family: 'Roboto', sans-serif;
  text-align:center;
  margin: 12px 0px;

  a{
    color:${({ theme }) => theme.mainColor};
    text-decoration: none;
  }
`;

interface Props {
  children: JSX.Element | string;
}

export default function Title({ children }: Props) {

  return (
    <TitleStyle>
      <Link to="/">
        {children}
      </Link>
    </TitleStyle>
  )
}