import styled from 'styled-components';

interface ITextStyle {
  size: string;
  isColor: boolean;
}

interface ITextProps extends ITextStyle {
  value: string;
}

const HeaderStyle = styled.div<ITextStyle>`
  font-size: ${({ size }) => size}rem;
  color: ${({ isColor, theme }) => {
    return isColor === true ? theme.mainColor : theme.fontColor;
  }};
  margin: 18px 0px;
`;

const HeaderText = ({ size, value, isColor }: ITextProps) => {

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
  font-size: ${({ size }) => size}rem;
  color: ${({ isColor, theme }) => {
    return isColor === true ? theme.mainColor : theme.fontColor;
  }};
`;

const InlineText = ({ size, value, isColor }: ITextProps) => {
  console.log('sdsd');
  return (
    <>
      <InlineStyle
        size={size}
        isColor={isColor}
      >
        {value}
      </InlineStyle>
    </>
  )
}

export { HeaderText, InlineText };