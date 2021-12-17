import MyLink from '../atoms/MyLink';
import { InlineText } from '../atoms/Text';
import PostWrapper from '../organisms/PostContainer';
import TextWrapper from '../molecules/TextWrapper';
import { calculTimeAgo } from '../../modules/DateHandler';
import { IPost } from '../organisms/PostArticle';

interface IPostCardList {
  postList: IPost[];
  totalItemCount: number;
  url: string;
  page: string;
}

export default function PostCardList({ postList, totalItemCount, url, page }: IPostCardList) {

  return (
    <>
      {postList.map((ele) => {

        const { id, author, title, comments, likenum, time } = ele;

        return (
          <PostWrapper
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
              value={calculTimeAgo(time)}
              isColor={false}
            />
            <TextWrapper
              textAlign={'center'}
              fontSize={'1.05rem'}
              value={String(likenum)}
              isColor={true}
            />
          </PostWrapper >
        )
      })}
    </>
  )
}