import React from 'react';
import styled, { useTheme } from 'styled-components';

interface Props {
  children: JSX.Element | string;
  fontSize?: string;
  fontColor?: boolean;
  fontBold?: boolean;
}

const TitleStyle = styled.div<Props>`
  font-family: 'Roboto', sans-serif;
  margin: 1.2rem 0px;
  font-size: ${({ fontSize }) => fontSize || "1.54rem"};
  font-weight: ${({ fontBold }) => fontBold === true ? "bold" : ""};
  color:${({ fontColor, theme }) => fontColor === true ? theme.mainColor : theme.fontColor};
`;

export default function Title({
  children,
  fontSize,
  fontColor,
  fontBold
}: Props) {

  return (
    <TitleStyle
      fontSize={fontSize}
      fontColor={fontColor}
      fontBold={fontBold}
    >
      {children}
    </TitleStyle>
  )
}