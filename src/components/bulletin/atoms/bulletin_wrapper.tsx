import styled from 'styled-components';

const DefaultBulletinWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  position:relative;
  left:50%;
  transform: translateX(-50%);

  @media screen and (${({ theme }) => theme.minTablet}){
    width:754px;
    padding:24px;
  }

  @media screen and (${({ theme }) => theme.mobile}){
    width: 100vw;
  }
`;

export default DefaultBulletinWrapper;