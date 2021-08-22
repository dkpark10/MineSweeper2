import React, { useState, useEffect } from 'react';
import { Level, CellData, Coord, ClickRenderStatus } from '../Module/Interface';
import Cell from './Cell';
import '../css/Game.css';
import * as cellHandler from '../Module/CellHandler';
import GameInfo from './GameInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setExtraCell } from '../Reducers/Game';
import { RootState } from '../Reducers';
import Header from './Header';
import createClickFactory from '../Module/ClickFactory';

const LEFTCLICK: number = 0;

const level = {
  easy: { row: 10, col: 10, numberOfMine: 10 },
  normal: { row: 16, col: 16, numberOfMine: 40 },
  hard: { row: 16, col: 30, numberOfMine: 99 },
  test: { row: 7, col: 7, numberOfMine: 10 }
};


const Game = () => {

  console.log('Board Component render');
  const dispatch = useDispatch();

  const { row, col, numberOfMine }: Level = level.easy;

  // 처음 2차원 셀을 생성해주어서 렌더가 안되는 일이 없게 한다.
  const [cellData, setCellData] = useState<CellData[][]>(cellHandler.initializeCell(row, col));
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [numofFlag, setNumofFlag] = useState<number>(numberOfMine);

  // useSelector는 항상 최상단 함수에 작성한다.
  const { extraCell, gameRestart, isGameOver } = useSelector((state: RootState) => ({
    extraCell: state.game.isGameOver,
    gameRestart: state.game.gameRestart,
    isGameOver: state.game.isGameOver
  }));

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect는 내부 수행은 렌더링이 된 후 수행을 보장한다. 
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.

  useEffect(() => {
    const newCellData: CellData[][] = cellHandler.initializeCell(row, col);
    cellHandler.plantMine(newCellData, numberOfMine);
    cellHandler.getNeighbor(newCellData, { row, col, numberOfMine });
    setCellData(newCellData);
    setNumofFlag(numberOfMine);
    setFirstClick(true);
    dispatch(setExtraCell((row * col) - numberOfMine));
  }, [gameRestart, row, col, numberOfMine, dispatch]);


  const onCellClick = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {
    // 배열 state를 사용할 때 복사해서 사용하자.
    const newCellData: CellData[][] = [...cellData];

    e.preventDefault();
    onFirstClick(firstClick, e.button, newCellData, { y, x });

    let clickController = createClickFactory(e.button, newCellData, { y, x }, { row, col });
    const renderStatus: ClickRenderStatus = clickController.process();

    if (renderStatus.render === true) {
      if (renderStatus.flag === true) {
        clickController.getCellData()[y][x].flaged === true
          ? setNumofFlag(numofFlag => numofFlag - 1)
          : setNumofFlag(numofFlag => numofFlag + 1);
      }

      dispatch(setExtraCell(extraCell - renderStatus.removeCell));
      setCellData(newCellData);
    }
    clickController = null;
  }


  // 첫번째 클릭에 대한 이벤트 처리
  const onFirstClick = (isFirstClick: boolean, buttonType: number, newCellData: CellData[][], coord: Coord) => {
    const { y, x }: Coord = coord;
    if (firstClick === true && buttonType === LEFTCLICK) {
      setFirstClick(state => !state);

      // 첫클릭에 지뢰를 밟지 아니 하도록 한다.
      if (newCellData[y][x].mine === true) {
        newCellData[y][x].mine = false;
        cellHandler.plantMine(newCellData, 1);
        setCellData(newCellData);
      }
    }
  }


  const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }


  const renderBoard = () => {
    return (
      cellData.map((rowItem, y) => {
        return (
          <div className='game-container-row' key={y}>
            {rowItem.map((data, x) => {
              return (
                <Cell
                  key={(y * rowItem.length) + x}
                  value={data.mine && isGameOver <= 0 ? '💣' : data.visible}
                  islock={data.visited}
                  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onCellClick(e, { y, x })}
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
      <Header />
      <div className='board'>
        <div className='game-container'>
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