import React from 'react';
import './css/App.css';
import Board from './components/Board';
import { easy } from './utility/Level';
import Level from './interface/LevelInterface';

interface AppState {
  level: Level
}

export default class App extends React.Component<any, AppState>{
  constructor(props: any) {
    super(props);

    this.state = {
      level: easy
    };
  }

  render() {
    const level = this.state.level;
    return (
      <>
        <div className='board'>
          <Board level={level} />
        </div>
      </>
    )
  }
}
