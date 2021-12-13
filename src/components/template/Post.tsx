import Header from '../Header';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useEffect } from 'react';
import axiosApi, { Response } from '../../modules/API';
import React, { useState } from 'react';
import { HeaderText, InlineText } from '../atoms/Text';
import TextWrapper from '../molecules/TextWrapper';
import parse from 'html-react-parser';
import { calculTimeAgo } from '../../modules/DateHandler';

interface MatchParams {
  postid: string;
}

const CreatePostWrapper = styled.div`
  position: absolute;
  width: 84%;
  max-width: 824px;
  left:50%;
  transform: translateX(-50%);
  margin: 2.0rem 0;
  background-color:white;
  border-radius:7px;
  padding: 2.0rem;
  height: 724px;
  word-break:break-all;
`;

export interface IPost {
  id: number;
  author: string;
  title: string;
  content: string;
  comments: number;
  likenum: number;
  time: number;
}

export default function Post({ match, history }: RouteComponentProps<MatchParams>) {

  const [post, setPost] = useState<IPost>({
    id: -1,
    author: '',
    title: '',
    content: '',
    comments: -1,
    likenum: -1,
    time: 0
  });

  const postid = match.params.postid;

  useEffect(() => {
    axiosApi.get(`http://localhost:8080/api/posts/${postid}`)
      .then((response: Response) => {
        setPost(prev => ({
          ...response.data
        }));
      })
  }, [postid]);
  
  return (
    <>
      <Header
        selected='Community'
      />
      <CreatePostWrapper>
        <HeaderText
          size={'2.2rem'}
          value={post.title}
          isColor={false}
        />
        <TextWrapper
          width={'none'}
          fontSize={'0.9rem'}
          value={`Posted by ${post.author} ${calculTimeAgo(post.time)}`}
        />
        <hr style={{ width: '100%' }} />
        <div style={{ marginTop: '1.5rem', border: '2px solid red' }}>
          {parse(post.content)}
        </div>
      </CreatePostWrapper>
    </>
  )
}