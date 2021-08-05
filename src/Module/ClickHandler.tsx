import { CellData, Coord } from './Interface';
import { checkOutRange } from './CellHandler';

const directionY: number[] = [0, 0, 1, -1, -1, -1, 1, 1];
const directionX: number[] = [1, -1, 0, 0, -1, 1, -1, 1];

export const onLeftClick = (cellInfo: CellData[][], coord: Coord, boardSize: any) => {
  const { y, x }: Coord = coord;

  if (cellInfo[y][x].visited === true) {
    return;
  }

  if (cellInfo[y][x].flaged === true) {
    return;
  }

  if (cellInfo[y][x].mine === true) {
    cellInfo[y][x].visible = '💣';
    return;
  }

  if (cellInfo[y][x].neighbor > 0) {
    cellInfo[y][x].visible = cellInfo[y][x].neighbor;
    cellInfo[y][x].visited = true;
    return;
  }

  depthFirstSearch(cellInfo, { y, x }, boardSize);
}


const depthFirstSearch = (cellInfo: CellData[][], coord: Coord, boardSize: any) => {
  const { y, x }: Coord = coord;
  const { row, col }: any = boardSize;
  cellInfo[y][x].visited = true;

  setNeighborCell(cellInfo, coord, boardSize);

  for (let i = 0; i < 8; i++) {
    const nextY = y + directionY[i];
    const nextX = x + directionX[i];

    if (checkOutRange(nextY, nextX, row, col)) {
      continue;
    }

    if (cellInfo[nextY][nextX].visited === false
      && cellInfo[nextY][nextX].neighbor <= 0
      && cellInfo[nextY][nextX].flaged === false
      && cellInfo[nextY][nextX].mine === false) {
      depthFirstSearch(cellInfo, { y: nextY, x: nextX }, boardSize);
    }
  }
}

// 연쇄 충돌을 일으키기전 빈칸주위(근처지뢰가 있는 셀)을 체크하는 함수
const setNeighborCell = (cellInfo: CellData[][], coord: Coord, boardSize: any) => {
  const { y, x }: Coord = coord;
  const { row, col }: any = boardSize;

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {

      if (checkOutRange(i, j, row, col)) {
        continue;
      }
      if (i === y && j === x) {
        continue;
      }
      if (cellInfo[i][j].neighbor > 0 && cellInfo[i][j].flaged === false) {
        cellInfo[i][j].visible = cellInfo[i][j].neighbor;
        cellInfo[i][j].visited = true;
      }
    }
  }
}


export const onRightClick = (cellInfo: CellData[][], coord: Coord) => {
  const { y, x }: Coord = coord;

  if (cellInfo[y][x].visited === true
    && (cellInfo[y][x].neighbor > 0
      || cellInfo[y][x].neighbor <= 0)) {
    return;
  }

  let value: boolean = cellInfo[y][x].flaged;
  value = !value;
  cellInfo[y][x].flaged = value;
  cellInfo[y][x].visible = value === true ? '🚩' : ' ';
}


export const onWheelClick = (cellInfo: CellData[][], coord: Coord, boardSize: any) => {
  const { y, x }: Coord = coord;
  const { row, col }: any = boardSize;

  if (cellInfo[y][x].neighbor < 0
    || cellInfo[y][x].flaged === true) {
    return;
  }

  let numofHit: number = 0;

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (checkOutRange(i, j, row, col)) {
        continue;
      }
      if (isFlagonMine(cellInfo, [i, j])) {
        numofHit++;
      }
    }
  }

  if (numofHit !== cellInfo[y][x].neighbor) {
    return;
  }

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (checkOutRange(i, j, row, col)) {
        continue;
      }
      if (cellInfo[i][j].neighbor > 0) {
        cellInfo[i][j].visible = cellInfo[i][j].neighbor;
        cellInfo[i][j].visited = true;
        continue;
      }
      depthFirstSearch(cellInfo, { y: i, x: j }, boardSize);
    }
  }
}


const isFlagonMine = (cellInfo: CellData[][], coord: number[]) => {
  const y: number = coord[0];
  const x: number = coord[1];
  return cellInfo[y][x].flaged === true && cellInfo[y][x].mine === true;
}