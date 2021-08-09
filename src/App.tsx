import React from 'react';
import './css/App.css';
import Game from './Components/Game';
import Header from './Components/Header';
import Modal from './Components/Modal';
import { Level } from './Module/Interface';
import NotePad from './Practice/ReduxPrac';

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
    const test: Level = { row: 7, col: 7, numberOfMine: 10 };

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
        <Header />
        <Modal />
        <Game level={level} />
        {/* <NotePad /> */}
      </>
    )
  }
}