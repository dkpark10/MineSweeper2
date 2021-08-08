import React, { useState, useEffect } from 'react';
import { Level, CellData, Coord } from '../Module/Interface';
import Cell from './Cell';
import '../css/Board.css';
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

  const onSetExtraCell = (extraCell: number) => {
    dispatch(setExtraCell(extraCell));
  }

  const { row, col, numberOfMine }: Level = prop.level;
  const initBoard: CellData[][] = cellHandler.initializeCell(row, col);
  cellHandler.plantMine(initBoard, numberOfMine);
  cellHandler.getNeighbor(initBoard, prop.level);

  const [cellData, setCellData] = useState<CellData[][]>(initBoard);
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [numofFlag, setNumofFlag] = useState<number>(numberOfMine);

  // useSelector는 항상 최상단 함수에 작성한다.
  const { extraCell } = useSelector((state: RootState) => ({
    extraCell: state.game.isGameOver
  }));

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect는 렌더링을 보장한다. 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.
  useEffect(() => {
    onSetExtraCell((row * col) - numberOfMine);
  }, []);

  const onLeftClick = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {

    const newCellData: CellData[][] = [...cellData];
    let newNumofExtraCell: number = 0;

    switch (e.button) {
      case CLICKTYPE.LEFTCLICK:

        // 첫클릭은 했다면 다음과 같이 분기문을 걸어서 dispatch를 막아야 한다.
        // 분기문을 걸지 않고 state를 reducer가 편집할 경우 타이머의 시간이 일시적으로 멈춘다.
        if(firstClick === true){
          setFirstClick(false);
        }
        newNumofExtraCell = clickHandler.onLeftClick(newCellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.WHEELCLICK:
        newNumofExtraCell = clickHandler.onWheelClick(newCellData, { y, x }, { row, col });
        break;
      case CLICKTYPE.RIGHTCLCK:
        const flagStatus: boolean = clickHandler.onRightClick(newCellData, { y, x });
        if(flagStatus){
          newCellData[y][x].flaged === true ? setNumofFlag(numofFlag - 1) : setNumofFlag(numofFlag + 1);
        }
        break;
    }

    if (newNumofExtraCell) {
      console.log(newNumofExtraCell);
      onSetExtraCell(extraCell - newNumofExtraCell);
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