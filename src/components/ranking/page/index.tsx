import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import queryString from 'query-string';

import Header from "../../common/organisms/header";
import Footer from "../../common/organisms/footer";
import PageNation from "../../common/molecules/pagenation";
import Loading from "../../common/atoms/loading";
import RankWrapper from "../atoms/rank_wrapper";
import RankNavigator from "../molecules/rank_navigator";
import RankItem from "../molecules/rank_item";

import useAxios from "../../custom_hooks/useaxios";

interface MatchParams {
  level: string;
  page: string;
}

interface GameProps {
  id: string;
  record: string;
  ranking: number;
  totalItemCount: number;
}

export default function Ranking({
  match,
  location }: RouteComponentProps<MatchParams>) {

  const { page } = queryString.parse(location.search);
  const level = match.params.level;
  const [data, loading] = useAxios<GameProps[]>(`/api/game/${level}?page=${page}`, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div>
        <RankWrapper>
          <RankNavigator
            currentLevel={level}
          />
          <RankItem />
          <ul>
            {data.map((rank, idx) =>
              <li key={idx}>
                <Link to={`/mypage/${rank.id}`} replace>
                  <RankItem
                    rank={Number(page) + idx}
                    id={rank.id}
                    record={rank.record}
                  />
                </Link>
              </li>
            )}
          </ul>
          <PageNation
            url={match.url}
            totalItemCount={data.length === 0 ? 1 : data[0].totalItemCount}
            currentPage={Number(page)}
          />
        </RankWrapper>
      </div>
      <Footer />
    </>
  )
}