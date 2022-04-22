import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setRecordTime } from '../../../reducers/game';
import styled from 'styled-components';
import useInterval from '../../custom_hook/useInterval';

interface Props {
  firstClick: boolean;
  countOfFlag: number;
  isGameOver: boolean;
};

const GameHeaderStyle = styled.div`
  height: 26px;
  margin-bottom: 9px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  min-width: 45px;
  color:white;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  text-align: center;

  & span{
   width: 3.5rem;
 }

 & .heart{
   font-size: 18px;
  }
`;

export default function GameHeader({
  firstClick,
  countOfFlag,
  isGameOver }: Props) {

  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);

  const getCount = useCallback((count: number): string => {
    if (count < 10) {
      return `00${count}`;
    } else if (count >= 10 && count < 100) {
      return `0${count}`;
    } else {
      return `${count}`;
    }
  }, []);

  useInterval(() => {
    if (firstClick === true && isGameOver === false) {
      setCount(prev => prev + 1);
    }
  }, 1000);

  // 게임종료시
  useEffect(() => {
    setCount(count => 0);
  }, [isGameOver, dispatch]);

  return (
    <>
      <GameHeaderStyle>
        <span> ⏳ {getCount(count)} </span>
        <span className='heart'>💗</span>
        <span> 🚩{countOfFlag} </span>
      </GameHeaderStyle>
    </>
  )
}