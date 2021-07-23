import React from 'react';
import Level from '../interface/LevelInterface';
import Cell from './Cell';

interface BoardProps {
  level: Level
};

interface BoardStatus {
  board: number[][]
};

export default class Board extends React.Component<BoardProps, BoardStatus>{
  constructor(props) {
    super(props);

    const { row, col, numberOfMine }: Level = this.props.level;
    const board: number[][] = Array.from({ length: row }, () => 0)
      .map(() => Array.from({ length: col }, () => 0));

    this.state = {
      board: board
    };
  }

  renderBoard() {
    const board: number[][] = this.state.board;

    return board.map((datarow, y) => {
      return datarow.map((dataitem, x) => {
        return (
          <Cell />
        )
      })
    });
  }


  render() {


    return (
      <>
        {this.renderBoard()}
      </>
    );
  }
}
