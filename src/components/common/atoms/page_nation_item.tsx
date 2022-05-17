import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  value: string;
  url: string;
  currentPage?: boolean;
}

const PageNationItemWrapper = styled.span<Partial<Props>>`
  display:inline-block;
  width: 36px;
  height:36px;
  top:2px;
  position:relative;
  border-radius:5px;
  cursor:pointer;

  background-color:${({ theme, currentPage }) =>
    currentPage === true
      ? theme.mainColor
      : ""};

  color:${({ theme, currentPage }) =>
    currentPage === true
      ? "white"
      : theme.fontColor};

  &:hover{
    color:${({ theme }) => theme.mainColor};
  }

  div{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
`;

export default function PageNationItem({
  value,
  url,
  currentPage = false
}: Props) {
  return (
    <Link to={url}>
      <PageNationItemWrapper
        currentPage={currentPage}
      >
        <div>
          {value}
        </div>
      </PageNationItemWrapper>
    </Link>
  )
}