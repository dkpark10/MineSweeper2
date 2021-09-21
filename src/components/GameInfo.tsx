import React, { useState, useEffect, useRef } from 'react';
import '../css/Gameinfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers/Index';
import { recordTime } from '../Reducers/Game';

interface Prop {
  firstClick: boolean,
  numofFlag: number
};

const getCount = (count: number): string => {
  if (count < 10) {
    return `00${count}`;
  } else if (count >= 10 && count < 100) {
    return `0${count}`;
  } else {
    return String(count);
  }
}

const GameInfo = (prop: Prop) => {

  console.log('GameInfo Component render');
  const { firstClick, numofFlag }: Prop = prop;

  // // 초기 젓 마운트 될 때 남은 깃발 갯수 리듀서에 작성
  // useEffect(() => {
  //   dispatch(setFlagNumber(numberOfMine));
  // }, []);

  const dispatch = useDispatch();

  const isGameOver: boolean = useSelector((state: RootState) => state.game.isGameOver) <= 0;
  const [count, setCount] = useState<number>(0);

  const timerId = useRef<any>(null);
  let beginTime = useRef<any>(null);

  // 첫클릭 후 타이머 시작
  useEffect(() => {
    console.log('Timer First Mount');
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
      dispatch(recordTime(endTime - beginTime.current));
      console.log(endTime - beginTime.current);
      beginTime.current = null;
      setCount(count => 0);
    }
    clearInterval(timerId.current);
    timerId.current = null;
  }, [isGameOver, dispatch]);

  return (
    <>
      <div className='gameinfo'>
        <div> ⏳ {getCount(count)}</div>
        <div className='heart'>💗</div>
        <div> 🚩{numofFlag}</div>
      </div>
    </>
  )
}

export default GameInfo;