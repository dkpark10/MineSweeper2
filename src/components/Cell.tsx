import React, { ReactText } from "react";

const colorofButtonNumber: string[] = [
  "",
  "#FF245E",
  "#614BF4",
  "#FFAA39",
  "#DC1C38",
  "#7EEE62",
  "#0DEBEB",
  "#A566F8",
  "#A9350B"
];

interface CellProps {
  value: string | number | ReactText,
  islock: boolean,
  onMouseDown: React.MouseEventHandler<HTMLDivElement>,
  onContextMenu: React.MouseEventHandler<HTMLDivElement>
};

const Cell = (props: CellProps) => {

  const { value, islock, onMouseDown, onContextMenu }: CellProps = props;
  const strColor: string = colorofButtonNumber[value];
  return (
    <div className={islock ? "lock" : "cell"} onMouseDown={onMouseDown} onContextMenu={onContextMenu} >
      <div style={{ color: `${strColor}` }}>{value}</div>
    </div>
  );
}

export default Cell;
