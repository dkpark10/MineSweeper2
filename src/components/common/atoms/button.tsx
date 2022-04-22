import React from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
  height: string;
  children: JSX.Element | string | number;
  border?:string;
  radius?:string;
};

export const StyleButton = styled.button<Props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({border}) => border};
  border-radius: ${({ radius }) => radius};
  color: black;
  cursor:pointer;
`;

export default function Button({
  width,
  height,
  border='none',
  radius='0px',
  children }: Props) {

  return (
    <>
      <StyleButton
        width={width}
        height={height}
        border={border}
        radius={radius}
      >
        {children}
      </StyleButton>
    </>
  )
}
