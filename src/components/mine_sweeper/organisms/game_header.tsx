import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/game_info.css';
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
  justify-content: space-around;
  align-items: center;
  min-width: 45px;

 & span{
   width: 3.5rem;
 }

 & label{
   color:white;
   font-size: 14px;
   font-family: "Roboto", sans-serif;
 }

 & .heart{
   font-size: 18px;
   color:rgb(202, 15, 46);
   text-align: center;
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

  const beginTime = useRef<number>(null);

  useInterval(() => {
    if (firstClick === true) {
      setCount(prev => prev + 1);
      beginTime.current = new Date().getTime();
    }
  }, 1000);

  // 게임종료시
  useEffect(() => {
    if (isGameOver === true) {
      const endTime = new Date().getTime();
      dispatch(setRecordTime(endTime - beginTime.current));
      beginTime.current = null;
      setCount(count => 0);
    }
  }, [isGameOver, dispatch]);

  return (
    <>
      <GameHeaderStyle>
        <span> ⏳
          <label> {getCount(count)}</label>
        </span>
        <span className='heart'>💗</span>
        <span> 🚩
          <label> {countOfFlag} </label>
        </span>
      </GameHeaderStyle>
    </>
  )
}