import styled from 'styled-components';

export interface IButton {
  width: string;
  height: string;
  backgroundColor: string;
  value: string;
  fontColor?:string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

const ButtonStyle = styled.button<Partial<IButton>>`
  cursor:pointer;
  width: ${({ width }) => width};
  height:${({ height }) => height};
  color:${({ fontColor }) => fontColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  border : 1px solid ${({ theme }) => theme.mainColor};
  font-family :'Roboto', sans-serif;
  &:hover {
    background-color: ${({ theme }) => theme.mainColor};
    color:white;
  }
`;

const Button = ({
  width,
  height,
  backgroundColor,
  value,
  fontColor,
  onClick }: IButton) => {

  return (
    <>
      <ButtonStyle
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        onClick={onClick}
        fontColor={fontColor}
      >{value}
      </ButtonStyle >
    </>
  )
}

export default Button;
