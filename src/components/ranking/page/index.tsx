import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import queryString from 'query-string';

import Header from "../../common/organisms/header";
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
  const [response, loading] = useAxios<GameProps[]>(`/api/game/${level}?page=${page}`);

  return (
    <>
      <Header />
      {loading ? <Loading /> :
        <RankWrapper>
          <RankNavigator
            currentLevel={level}
          />
          <RankItem />
          <ul>
            {response.map((rank, idx) =>
              <li key={idx}>
                <RankItem
                  rank={String(rank.ranking)}
                  id={rank.id}
                  record={rank.record}
                />
              </li>
            )}
          </ul>
          <PageNation
            url={match.url}
            totalItemCount={response.length === 0 ? 1 : response[0].totalItemCount}
            currentPage={Number(page)}
          />
        </RankWrapper>}
    </>
  )
}