import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import queryString from 'query-string';
import styled from "styled-components";

import Header from "../../common/organisms/header";
import PageNation from "../../common/molecules/pagenation";
import Loading from "../../common/atoms/loading";
import DefaultBulletinWrapper from "../atoms/bulletin_wrapper";
import PostCardItem from "../molecules/post_card_item";
import PostCardHeader from "../molecules/post_card_header";
import BuelltinNavi from "../molecules/post_navigator";

import useAxios from "../../custom_hooks/useaxios";
import { calculPassedTime } from "../../../utils/date_handler";

interface PostProps {
  id: number;
  author: string;
  title: string;
  comments: number;
  likenum: number;
  time: number;
  totalItemCount: number;
}

const BulletionWrapper = styled(DefaultBulletinWrapper)`
 ul{
    list-style: none;
  }

  li:nth-child(odd) {
    background-color: white;
  }

  li:last-child{
    margin-bottom: 10px;
  }
`;

export default function Bulletion({ match, location }: RouteComponentProps) {

  const { page } = queryString.parse(location.search);
  const [response, loading] = useAxios<PostProps[]>(`/api/posts?page=${page}`);
  const widthRatio = ["68%", "20%", "12%"];

  if (loading) {
    return < Loading />;
  }

  return (
    <>
      <Header />
      <div>
        <BulletionWrapper>
          <BuelltinNavi
            url={location.pathname}
          />
          <PostCardHeader
            widthRatio={widthRatio}
          />
          <ul>
            {response.map((post, idx) =>
              <li key={idx}>
                <PostCardItem
                  widthRatio={widthRatio}
                  title={post.title}
                  author={post.author}
                  date={calculPassedTime(post.time)}
                  url={match.url}
                  postid={post.id}
                />
              </li>
            )}
          </ul>
          <PageNation
            url={location.pathname}
            totalItemCount={response.length === 0 ? 1 : response[0].totalItemCount}
            currentPage={Number(page)}
          />
        </BulletionWrapper>
      </div>
    </>
  )
}
