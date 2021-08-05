import React, { useState, useEffect } from 'react';
import { Level, CellData } from '../Module/Interface';
import Cell from './Cell';
import * as cellHandler from '../Module/CellHandler';
import * as clickHandler from '../Module/ClickHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstClick, setFlagNumber } from '../Reducers/Game';
import { RootState } from '../Reducers';

enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLCK };

interface BoardProps {
  level: Level
};

const Board = (prop: BoardProps) => {

  const dispatch = useDispatch();
  const onFirstClick = () => {
    dispatch(setFirstClick());
  }

  const onSetFlag = (count: number) => {
    dispatch(setFlagNumber(count));
  }

  const { row, col, numberOfMine }: Level = prop.level;
  const initBoard: CellData[][] = cellHandler.initializeCell(row, col);
  cellHandler.plantMine(initBoard, numberOfMine);
  cellHandler.getNeighbor(initBoard, prop.level);
  const [cellData, setCellData] = useState<CellData[][]>(initBoard);

  // useSelector는 항상 최상단 함수에 작성한다.
  const numofFlag: number = useSelector((state: RootState) => state.game.numberofFlag);

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect는 렌더링을 보장한다. 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.
  // useEffect(() => {
  //   onSetFlag(numberOfMine);
  // },[]);

  const onLeftClick = (e: React.MouseEvent<HTMLDivElement>, y: number, x: number) => {

    const newCellData: CellData[][] = [...cellData];

    switch (e.button) {
      case CLICKTYPE.LEFTCLICK:
        onFirstClick();
        clickHandler.onLeftClick(newCellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.WHEELCLICK:
        clickHandler.onWheelClick(newCellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.RIGHTCLCK:
        clickHandler.onRightClick(newCellData, { y, x });
        newCellData[y][x].flaged === true ? onSetFlag(numofFlag - 1) : onSetFlag(numofFlag + 1);

        break;
    }

    setCellData(newCellData);
  }

  const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  return (
    cellData.map((rowItem, y) => {
      return (
        <div className='board-container-row' key={y}>
          {rowItem.map((data, x) => {
            return (
              <Cell
                key={(y * rowItem.length) + x}
                value={data.mine ? '💣' : data.visible}
                islock={data.visited && data.neighbor <= 0}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onLeftClick(e, y, x)}
                onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onRightClick(e)}
              />
            )
          })}
        </div>
      )
    })
  )
}

export default Board;