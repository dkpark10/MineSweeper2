import React from "react";
import styled from "styled-components";
import useAxios from "../../custom_hooks/useaxios";
import Loading from "../../common/atoms/loading";

interface Props {
  postid: string;
}

const PostArticleWrapper = styled.article`
  width:100%;
  border:1px solid pink;
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
  const [response, loading] = useAxios<PostProps>(`api/posts/${postid}`);

  if (loading) {
    return <Loading />;
  }

  return (
    <PostArticleWrapper>

    </PostArticleWrapper>
  )
}