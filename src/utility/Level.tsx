import Level from '../interface/LevelInterface';

const easy: Level = { row: 10, col: 10, numberOfMine: 10 };
const normal: Level = { row: 16, col: 16, numberOfMine: 40 };
const hard: Level = { row: 16, col: 30, numberOfMine: 99 };
const test: Level = { row: 5, col: 5, numberOfMine: 5 };

export { easy, normal, hard, test };