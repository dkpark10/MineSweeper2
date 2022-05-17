import Header from '../header';
import Pagenation from '../organisms/pagenation';
import PostTitleInfo from '../organisms/post_title_Info';
import PageBlock from '../molecules/page_wrapper';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import React, { useEffect, useState } from 'react';
import axiosApi, { Response } from '../../utils/axiosapi';
import { IPost } from '../organisms/post_article';
import PostCardList from '../organisms/post_cardlist';

interface MatchParams {
  page: string;
  postid: string;
}

const BulletinWrapper = styled.div`
  position: relative;
  width: 84%;
  max-width: 794px;
  min-width: 573px;
  left:50%;
  transform: translateX(-50%);
  word-break:break-all;
  margin:2.0rem 0;
`;

export default function BulletinMain({ match, location }: RouteComponentProps<MatchParams>) {

  const { page } = queryString.parse(location.search);
  const [postList, setPostList] = useState<IPost[]>([]);
  const [totalItemCount, setTotalItemCount] = useState<number>(1);

  const { isLogin } = useSelector((state: RootState) => ({
    isLogin: state.login.isLogin
  }));

  useEffect(() => {

    axiosApi.get(`/api/posts?page=${page}`)
      .then((response: Response) => {
        setPostList(prev => ([
          ...response.data.result
        ]))
        return response.data.totalContentSize;
      })
      .then((res: number) => setTotalItemCount(res))
      .catch(e => { });
  }, [page]);

  return (
    <>
      <Header
        selected='Community'
      />
      <BulletinWrapper>
        {/* <SearchInput
          width={'19.2rem'}
          height={'1.6rem'}
          backgroundColor={'white'}
        /> */}
        {isLogin &&
          <PageBlock
            align={'right'}
            url={`${match.url}/create`}
            width={'4.2rem'}
            value={'Create'}
            bold={true}
            border={true}
          />}
        <PostTitleInfo />
        <PostCardList
          postList={postList}
          totalItemCount={totalItemCount}
          url={match.url}
          page={page as string}
        />
      </BulletinWrapper>
      <Pagenation
        totalItemCount={totalItemCount}
        currentPage={Number(page)}
        url={'/community'}
      />
    </>
  )
}