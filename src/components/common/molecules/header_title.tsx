import React from 'react';
import styled from 'styled-components';
import Hamburger from '../atoms/hamburger';
import Title from '../atoms/title';

export const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding:0px 14px;
  font-family: 'Roboto', sans-serif;
`;

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function HeaderTitle({
  onClick
}: Props) {
  return (
    <>
      <HeaderTitleWrapper>
        <Hamburger
          onClick={onClick}
        />
        <Title>Mine Sweeper</Title>
      </HeaderTitleWrapper>
    </>
  )
}