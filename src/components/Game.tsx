import React from 'react';
import Header from './Header';
import Modal from './Modal';
import GameBoard from './GameBoard';
import '../css/Game.css';


const Game = () => {

  console.log('game root render');

  return (
    <>
      <Modal />
      <Header />
      <GameBoard />
    </>
  )
}

export default Game;