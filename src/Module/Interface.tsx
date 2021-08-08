export interface Level {
  row: number,
  col: number,
  numberOfMine: number
};

export interface CellData {
  mine: boolean,
  neighbor: number,
  visited: boolean,
  flaged: boolean,
  visible: number | string,
}

export interface Coord {
  y: number,
  x: number
};