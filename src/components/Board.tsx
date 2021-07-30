import React from 'react';
import { Level, CellData } from '../interface/interface';
import Cell from './Cell';
import * as cellHandler from '../utility/CellHandler';
import * as clickHandler from '../utility/ClickHandler';

enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLCK };

interface BoardProps {
  level: Level
};

interface BoardStatus {
  cellData: CellData[][],
  isFirstClick: boolean,
  numberofExtraMine: number
};

export default class Board extends React.Component<BoardProps, BoardStatus>{

  private readonly cellData:CellData[][];
  private readonly isFirstClick: boolean;
  private readonly numberofExtraMine: number;

  constructor(props) {
    super(props);
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);

    const { row, col, numberOfMine }: Level = this.props.level;
    this.cellData = cellHandler.initializeCell(row, col);
    cellHandler.plantMine(this.cellData, numberOfMine);
    cellHandler.getNeighbor(this.cellData, this.props.level);

    this.state = {
      cellData: this.cellData,
      isFirstClick: false,
      numberofExtraMine : (row * col) - numberOfMine
    };
  }

  private onLeftClick(e: React.MouseEvent<HTMLDivElement>, y: number, x: number) {
    const { row, col, }: Level = this.props.level;
    const cellData: CellData[][] = this.state.cellData;

    switch(e.button){
      case CLICKTYPE.LEFTCLICK:
        clickHandler.onLeftClick(this.cellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.WHEELCLICK:
        clickHandler.onWheelClick(this.cellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.RIGHTCLCK:
        clickHandler.onRightClick(this.cellData, {y,x});
        break;
    }
    
    this.setState({ cellData: cellData });
  }

  private onRightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  private renderBoard() {
    const cellData: CellData[][] = this.state.cellData;
    return (
      cellData.map((rowItem, y) => {
        return (
          <div className = 'board-container-row' key = {y}>
            {rowItem.map((data, x) => {
              return (
                <Cell 
                  key={(y * rowItem.length) + x} 
                  value={data.mine ? '💣' : data.visible}
                  islock={data.visited && data.neighbor <= 0}
                  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => this.onLeftClick(e, y, x)}
                  onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => this.onRightClick(e)}
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