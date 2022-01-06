import styled from 'styled-components';
import { HeaderText } from '../atoms/text';

const NotFoundWrapper = styled.div`
  position: absolute; 
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  text-align:center;
`;

export default function NotFound() {

  return (
    <>
      <NotFoundWrapper>
        <HeaderText
          size={'5.5rem'}
          value={'4 💣 4'}
          isColor={false}
        />
        <HeaderText
          size={'3.5rem'}
          value={'Not Found'}
          isColor={false}
        />
      </NotFoundWrapper>
    </>
  )
}