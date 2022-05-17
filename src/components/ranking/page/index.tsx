import React, { useState } from "react";
import Header from "../../common/organisms/header";
import PageNation from "../../common/molecules/pagenation";
import { RouteComponentProps } from "react-router-dom";
import queryString from 'query-string';

interface MatchParams {
  level: string;
  page: string;
}

export default function Ranking({
  match,
  location }: RouteComponentProps<MatchParams>) {

  const { page } = queryString.parse(location.search);
  const [totalItemCount, setTotalItemCount] = useState<number>(1200);
  const level = match.params.level;

  return (
    <>
      <Header />
      <PageNation
        url={match.url}
        totalItemCount={totalItemCount}
        currentPage={Number(page)}
      />
    </>
  )
}