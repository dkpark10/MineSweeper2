import { CellData, Coord } from '../interface/interface';
import { checkOutRange } from './CellHandler';

const directionY: number[] = [0, 0, 1, -1, -1, -1, 1, 1];
const directionX: number[] = [1, -1, 0, 0, -1, 1, -1, 1];

export const onLeftClick = (cellInfo: CellData[][], coord: Coord, row,col) => {
  const { y, x }: Coord = coord;

  if (cellInfo[y][x].visited === true) {
    return;
  }

  if (cellInfo[y][x].flaged === true) {
    cellInfo[y][x].visible = ' ';
    return;
  }

  if (cellInfo[y][x].mine === true) {
    cellInfo[y][x].visible = '💣';
    return;
  }

  if(cellInfo[y][x].neighbor > 0){
    cellInfo[y][x].visible = cellInfo[y][x].neighbor;
    return;
  }

  depthFirstSearch(cellInfo, {y,x});  
}


const depthFirstSearch = (cellInfo: CellData[][], coord: Coord) => {
  const { y, x }: Coord = coord;
  cellInfo[y][x].visited = true;

  setNeighborCell(cellInfo, coord);

  for (let i = 0; i < 8; i++) {
    const nextY = y + directionY[i];
    const nextX = x + directionX[i];
  }
}

// 연쇄 충돌을 일으키기전 빈칸주위를 체크하는 함수
const setNeighborCell = (cellInfo: CellData[][], coord: Coord) => {
  const { y, x }: Coord = coord;
  
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
    }
  }
}


export const onRightClick = (cellInfo: CellData[][], coord: Coord) => {
  const { y, x }: Coord = coord;

  if (cellInfo[y][x].visited === true) {
    return;
  }

  let value:boolean = cellInfo[y][x].flaged;
  value = !value;
  cellInfo[y][x].flaged = value;
  cellInfo[y][x].visible = value === true ? '🚩' : ' ';
}