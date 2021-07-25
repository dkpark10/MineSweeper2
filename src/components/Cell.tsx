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
  value :string,
  onClick:React.MouseEventHandler<HTMLDivElement>
};

export default class Cell extends React.Component<CellProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const {value, onClick}:CellProps = this.props;

    return (
      <div className="cell" onClick = {onClick}>
        <div>{value}</div>
      </div>
    );
  }
}
