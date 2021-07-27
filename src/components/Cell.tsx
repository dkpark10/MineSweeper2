import React from "react";

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

interface CellProps{
  value : string | number,
  onClick:React.MouseEventHandler<HTMLDivElement>,
  onContextMenu: React.MouseEventHandler<HTMLDivElement>
};

export default class Cell extends React.Component<CellProps, any> {

  render() {
    const {value, onClick, onContextMenu}:CellProps = this.props;

    return (
      <div className="cell" onClick = {onClick} onContextMenu = {onContextMenu} >
        <div>{value}</div>
      </div>
    );
  }
}
