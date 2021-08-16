import { ClickHandler } from './ClickHandler';
import { CellData, Coord, BoardSize, ClickRenderStatus } from './Interface';

const noRender: ClickRenderStatus = {
  render: false,
  flag: false,
  removeCell: -1
}

class RightClickHandler extends ClickHandler {

  constructor(c: CellData[][], coo: Coord, bs?: BoardSize) {
    super(c, coo);
  }
  
  public process(): ClickRenderStatus {

    const cellData: CellData[][] = this.cellData;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].visited === true
      && (cellData[y][x].neighbor > 0
        || cellData[y][x].neighbor <= 0)) {

      return noRender;
    }

    let value: boolean = cellData[y][x].flaged;
    value = !value;
    cellData[y][x].flaged = value;
    cellData[y][x].visible = value === true ? '🚩' : ' ';

    return {
      render: true,
      flag: true,
      removeCell: -1
    } as ClickRenderStatus
  }
}

export default RightClickHandler;