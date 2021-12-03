import styled from 'styled-components';

export interface IButton {
  width: string;
  height: string;
  backgroundColor: string;
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

const ButtonStyle = styled.button<Partial<IButton>>`
  width: ${({ width }) => width}rem;
  height:${({ height }) => height}rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  border : 2px solid ${({ theme }) => theme.mainColor};

  &:hover {
    background-color: ${({ theme }) => theme.mainColor};
  }
`;

const Button = ({ width, height, backgroundColor, value = '🔎', onClick }: IButton) => {

  return (
    <>
      <ButtonStyle
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        onClick={onClick}
      >{'🔎'}
      </ButtonStyle >
    </>
  )
}

export default Button;
