import styled from 'styled-components';

const DefaultBulletinWrapper = styled.main`
  font-family: 'Noto Sans KR', sans-serif;
  margin:auto;

  @media screen and (${({ theme }) => theme.minTablet}){
    width:784px;
    position: relative;
    margin-top:20px;
    ul{
      list-style: none;
    }

    li:nth-child(odd) {
      background-color: white;
    }

    li:last-child{
      margin-bottom: 10px;
    }
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width:100vw;
  }
`;

export default DefaultBulletinWrapper;