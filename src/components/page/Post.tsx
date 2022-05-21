import React, { useEffect } from 'react';
import PostTitleInfo from '../organisms/post_title_Info';
import Header from '../header';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import PostArticle from '../organisms/post_article';
import styled from 'styled-components';
import PostCardList from '../organisms/post_cardlist';
import Pagenation from '../organisms/pagenation';

interface MatchParams {
  postid: string;
}

interface State {
  postList: any;
  totalItemCount: number;
  page: string;
}

const PostWrapper = styled.div`
  position: absolute;
  width: 84%;
  height:100%;
  max-width: 724px;
  min-width: 573px;
  left:50%;
  transform: translateX(-50%);
  margin: 2.0rem 0;
  word-break:break-all;
`;

export default function Post({ match, history, location }: RouteComponentProps<MatchParams>) {
  const { state } = useLocation<State>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  return (
    <>
      <Header
        selected='Community'
      />
      <PostWrapper>
        <PostArticle
          match={match}
          history={history}
          location={location}
        />
        <PostTitleInfo />
        <PostCardList
          postList={state.postList}
          totalItemCount={state.totalItemCount}
          url={'/community'}
          page={state.page}
        />
        <Pagenation
          totalItemCount={state.totalItemCount}
          currentPage={Number(state.page)}
          url={'/community'}
        />
      </PostWrapper>
    </>
  )
}