import styled from 'styled-components';

const RankWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  position:relative;
  left:50%;
  transform: translateX(-50%);

  ul{
    list-style: none;
  }

  li:nth-child(odd) {
    background-color: white;
  }

  li:last-child{
    margin-bottom: 10px;
  }

  @media screen and (${({ theme }) => theme.minTablet}){
    border-radius: 12px;
    width:624px;
    padding:24px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width: 100vw;
    padding:20px;
  }
`;

export default RankWrapper;