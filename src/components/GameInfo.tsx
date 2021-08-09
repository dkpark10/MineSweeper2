import React, { useState, useEffect, useRef } from 'react';
import '../css/Gameinfo.css';

interface Prop {
  firstClick: boolean,
  numofFlag: number
};

const GameInfo = (prop: Prop) => {

  const { firstClick, numofFlag }: Prop = prop;

  // // 초기 젓 마운트 될 때 남은 깃발 갯수 리듀서에 작성
  // useEffect(() => {
  //   dispatch(setFlagNumber(numberOfMine));
  // }, []);

  const [count, setCount] = useState<number>(0);
  const timerId = useRef<any>(null);
  console.log(timerId);

  const getCount = (count: number): string => {
    if (count < 10) {
      return `00${count}`;
    } else if (count >= 10 && count < 100) {
      return `0${count}`;
    } else {
      return String(count);
    }
  }

  useEffect(() => {
    if (firstClick === false) {
      timerId.current = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }

    return () => clearInterval(timerId.current);
  }, [firstClick]);

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