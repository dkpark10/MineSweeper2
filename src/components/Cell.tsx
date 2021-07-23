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

export default class Cell extends React.Component<any, any> {
  constructor(props) {
    super(props);

  }

  render() {
    const id: string = this.props.cellId;
    const value:string = this.props.value;

    return (
      <div key={id} className="cell" >
        <div>{value}</div>
      </div>
    );
  }
}
