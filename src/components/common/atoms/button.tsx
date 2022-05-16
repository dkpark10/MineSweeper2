import React from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
  height: string;
  children: JSX.Element | string | number;
  color?:string;
  border?:string;
  radius?:string;
};

export default styled.button<Props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ radius }) => radius || "0px"};
  color: ${({ color }) => color || "black"};
  cursor:pointer;
`;