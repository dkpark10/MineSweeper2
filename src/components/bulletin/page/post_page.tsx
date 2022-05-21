import { RouteComponentProps } from "react-router-dom";
import Header from "../../common/organisms/header";
import DefaultBulletinWrapper from "../atoms/bulletin_wrapper";
import PostArticle from "../molecules/post_article";

interface MatchParams {
  postid: string;
}

export default function Post({
  match,
  history,
  location }: RouteComponentProps<MatchParams>) {
  const postid = match.params.postid;

  return (
    <>
      <Header />
      <div>
        <DefaultBulletinWrapper>
          <PostArticle 
            postid={postid}
          />
        </DefaultBulletinWrapper>
      </div>
    </>
  )
}
