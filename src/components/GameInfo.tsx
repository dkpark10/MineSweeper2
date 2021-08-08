import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers';
import { Level } from '../Module/Interface';
import { setFlagNumber } from '../Reducers/Game';
import '../css/Gameinfo.css';

interface Prop {
  firstClick:boolean,
  numofFlag:number
};

const GameInfo = (prop: Prop) => {

  const dispatch = useDispatch();
  const { firstClick, numofFlag }: Prop = prop;

  // // 초기 젓 마운트 될 때 남은 깃발 갯수 리듀서에 작성
  // useEffect(() => {
  //   dispatch(setFlagNumber(numberOfMine));
  // }, []);

  const [count, setCount] = useState<number>(0);

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
    let timerId: NodeJS.Timer;
    if (firstClick === false) {
      timerId = setInterval(() => {
        setCount(count + 1)
      }, 1000);
    }

    return () => clearInterval(timerId);
  });

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