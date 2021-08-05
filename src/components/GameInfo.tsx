import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Reducers';
import { Level } from '../Module/Interface';
import { setFlagNumber } from '../Reducers/Game';

interface Prop {
  level:Level
}

const GameInfo = (prop:Prop) => {

  const dispatch = useDispatch();
  const { row, col, numberOfMine }: Level = prop.level;

  useEffect(() => {
    dispatch(setFlagNumber(numberOfMine));
  }, []);

  const [count, setCount] = useState<number>(0);
  const { startTimer, numofFlag } = useSelector((state: RootState) => {
    return {
      startTimer: state.game.isFirstClick,
      numofFlag: state.game.numberofFlag
    }
  });

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
    if (startTimer) {
      timerId = setInterval(() => {
        setCount(count + 1)
      }, 1000);
    }
    return () => clearInterval(timerId);
  });

  return (
    <>
      <div className='gameinfo'>
        <span>⏰{getCount(count)}</span>
        <span>   {numofFlag}</span>
      </div>
    </>
  )
}

export default GameInfo;