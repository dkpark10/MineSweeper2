import styled from 'styled-components';
import { InlineText } from '../atoms/Text';

interface ITextWrapper {
  width: string;
  fontSize?: string;
  value?: string;
  isColor?: boolean;
  paddingLeft?: string;
  justifyContent?: string;
  children?: any
}

const TextWrapperStyle = styled.span<ITextWrapper>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  width: ${({ width }) => width};
  padding-left: ${({ paddingLeft }) => paddingLeft};
`;

const TextWrapper = ({
  width,
  fontSize,
  value,
  isColor,
  paddingLeft,
  justifyContent,
  children }: ITextWrapper) => {

  return (
    <>
      <TextWrapperStyle
        width={width}
        paddingLeft={paddingLeft}
        justifyContent={justifyContent}
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