import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GameStatisticsProps } from "statistics-type";

import Loading from "../../common/atoms/loading";
import Header from "../../common/organisms/header";
import Statistics from "../molecules/statistics";

import useIsLogined from "../../custom_hooks/uselogined";
import useAxios from "../../custom_hooks/useaxios";
import MyPageWrapper from "../atoms/wrapper";
import UserHeader from "../atoms/user_header";

export default function MyPage({
  history
}: RouteComponentProps) {
  // const [userid,] = useIsLogined(history);
  const [response, loading] = useAxios<GameStatisticsProps>(`/api/game?userid=dkpark10`);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main>
        <MyPageWrapper>
          <UserHeader
            id={"dkpark10"}
          />
        </MyPageWrapper>
        <MyPageWrapper>
          <Statistics
            data={response}
          />
        </MyPageWrapper>
      </main>
    </>
  )
}