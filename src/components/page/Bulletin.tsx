import Header from '../Header';
import Pagenation from '../organisms/Pagenation';
import PostTitleInfo from '../organisms/PostTitleInfo';
import SearchInput from '../molecules/SearchInput';
import PageBlock from '../molecules/PageWrapper';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import React, { useEffect, useState } from 'react';
import axiosApi, { Response } from '../../modules/API';
import { IPost } from '../organisms/PostArticle';
import PostCardList from '../organisms/PostCardList';

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
  border:2px solid yellow;
`;

export default function BulletinMain({ match, location }: RouteComponentProps<MatchParams>) {

  const { page } = queryString.parse(location.search);
  const [postList, setPostList] = useState<IPost[]>([]);
  const [totalItemCount, setTotalItemCount] = useState<number>(1);

  const { isLogin } = useSelector((state: RootState) => ({
    isLogin: state.login.isLogin
  }));

  useEffect(() => {

    axiosApi.get(`http://localhost:8080/api/posts?page=${page}`)
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
        <SearchInput
          width={'19.2rem'}
          height={'1.6rem'}
          backgroundColor={'white'}
        />
        {isLogin &&
          <PageBlock
            align={'right'}
            url={`${match.url}/create`}
            width={'4.2rem'}
            value={'Create'}
            bold={true}
            border={true}
          />}
        <hr style={{ width: '100%', margin: '0.7rem 0' }} />
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