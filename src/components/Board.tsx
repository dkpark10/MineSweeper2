import React from 'react';
import Level from '../interface/LevelInterface';
import Cell from './Cell';
import * as cellHandler from '../utility/CellHandler';
import * as clickHandler from '../utility/ClickHandler';

interface BoardProps {
  level: Level
};

interface BoardStatus {
  mine: number[][],
  neighbor: number[][],
  visited: boolean[][],
  flaged: boolean[][]
};

export default class Board extends React.Component<BoardProps, BoardStatus>{

  private readonly mine:number[][];
  private readonly neighbor: number[][];
  private readonly visited: boolean[][];
  private readonly flaged: boolean[][];

  constructor(props) {
    super(props);
    this.onLeftClick = this.onLeftClick.bind(this);

    const { row, col, numberOfMine }: Level = this.props.level;
    this.mine = this.create2Dimensions<number>(row, col);
    this.visited = this.create2Dimensions<boolean>(row, col, false);
    this.flaged = this.create2Dimensions<boolean>(row, col, false);

    cellHandler.plantMine(this.props.level, this.mine);
    this.neighbor = cellHandler.getNeighbor(this.props.level, this.mine);

    this.state = {
      mine: this.mine,
      neighbor: this.neighbor,
      visited: this.visited,
      flaged : this.flaged
    };
  }

  private create2Dimensions<T>(row: number, col: number, value:any = 0): T[][] {
    return Array.from({ length: row }, () => value)
      .map(() => Array.from({ length: col }, () => value));
  }

  private onLeftClick(y: number, x: number) {
    clickHandler.onLeftClick();
  }

  private renderBoard() {
    const mine: number[][] = this.state.mine;
    return (
      mine.map((rowItem, y) => {
        return (
          <div className = 'board-container-row' key = {y}>
            {rowItem.map((data, x) => {
              return (
                <Cell 
                  key={(y * rowItem.length) + x} 
                  value = {''}
                  onClick={() => this.onLeftClick(y,x)}
                />
              )
            })}
          </div>
        )
      })
    )
  }

  public render() {
    return (
      <>
        {this.renderBoard()}
      </>
    );
  }
}