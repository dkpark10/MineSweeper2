import styled from 'styled-components';
import { InlineText } from '../atoms/Text';

interface ITextWrapper {
  width: string;
  fontSize?: string;
  value?: string;
  isColor?: boolean;
}

const TextWrapperStyle = styled.div<ITextWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid yellow;
  font-family: 'Tajawal', sans-serif;
  width: ${({ width }) => width}
`;

const TextWrapper = ({ width, fontSize, value, isColor }: ITextWrapper) => {
  return (
    <>
      <TextWrapperStyle
        width={width}
      >
        <InlineText
          size={fontSize}
          value={value}
          isColor={isColor}
        />
      </TextWrapperStyle>
    </>
  )
}

export default TextWrapper;