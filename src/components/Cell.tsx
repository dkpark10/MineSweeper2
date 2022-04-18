import React, { ReactText } from "react";

const colorofButtonNumber: string[] = [
  "",
  "#FF245E",
  "#8CA9FA",
  "#FFAA39",
  "#7EEE62",
  "#D9D1E8",
  "#0DEBEB",
  "#A566F8",
  "#A9350B"
];

interface CellProps {
  value: string | number | ReactText,
  isLock: boolean,
  onMouseDown: React.MouseEventHandler<HTMLDivElement>,
  onContextMenu: React.MouseEventHandler<HTMLDivElement>
};

const Cell = (props: CellProps) => {

  const { value, isLock, onMouseDown, onContextMenu }: CellProps = props;
  const strColor = colorofButtonNumber[value];

  return (
    <div
      className={isLock ? "lock" : "cell"}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      <div className='cell-text' style={{ color: `${strColor}` }}>{value}</div>
    </div>
  );
}

export default Cell;
