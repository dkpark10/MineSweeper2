import styled from 'styled-components';
import { HeaderText } from '../components/atoms/Text';

const NotFoundWrapper = styled.div`
  position: absolute; 
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  text-align:center;
`;

const NotFound = () => {

  return (
    <>
      <NotFoundWrapper>
        <HeaderText
          size={'5.5'}
          value={'4 💣 4'}
          isColor={false}
        />
        <HeaderText
          size={'3.5'}
          value={'Not Found'}
          isColor={false}
        />
      </NotFoundWrapper>
    </>
  )
}

export default NotFound;