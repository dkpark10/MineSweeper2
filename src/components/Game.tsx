import React, { useMemo } from 'react';
import { levelList } from '../modules/common';
import Header from './header';
import Modal from './modal';
import GameBoard from './game_board';
import '../styles/game.css';

const Game = () => {

  const level = levelList[localStorage.getItem('difficulty')] || levelList.Easy;
 
  const checkLevel = useMemo(() => {
    
    if (level.row === 10 && level.col === 10 && level.numberOfMine === 10)
      return 'Easy';
    else if (level.row === 16 && level.col === 16 && level.numberOfMine === 40)
      return 'Normal';
    else return 'Hard';
    
  }, [level]);

  const checkMinWidth = useMemo(() => {
    
    if (level.row === 10 && level.col === 10 && level.numberOfMine === 10)
      return '294px';
    else if (level.row === 16 && level.col === 16 && level.numberOfMine === 40)
      return '444px';
    else return '794px';
    
  }, [level]);

  return (
    <>
      <Modal
        levelInfo={checkLevel}
      />
      <Header 
        selected={'Game'} 
      />
      <GameBoard
        levelInfo={level}
        minWidth={checkMinWidth}
      />
    </>
  )
}

export default Game;