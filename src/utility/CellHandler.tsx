import Level from '../interface/LevelInterface';

const plantMine = (level: Level, board: number[][]) => {
  const { row, col, numberOfMine }: Level = level;
  let tmp = numberOfMine;

  while (tmp) {
    const ranY = Math.floor(Math.random() * row);
    const ranX = Math.floor(Math.random() * col);

    if (board[ranY][ranX] === 0) {
      board[ranY][ranX] = 1;
      tmp--;
    }
  }
}

const getNeighbor = (level: Level, board: number[][]): number[][] => {
  const { row, col, }: Level = level;
  let ret: number[][] = Array.from(Array(row), () => Array(col).fill(0));

  for (let i: number = 0; i < row; i++) {
    for (let j: number = 0; j < col; j++) {
      ret[i][j] = calcNeighbor(i, j, board, level);
    }
  }

  return ret;
}

const calcNeighbor = (y: number, x: number, board: number[][], {row,col}): number => {
  let ret: number = 0;

  for (let i: number = y - 1; i <= y + 1; i++) {
    for (let j: number = x - 1; j <= x + 1; j++) {
      
      if (checkOutRange(i, j, row,col))
        continue;

      if (y === i && x === j)
        continue;

      if (board[i][j] === 1)
        ret++;
    }
  }
  return ret;
}

const checkOutRange = (y: number, x: number, borderY: number, borderX: number): boolean => {
  return y < 0 || x < 0 || y >= borderY || x >= borderX;
}

export { plantMine, getNeighbor };
