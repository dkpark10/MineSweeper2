import { useState } from 'react';
import styled from 'styled-components';

interface IInputStyle {
  value: string;
  width: string;
  height: string;
  backgroundColor: string;
}

const InputStyle = styled('input').attrs((props: IInputStyle) => ({
  style: {
    type: 'text',
    value: props.value
  }
})) <IInputStyle>`
  width: ${({ width }) => width}rem;
  height:${({ height }) => height}rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 7px;
  border:none;
  margin-right: 0.7rem;

  &:focus {
    border: 2px solid ${({ theme }) => theme.mainColor};
  }
`;

const InputText = ({ width, height, backgroundColor }: Partial<IInputStyle>) => {

  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(value);
  }

  return (
    <>
      <InputStyle
        value={value}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        onChange={onChange}
      />
    </>
  )
}

export default InputText;