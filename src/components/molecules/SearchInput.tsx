import styled from 'styled-components';
import InputText from '../atoms/InputText';
import Button from '../atoms/Button';
import Select from '../atoms/Select';

interface ISearchInput {
  width: string;
  height: string;
  backgroundColor: string;
}

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.6rem;
  margin : 2rem;
  min-width:500px;
`;

const SearchInput = ({ width, height, backgroundColor }: ISearchInput) => {

  const option = [
    ['title','Title'],
    ['author','Author']
  ];

  return (
    <>
      <InputWrapper>
        <Select 
          width={'4.5'}
          height={'1.6'}
          option={option}
        />
        <InputText
          width={width}
          height={height}
          backgroundColor={backgroundColor}
        />
        <Button
          width={'2.2'}
          height={'1.6'}
          backgroundColor={'white'}
          value={'Search'}
        />
      </InputWrapper>
    </>
  )
}

export default SearchInput;