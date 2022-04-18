import React, { ReactText } from "react";
import styled from 'styled-components';

interface CellProps {
  value: string | number | ReactText;
  isLock: boolean;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onContextMenu: React.MouseEventHandler<HTMLDivElement>;
};

const CellStyle = styled.div<Partial<CellProps>>`
  width: 24px;
  height: 24px;
  margin: 0px 0.5px;
  display: inline-block;
  border-radius: 2px;
  position: relative;
  background-image: ${({ isLock }) => {
    return isLock === true
      ? 'linear-gradient(to bottom, #4a4952,#4a4952)'
      : 'linear-gradient(to bottom, #ffffff,#e4e4e4)';
  }};
`;

const CellTextStyle = styled.div<{
  color: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 9px;
  font-weight: bold;
  color: ${({ color }) => color};
`;

export default function Cell({
  value,
  isLock,
  onMouseDown,
  onContextMenu
}: CellProps) {

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

  return (
    <CellStyle
      className="cell"
      isLock={isLock}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      <CellTextStyle
        color={colorofButtonNumber[value]}
      >
        {value}
      </CellTextStyle>
    </CellStyle>
  );
}

// .cell {
//   width: 24px;
//   height: 24px;
//   background-image:linear-gradient(to bottom, #FFFFFF,#E4E4E4);
//   background-color: white;
//   margin: 0px 0.5px;
//   display:inline-block;
//   border-radius: 2px;
//   position: relative;
// }

// .cell .cell-text{
//   position: absolute;
//   background-image:linear-gradient(to bottom, #FFFFFF,#E4E4E4);
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// .cell:hover{
//   background-image:linear-gradient(to bottom, #dee6fc, #ffffff);
// }

// .cell:active{
//   background-image: linear-gradient(to bottom, #D4F4FA,#BDBDBD);
// }

// .lock {
//   width: 24px;
//   height: 24px;
//   background-color: #4a4952;
//   margin-right:0.5px;
//   margin-left:0.5px;
//   display:inline-block;
//   border-radius: 2px;
//   position: relative;
// }

// .lock div{
//   position: absolute;
//   background-color: #4a4952;
//   text-align: center;
//   display: inline;
//   font-weight: bold;
//   font-size: 7px;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }