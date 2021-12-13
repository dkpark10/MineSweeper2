import styled from 'styled-components';
import Input from '../atoms/Inputs';
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
  margin-top: 1rem;
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
        <Input
          type={'text'}
          width={width}
          height={height}
          backgroundColor={backgroundColor}
        />
        <Button
          width={'2.2rem'}
          height={'1.6rem'}
          backgroundColor={'white'}
          value={'🔎'}
        />
      </InputWrapper>
    </>
  )
}

export default SearchInput;