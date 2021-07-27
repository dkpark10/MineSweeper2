import React from 'react';
import { Level, CellData, Coord } from '../interface/interface';
import Cell from './Cell';
import * as cellHandler from '../utility/CellHandler';
import * as clickHandler from '../utility/ClickHandler';

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

  private onLeftClick(y: number, x: number) {
    const { row, col, }: Level = this.props.level;
    const cellData: CellData[][] = this.state.cellData;
    clickHandler.onLeftClick(cellData, { y, x }, row, col);
  }

  private onRightClick(e: React.MouseEvent<HTMLDivElement>, y: number, x: number) {
    e.preventDefault();
    const cellData: CellData[][] = this.state.cellData;
    clickHandler.onRightClick(cellData, { y, x });
    
    this.setState({ cellData: cellData });
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
                  value={data.visible}
                  onClick={() => this.onLeftClick(y,x)}
                  onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => this.onRightClick(e, y, x)}
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