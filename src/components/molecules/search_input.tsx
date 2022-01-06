import styled from 'styled-components';

interface ISearchInput {
  children?: any;
}

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.0rem;
  margin: 1.2rem 0;
  min-width:500px;
`;

const SearchInput = ({ children }: ISearchInput) => {

  return (
    <>
      <InputWrapper>
        {children}
      </InputWrapper>
    </>
  )
}

export default SearchInput;