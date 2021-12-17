import styled from 'styled-components';
import { InlineText } from '../atoms/Text';

interface ITextWrapper {
  width?: string;
  fontSize?: string;
  value?: string;
  isColor?: boolean;
  paddingLeft?: string;
  textAlign?: string;
  children?: any
}

// const TextWrapperStyle = styled.span<ITextWrapper>`
//   display: flex;
//   justify-content: ${({ justifyContent }) => justifyContent};
//   align-items: center;
//   width: ${({ width }) => width};
//   padding-left: ${({ paddingLeft }) => paddingLeft};
// `;

const TextWrapperStyle = styled.span<ITextWrapper>`
  display: inline-block;
  width: ${({ width }) => width};
  text-align: ${({ textAlign }) => textAlign};
  position:relative;
`;

const TextWrapper = ({
  width = 'none',
  fontSize,
  value,
  isColor,
  textAlign,
  children }: ITextWrapper) => {

  return (
    <>
      <TextWrapperStyle
        width={width}
        textAlign={textAlign}
      >
        <InlineText
          size={fontSize}
          value={value}
          isColor={isColor}
        />
        {children}
      </TextWrapperStyle>
    </>
  )
}

export default TextWrapper;