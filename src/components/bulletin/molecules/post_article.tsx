import React from "react";
import styled from "styled-components";
import useAxios from "../../custom_hooks/useaxios";
import Loading from "../../common/atoms/loading";
import Title from "../../common/atoms/title";
import Content from "../../common/atoms/content";
import UnderLine from "../../common/atoms/under_line";
import parse from 'html-react-parser';
import { calculPassedTime } from "../../../utils/date_handler";

interface Props {
  postid: string;
}

const PostArticleWrapper = styled.article`
  width:100%;
  padding:8px;
`;

const PostTitleInfo = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const PostContentWrapper = styled.div`
  width:100%;
  margin:30px 0px;
`;

interface PostProps {
  author: string;
  content: string;
  title: string;
  views: number;
  time: number;
}

export default function PostArticle({
  postid
}: Props) {
  const [response, loading] = useAxios<PostProps>(`api/posts/${postid}`, {
    author:"",
    content:"",
    title:"",
    views:0,
    time:0
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <PostArticleWrapper>
      <Title
        fontSize={"1.26rem"}
        fontBold={true}
      >
        {response.title}
      </Title>
      <UnderLine />
      <PostTitleInfo>
        <Content
          fontSize={"0.72rem"}
        >
          작성날짜: {calculPassedTime(response.time)}
        </Content>
        <Content
          fontSize={"0.72rem"}
        >
          작성자: {response.author}
        </Content>
      </PostTitleInfo>
      <PostContentWrapper>
        <Content>
          {parse(response.content)}
        </Content>
      </PostContentWrapper>
    </PostArticleWrapper>
  )
}