import React, { useCallback } from 'react';
import { levelList } from '../modules/Common';
import Header from './Header';
import Modal from './Modal';
import GameBoard from './GameBoard';
import '../styles/Game.css';

const Game = () => {

  const level = levelList[localStorage.getItem('difficulty')] || levelList.Easy;
 
  const checkLevel = useCallback(() => {
    if (level.row === 10 && level.col === 10 && level.numberOfMine === 10)
      return 'Easy';
    else if (level.row === 16 && level.col === 16 && level.numberOfMine === 40)
      return 'Normal';
    else return 'Hard';
  }, [level])();

  return (
    <>
      <Modal
        levelInfo={checkLevel}
      />
      <Header />
      <GameBoard
        levelInfo={level}
      />
    </>
  )
}

export default Game;