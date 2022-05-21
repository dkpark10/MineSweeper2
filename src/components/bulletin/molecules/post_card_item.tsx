import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PostItemWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  height:39px;
  font-size:0.86rem;
`;

const PostItem = styled.span<{ width: string, fontSize: string, center?: boolean }>`
  display:inline-block;
  width:${({ width }) => width};
  text-align: ${({ center }) => center ? "center" : ""};
  font-size: ${({ fontSize }) => fontSize};
  text-overflow: ellipsis;
  overflow:hidden;

  a{
    cursor:pointer;
    text-decoration: none;
    color:${({ theme }) => theme.fontColor};
    padding:0 10px;
  }

  a:hover{
    color:${({ theme }) => theme.mainColor};
    text-decoration-color: ${({ theme }) => theme.mainColor};
    text-decoration:underline;
  }
`;

interface Props {
  title?: string;
  author?: string;
  date?: string;
  widthRatio:string[];
  url: string;
  postid: number;
}

export default function PostCardItem({
  title,
  author,
  date,
  widthRatio,
  url,
  postid
}: Props) {

  const defaultFontSize = "0.9rem";

  return (
    <PostItemWrapper>
      <PostItem
        width={widthRatio[0]}
        center={false}
        fontSize={defaultFontSize}
      >
        <Link to={`${url}/${postid}`}>
          {title}
        </Link>
      </PostItem>
      <PostItem
        width={widthRatio[1]}
        fontSize={"0.75rem"}
        center={false}
      >
        {author}
      </PostItem>
      <PostItem
        width={widthRatio[2]}
        fontSize={"0.75rem"}
        center={false}
      >
        {date}
      </PostItem>
    </PostItemWrapper>
  )
}