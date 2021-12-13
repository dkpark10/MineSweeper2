import Header from '../Header';
import InnerLink from '../atoms/InnerLink';
import { InlineText } from '../atoms/Text';
import Pagenation from '../organisms/Pagenation';
import PostWrapper from '../organisms/PostContainer';
import TextWrapper from '../molecules/TextWrapper';
import SearchInput from '../molecules/SearchInput';
import PageBlock from '../molecules/PageWrapper';
import CreatePost from '../template/CreatePost';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { RootState } from '../../reducers';
import NotFound from '../NotFound';
import React, { useEffect, useState } from 'react';
import axiosApi, { Response } from '../../modules/API';
import { calculTimeAgo } from '../../modules/DateHandler';
import Post, { IPost } from '../template/Post';

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
`;

type TpostTitleTuple = [string, number];

function BulletinMain({ match, location }: RouteComponentProps<MatchParams>) {

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

const postTitleInfo: TpostTitleTuple[] = [
  ['Title', 1],
  ['Author', 2],
  ['Time', 3],
  ['Like', 4]
]

const PostTitleInfo: JSX.Element[] = postTitleInfo.map(ele => {

  const [value, idx] = ele;

  return (
    <TextWrapper
      key={idx}
      width={'none'}
      fontSize={'1.2rem'}
      value={value}
      isColor={false}
      justifyContent={'center'}
    />
  )
});

const postCardList: JSX.Element[] = postList.map((ele) => {

  const { id, author, title, comments, likenum, time } = ele;

  return (
    <PostWrapper
      key={id}
      backgroundColor={'white'}
      grid_Template_Columnn={'70% 10% 10% 10%'}
    >
      <InnerLink url={`${match.url}/${id}`}>
        <TextWrapper
          width={'none'}
          fontSize={'1.2rem'}
          value={title}
          isColor={false}
          paddingLeft={'1.1rem'}
        >
          <InlineText
            size={'0.8rem'}
            value={`[${comments}]`}
            isColor={true}
            bold={true}
          />
        </TextWrapper>
      </InnerLink>
      <TextWrapper
        width={'none'}
        fontSize={'0.85rem'}
        value={author}
        isColor={false}
        justifyContent={'center'}
      />
      <TextWrapper
        width={'none'}
        fontSize={'0.85rem'}
        value={calculTimeAgo(time)}
        isColor={false}
        justifyContent={'center'}
      />
      <TextWrapper
        width={'none'}
        fontSize={'1.05rem'}
        value={String(likenum)}
        isColor={true}
        justifyContent={'center'}
      />
    </PostWrapper >
  )
});

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
      <hr style={{ width: '824px' }} />
      <PostWrapper
        backgroundColor={'none'}
        grid_Template_Columnn={'70% 10% 10% 10%'}
      >
        {PostTitleInfo}
      </PostWrapper>
      {postCardList}
    </BulletinWrapper>
    <Pagenation
      totalItemCount={totalItemCount}
      currentPage={Number(page)}
      match={match}
    />
  </>
)
}

export default function Bulletin({ match }: RouteComponentProps<MatchParams>) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={BulletinMain} />
        <Route path={`${match.url}/create`} component={CreatePost} />
        <Route path={`${match.url}/:postid`} component={Post} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}