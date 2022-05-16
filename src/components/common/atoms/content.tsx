import React from "react";
import styled from "styled-components";

interface Props {
  fontSize?: string;
  hoverFontColor?: string;
  bold?: boolean;
  block?: boolean;
  fontColor?: boolean;
  margin?:string;
}

export default styled.span<Props>`
  display:${({ block }) => block === true ? "block" : ""};
  color: ${({ fontColor, theme }) => fontColor === true ? theme.mainColor : theme.fontColor};
  font-size: ${({ fontSize }) => fontSize || "1.0rem"};
  font-weight: ${({ bold }) => bold === true ? "bold" : ""};
  margin: ${({margin}) => margin};

  &:hover{
    color: ${({ hoverFontColor }) => hoverFontColor};
  }
`;