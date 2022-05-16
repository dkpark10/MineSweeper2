import React from 'react';
import styled from 'styled-components';
import Hamburger from '../atoms/hamburger';
import { Link } from "react-router-dom";

export const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding:0px 14px;
  font-family: 'Roboto', sans-serif;

  a{
    color:${({ theme }) => theme.mainColor};
    text-decoration: none;
  }
`;

interface Props {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function HeaderTitle({
  onClick
}: Props) {
  return (
    <>
      <HeaderTitleWrapper onClick={onClick}>
        <Hamburger />
        <Link to="/">
          <h2>
            Mine Sweeper
          </h2>
        </Link>
      </HeaderTitleWrapper>
    </>
  )
}