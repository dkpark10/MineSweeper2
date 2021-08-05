import React from 'react';
import './css/App.css';
import Board from './Components/Board';
import GameInfo from './Components/GameInfo';
import { Level } from './Module/Interface';
import { NotePad } from './Practice/ReduxPrac';

interface AppState {
  easy: Level,
  normal: Level,
  hard: Level,
  test: Level
};

export default class App extends React.Component<any, AppState>{
  constructor(props: any) {
    super(props);

    const easy: Level = { row: 10, col: 10, numberOfMine: 10 };
    const normal: Level = { row: 16, col: 16, numberOfMine: 40 };
    const hard: Level = { row: 16, col: 30, numberOfMine: 99 };
    const test: Level = { row: 5, col: 5, numberOfMine: 3 };

    this.state = {
      easy: easy,
      normal: normal,
      hard: hard,
      test: test
    };
  }

  render() {
    const level: Level = this.state.easy;
    return (
      <>
        <div className='board'>
          <div className='board-container'>
            <GameInfo level={level} />
            <Board level={level} />
          </div>
        </div>
        <NotePad />
      </>
    )
  }
}