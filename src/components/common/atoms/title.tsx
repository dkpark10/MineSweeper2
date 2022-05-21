import React from 'react';
import styled, { useTheme } from 'styled-components';

interface Props {
  children: JSX.Element | string;
  fontSize?: string;
  fontColor?: string;
}

const TitleStyle = styled.div<Props>`
  font-family: 'Roboto', sans-serif;
  text-align:center;
  margin: 1.2rem 0px;
  font-size: ${({ fontSize }) => fontSize};
  color:${({ fontColor }) => fontColor};
`;

export default function Title({
  children,
  fontSize = "1.54rem",
  fontColor = useTheme().mainColor
}: Props) {

  return (
    <TitleStyle
      fontSize={fontSize}
      fontColor={fontColor}
    >
      {children}
    </TitleStyle>
  )
}