import React from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
  value: string;
  width: string;
  height: string;
}

const Input = styled('input').attrs(({
  type,
  value
}: Props) => ({
  style: {
    type,
    value
  }
})) <Props>`
  font-family: 'Noto Sans KR', sans-serif;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  outline:none;
  border:none;
`;

export default Input;