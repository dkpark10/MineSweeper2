import React, { useState, useEffect } from 'react';
import { Level, Coord, CellData, BoardSize } from 'mine-sweeper-type'
import { useDispatch, useSelector } from 'react-redux';

// import GameInfo from './game_info';
// import { setExtraCell } from '../../reducers/game';
import createClickFactory from '../../../modules/mine_sweeper/click_factory';
import CellHandler from '../../../modules/mine_sweeper/cell_handler';
import Cell from '../atoms/cell';
import styled from 'styled-components';

interface Props {
  level: Level;
}

const GameBoardWrapper = styled.div<{
  minWidth: string
}>`
  background-color: #2e2d2d;
  border-radius: 5px;
  padding:20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border:2px solid var(--main-theme-color);
  min-width: ${({ minWidth }) => minWidth};
`;

export default function MineSweeper({ level }: Props) {

  const dispatch = useDispatch();

  const { row, col, countOfMine } = level;
  const init = Array.from({ length: row }, () => Array)
    .map(() => Array.from({ length: col }, () => {
      return {
        mine: false,
        neighbor: 0,
        visited: false,
        flaged: false,
        visible: ' '
      };
    }))

  const [cellData, setCellData] = useState<CellData[][]>(new CellHandler(init, { row, col }, countOfMine).getCellData());
  const [firstClick, setFirstClick] = useState<boolean>(false);
  const [countOfFlag, setCountOfFlag] = useState<number>(level.countOfMine);

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect의 내부 수행로직은 렌더링이 된 후 수행을 보장한다. 
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.

  const onCellClick = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {

    onFirstClick(e.button, { y, x });
    const { row, col } = level;

    let clickController = createClickFactory(e.button, [...cellData], { y, x }, { row, col });
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
  const onFirstClick = (buttonType: number, coord: Coord) => {

    const { y, x } = coord;
    const LEFTCLICK = 0 as const;

    if (firstClick === true && buttonType === LEFTCLICK) {
      setFirstClick(true);

      // 첫클릭에 지뢰를 밟지 아니 하도록 한다.
      if (cellData[y][x].mine === true) {
        cellData[y][x].mine = false;
        setCellData(new CellHandler([...cellData], { row, col }, 1).getCellData());
      }
    }
  }


  const gameBoard: JSX.Element[] = cellData.map((rowItem, y) => {

    return (
      <div className='game-container-row' key={y}>
        {rowItem.map((data, x) => {
          return (
            <Cell
              key={(y * rowItem.length) + x}
              value={data.mine && extraCell <= 0 ? '💣' : data.visible}
              islock={data.visited}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onCellClick(e, { y, x })}
              onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
            />
          )
        })}
      </div>
    )
  })


  return (
    <>
      <GameBoardWrapper
        minWidth={level.width}
      >
        <GameInfo
          firstClick={firstClick}
          numofFlag={numofFlag}
          isGameOver={extraCell <= 0}
        />
        {gameBoard}
      </GameBoardWrapper>
    </>
  )
}