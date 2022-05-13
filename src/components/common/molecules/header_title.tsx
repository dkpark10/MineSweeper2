import React from 'react';
import styled from 'styled-components';
import Hamburger from '../atoms/hamburger';

export const HeaderTitleWrapper = styled.div`
  color:${({ theme }) => theme.mainColor};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding:0px 14px;
  font-family: 'Roboto', sans-serif;
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
        <h2>
          Mine Sweeper
        </h2>
      </HeaderTitleWrapper>
    </>
  )
}