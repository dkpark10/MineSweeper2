import styled from 'styled-components';

const DefaultBulletinWrapper = styled.main`
  font-family: 'Noto Sans KR', sans-serif;
  position:relative;
  left:50%;
  transform: translateX(-50%);
  border:1px solid yellow;

  @media screen and (${({ theme }) => theme.minTablet}){
    width:784px;
    padding:24px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width: 100vw;
    padding:20px;
  }
`;

export default DefaultBulletinWrapper;