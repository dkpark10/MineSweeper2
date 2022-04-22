import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StyleButton } from '../../common/atoms/button';
import useAxios from '../../custom_hook/useaxios';
import axios from 'axios';

interface Props {
  beginTime: number;
  endTime?: number;
  level: string;
  onMouseClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalContentStyle = styled.div`
  width: 294px;
  padding: 35px 50px;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
  text-align: center;
  background-color: white;
  box-shadow:  17px 17px 38px #121212,
         -1px -1px 3px #ffffff;
`;

const CloseButton = styled(StyleButton)`
  margin-top: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${({ theme }) => theme.mainColor};
  color: white;

  &:hover{
    background: linear-gradient(70deg, 
      ${({ theme }) => theme.mainColor}, 
      ${({ theme }) => theme.gradientColor});
  }
`;

export default function ModalContent({
  beginTime,
  endTime = new Date().getTime(),
  level,
  onMouseClick
}: Props) {

  useAxios({
    method:'POST',
    url:'/',
    data:{
      a:23
    }
  })

  return (
    <ModalContentStyle>
      <div> Time : {(endTime - beginTime) / 1000}</div>
      <div> Level : {level}</div>
      <CloseButton
        width={'75px'}
        height={'25px'}
        radius={'5px'}
        border={'none'}
        onClick={onMouseClick}
      >
        close
      </CloseButton>
    </ModalContentStyle>
  )
}