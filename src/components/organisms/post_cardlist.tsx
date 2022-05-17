import MyLink from '../atoms/mylink';
import { InlineText } from '../atoms/text';
import { PostStyle } from '../atoms/post_wrapper';
import TextWrapper from '../molecules/text_wrapper';
import { calculPassedTime } from '../../utils/date_handler';
import { IPost } from './post_article';
import styled from 'styled-components';

interface IPostCardList {
  postList: IPost[];
  totalItemCount: number;
  url: string;
  page: string;
}

const PostCardWrapper = styled(PostStyle)`
  &:hover {
    border: 2px solid ${({ theme }) => theme.mainColor};
  }
`;

export default function PostCardList({ postList, totalItemCount, url, page }: IPostCardList) {

  return (
    <>
      {postList.map((ele) => {

        const { id, author, title, comments, likenum, time } = ele;

        return (
          <PostCardWrapper
            key={id}
            backgroundColor={'white'}
            grid_Template_Columnn={'69% 11% 11% 9%'}
          >
            {/* 게시글 아래 게시글 리스트를 위한 파라미터 */}
            <MyLink
              url={`${url}/${id}`}
              state={{
                totalItemCount,
                postList,
                page
              }}
            >
              <TextWrapper
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
            </MyLink>
            <TextWrapper
              textAlign={'center'}
              fontSize={'0.85rem'}
              value={author}
              isColor={false}
            />
            <TextWrapper
              textAlign={'center'}
              fontSize={'0.85rem'}
              value={calculPassedTime(time)}
              isColor={false}
            />
            <TextWrapper
              textAlign={'center'}
              fontSize={'1.05rem'}
              value={String(likenum)}
              isColor={true}
            />
          </PostCardWrapper>
        )
      })}
    </>
  )
}