import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/game_info.css';
import { useDispatch } from 'react-redux';
import { setRecordTime } from '../reducers/game';

interface Props {
  firstClick: boolean,
  numofFlag: number,
  isGameOver: boolean
};

const GameInfo = ({firstClick, numofFlag, isGameOver}: Props) => {

  // // 초기 젓 마운트 될 때 남은 깃발 갯수 리듀서에 작성
  // useEffect(() => {
  //   dispatch(setFlagNumber(numberOfMine));
  // }, []);

  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);

  const getCount = useCallback((count: number): string => {
    if (count < 10) {
      return `00${count}`;
    } else if (count >= 10 && count < 100) {
      return `0${count}`;
    } else {
      return String(count);
    }
  },[]);

  const timerId = useRef<any>(null);
  let beginTime = useRef<any>(null);

  // 첫클릭 후 타이머 시작
  useEffect(() => {
    beginTime.current = new Date().getTime();
    timerId.current = setInterval(() => {
      if (firstClick === false) {
        setCount((count) => count + 1);
      }
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [firstClick]);

  // 게임종료시
  useEffect(() => {

    if (isGameOver) {

      const endTime = new Date().getTime();
      dispatch(setRecordTime(endTime - beginTime.current));
      beginTime.current = null;
      setCount(count => 0);
    }

    clearInterval(timerId.current);
    timerId.current = null;
  }, [isGameOver, dispatch]);

  return (
    <>
      <div className='gameinfo'>
        <span> ⏳
          <label> {getCount(count)}</label>
        </span>
        <span className='heart'>💗</span>
        <span> 🚩
          <label> {numofFlag} </label>
        </span>
      </div>
    </>
  )
}

export default GameInfo;