import React from 'react';
import './css/App.css';
import Board from './components/Board';
import Clock from './components/Clock';
import { easy, normal, hard, test } from './utility/Level';
import { Level } from './interface/Interface';
import { ReduxComponent } from './practice/ReduxPrac';

interface AppState {
  level: Level
}

export default class App extends React.Component<any, AppState>{
  constructor(props: any) {
    super(props);

    this.state = {
      level: test
    };
  }

  render() {
    const level = this.state.level;
    const practice: boolean = true;
    return (
      <>
        {practice === true ?
          <ReduxComponent /> :
          (
            <div className='board'>
              <div className='board-container'>
                <div className='gameinfo'></div>
                <Board level={level} />
              </div>
            </div>
          )}
      </>
    )
  }
}
