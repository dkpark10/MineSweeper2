import styled from 'styled-components';

interface ITextStyle {
  size: string;
  isColor: boolean;
  value?: string;
  bold?: boolean;
}

const HeaderStyle = styled.div<ITextStyle>`
  font-family: 'Tajawal', sans-serif;
  font-size: ${({ size }) => size};
  color: ${({ isColor, theme }) => {
    return isColor === true ? theme.mainColor : theme.fontColor;
  }};
  margin: 18px 0px;
  font-weight: ${({ bold }) => {
    return bold === true ? 'bold' : null;
  }};
`;

const HeaderText = ({ size, value, isColor }: ITextStyle) => {

  return (
    <>
      <HeaderStyle
        size={size}
        isColor={isColor}
      >
        {value}
      </HeaderStyle>
    </>
  )
}

const InlineStyle = styled.span<ITextStyle>`
  font-family: 'Tajawal', sans-serif;
  font-size: ${({ size }) => size};
  color: ${({ isColor, theme }) => {
    return isColor === true ? theme.mainColor : theme.fontColor;
  }};
  font-weight: ${({ bold }) => {
    return bold === true ? 'bold' : null;
  }};
`;

const InlineText = ({ size, value, isColor,bold }: ITextStyle) => {
  
  return (
    <>
      <InlineStyle
        size={size}
        isColor={isColor}
        bold={bold}
      >
        {value}
      </InlineStyle>
    </>
  )
}

export { HeaderText, InlineText };