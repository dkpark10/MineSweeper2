import React, { useState, useEffect } from 'react';
import { Level, CellData, Coord } from '../Module/Interface';
import Cell from './Cell';
import '../css/Game.css';
import * as cellHandler from '../Module/CellHandler';
import GameInfo from './GameInfo';
import * as clickHandler from '../Module/ClickHandler';
import { useDispatch, useSelector } from 'react-redux';
import { setExtraCell } from '../Reducers/Game';
import { RootState } from '../Reducers';

enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLCK };

interface BoardProps {
  level: Level
};

const Game = (prop: BoardProps) => {

  console.log('Board Component render');
  const dispatch = useDispatch();

  const { row, col, numberOfMine }: Level = prop.level;

  // 처음 2차원 셀을 생성해주어서 렌더가 안되는 일이 없게 한다.
  const [cellData, setCellData] = useState<CellData[][]>(cellHandler.initializeCell(row, col));
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [numofFlag, setNumofFlag] = useState<number>(numberOfMine);

  // useSelector는 항상 최상단 함수에 작성한다.
  const { extraCell,gameRestart} = useSelector((state: RootState) => ({
    extraCell: state.game.isGameOver,
    gameRestart: state.game.gameRestart
  }));

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect는 내부 수행은 렌더링이 된 후 수행을 보장한다. 
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.

  useEffect(() => {
    const newCellData: CellData[][] = cellHandler.initializeCell(row,col);
    cellHandler.plantMine(newCellData, numberOfMine);
    cellHandler.getNeighbor(newCellData, {row,col,numberOfMine});
    setCellData([...newCellData]);
    setNumofFlag(numberOfMine);
    setFirstClick(true);
    dispatch(setExtraCell((row * col) - numberOfMine));
  }, [gameRestart, row, col, numberOfMine, dispatch]);

  const onLeftClick = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {

    const newCellData: CellData[][] = [...cellData];
    let newNumofExtraCell: number = 0;

    switch (e.button) {
      case CLICKTYPE.LEFTCLICK:
        if (firstClick === true) {
          setFirstClick(state => !state);
        }
        newNumofExtraCell = clickHandler.onLeftClick(newCellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.WHEELCLICK:
        newNumofExtraCell = clickHandler.onWheelClick(newCellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.RIGHTCLCK:
        const flagStatus: boolean = clickHandler.onRightClick(newCellData, { y, x });
        if (flagStatus) {
          newCellData[y][x].flaged === true
            ? setNumofFlag(numofFlag => numofFlag - 1)
            : setNumofFlag(numofFlag => numofFlag + 1);
        }
        break;
    }

    if (newNumofExtraCell) {
      dispatch(setExtraCell(extraCell - newNumofExtraCell));
      setCellData(newCellData);
    }
  }

  const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const renderBoard = () => {
    return (
      cellData.map((rowItem, y) => {
        return (
          <div className='board-container-row' key={y}>
            {rowItem.map((data, x) => {
              return (
                <Cell
                  key={(y * rowItem.length) + x}
                  value={data.mine ? '💣' : data.visible}
                  islock={data.visited}
                  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onLeftClick(e, { y, x })}
                  onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => onRightClick(e)}
                />
              )
            })}
          </div>
        )
      })
    )
  }

  return (
    <>
      <div className='board'>
        <div className='board-container'>
          <GameInfo
            firstClick={firstClick}
            numofFlag={numofFlag}
          />
          {renderBoard()}
        </div>
      </div>
    </>
  )
}

export default Game;