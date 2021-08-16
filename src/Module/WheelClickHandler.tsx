import { ClickHandler } from './ClickHandler';
import { CellData, Coord, BoardSize, ClickRenderStatus } from './Interface';

interface WheelClickInterFace {
  isFlagonMine(): boolean;
}

const noRender: ClickRenderStatus = {
  render: false,
  flag: false,
  removeCell: -1
}

const gameOver: ClickRenderStatus = {
  render: true,
  flag: false,
  removeCell: 987654321
}

class WheelClickHandler extends ClickHandler implements WheelClickInterFace {

  constructor(c: CellData[][], coo: Coord, bs: BoardSize) {
    super(c, coo, bs);
  }
  
  public process(): ClickRenderStatus {

    let numofExtraCell: number = 0;
    const cellData: CellData[][] = this.cellData;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].neighbor < 0
      || cellData[y][x].flaged === true
      || cellData[y][x].visited === false) {

      return noRender;
    }

    let numofHit: number = 0;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.checkOutRange(i, j)) {
          continue;
        }
        if (this.isFlagonMine()) {
          numofHit++;
        }
      }
    }

    if (numofHit !== cellData[y][x].neighbor) {
      return gameOver;
    }

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.checkOutRange(i, j)) {
          continue;
        }
        if (cellData[i][j].neighbor > 0) {
          cellData[i][j].visible = cellData[i][j].neighbor;
          cellData[i][j].visited = true;
          continue;
        }
        numofExtraCell += this.depthFirstSearch({ y: i, x: j });
      }
    }

    return {
      render:true,
      flag:false,
      removeCell: numofExtraCell
    }as ClickRenderStatus;
  }

  public isFlagonMine(): boolean {
    const { y, x }: Coord = this.coord;
    const cellData: CellData[][] = this.cellData;
    return cellData[y][x].flaged === true && cellData[y][x].mine === true;
  }
}

export default WheelClickHandler;