import { ClickHandler } from './click_handler';
import LeftClickHandler from './left_click_handler';
import RightClickHandler from './right_click_handler';
import WheelClickHandler from './wheel_click_handler';
import { CellData, Coord, BoardSize } from './common';

enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLCK };

const createClickFactory = (buttonType: number, cd: CellData[][], coo: Coord, bs: BoardSize): ClickHandler => {
  switch (buttonType) {
    case CLICKTYPE.LEFTCLICK:
      return new LeftClickHandler(cd, coo, bs);
    case CLICKTYPE.RIGHTCLCK:
      return new RightClickHandler(cd, coo);
    case CLICKTYPE.WHEELCLICK:
      return new WheelClickHandler(cd, coo, bs);
  }
}

export default createClickFactory;