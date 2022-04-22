import React, { useEffect, useRef, useState } from 'react';
import createClickFactory from '../../../modules/mine_sweeper/click_factory';
import CellHandler from '../../../modules/mine_sweeper/cell_handler';
import Cell from '../atoms/cell';
import GameHeader from '../organisms/game_header';
import ModalWrapper from '../../common/organisms/modal_wrapper';
import ModalContent from '../organisms/modal_content';

import styled from 'styled-components';
import {
  Level,
  Coord,
  CellData,
  ClickRenderStatus
} from 'mine-sweeper-type'

interface Props {
  level: string;
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
  box-shadow:  6px 6px 15px #272626;

  min-width: ${({ minWidth }) => minWidth};

  .game-container-row{
    margin-bottom: 0px;
    height:25px;
  }
`;

export default function MineSweeper({ level }: Props) {

  const levelList: { [key: string]: Level } = {
    Easy: { row: 9, col: 9, countOfMine: 10, width: '265px' },
    Normal: { row: 16, col: 16, countOfMine: 40, width: '444px' },
    Hard: { row: 16, col: 30, countOfMine: 99, width: '794px' }
  };

  const { row, col, countOfMine, width } = levelList[level];

  const [cellData, setCellData] = useState<CellData[][]>([]);
  const [firstClick, setFirstClick] = useState<boolean>(false);
  const [countOfFlag, setCountOfFlag] = useState<number>(countOfMine);
  const [extraCell, setExtraCell] = useState<number>((row * col) - countOfMine);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [gameReset, setGameReset] = useState<boolean>(false);
  const beginTime = useRef<number>(0);

  useEffect(() => {
    const init = Array.from({ length: row }, () => Array)
    .map(() => Array.from({ length: col }, () => ({
      mine: false,
      neighbor: 0,
      visited: false,
      flaged: false,
      visible: ' '
    })))

    setCellData(new CellHandler(init, { row, col }, countOfMine).getCellData());
    setFirstClick(false);
    setCountOfFlag(countOfMine);
    setExtraCell((row * col) - countOfMine);
    setGameOver(false);
  }, [gameReset, row, col, countOfMine]);

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect의 내부 수행로직은 렌더링이 된 후 수행을 보장한다. 
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.
  const onCellClick = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {

    onFirstClick(e.button, { y, x });

    let clickController = createClickFactory(e.button, [...cellData], { y, x }, { row, col });
    const clickResult: ClickRenderStatus = clickController.process();
    const newCellData = clickController.getCellData();

    if (clickResult.render === true) {
      if (clickResult.flag === true) {

        newCellData[y][x].flaged === true
          ? setCountOfFlag(countOfFlag - 1)
          : setCountOfFlag(countOfFlag + 1);
      }

      setExtraCell(extraCell - clickResult.removeCell);
      setCellData(newCellData);
      setGameOver(extraCell - clickResult.removeCell <= 0);
    }
    clickController = null;
  }


  // 첫번째 클릭에 대한 이벤트 처리
  const onFirstClick = (buttonType: number, coord: Coord) => {

    const LEFTCLICK = 0 as const;
    const { y, x } = coord;

    if (firstClick === false && buttonType === LEFTCLICK) {
      setFirstClick(true);
      beginTime.current = new Date().getTime();

      // 첫클릭에 지뢰를 밟지 아니 하도록 한다.
      if (cellData[y][x].mine === true) {
        cellData[y][x].mine = false;
        setCellData(new CellHandler([...cellData], { row, col }, 1).getCellData());
      }
    }
  }


  return (
    <>
      {isGameOver &&
        <ModalWrapper>
          <ModalContent
            beginTime={beginTime.current}
            level={level}
            onMouseClick={() => setGameReset(prev => !prev)}
          />
        </ModalWrapper>
      }
      <GameBoardWrapper
        minWidth={width}
      >
        <GameHeader
          firstClick={firstClick}
          countOfFlag={countOfFlag}
          isGameOver={isGameOver}
        />
        {cellData.map((rowItem, y) => {
          return (
            <div className='game-container-row' key={y}>
              {rowItem.map((data, x) =>
                <Cell
                  key={(y * rowItem.length) + x}
                  value={data.mine && isGameOver ? '💣' : data.visible}
                  isLock={data.visited}
                  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onCellClick(e, { y, x })}
                  onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
                />
              )}
            </div>
          )
        })}
      </GameBoardWrapper>
    </>
  )
}