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
  position:relative;
  border-radius:5px;
  cursor:pointer;
  padding:4px;
  min-width: 32px;
  text-align:center;
  font-size:0.85rem;

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
        {value}
      </PageNationItemWrapper>
    </Link>
  )
}