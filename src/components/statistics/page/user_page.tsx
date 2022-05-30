import React from "react";
import styled from "styled-components";
import { GameStatisticsProps } from "statistics-type";

import Loading from "../../common/atoms/loading";
import Header from "../../common/organisms/header";
import Footer from "../../common/organisms/footer";
import Statistics from "../molecules/statistics";
import PastGameRecord from "../molecules/pastgame_record";
import WinRateRecord from "../molecules/winrate_record";

import useAxios from "../../custom_hooks/useaxios";
import MyPageWrapper from "../atoms/wrapper";
import Title from "../../common/atoms/title";

const TitleHeaderStyle = styled.div`
  text-align:center;
`;

interface Props {
  userid: string;
}

export default function MyPage({
  userid
}: Props) {
  const [response, loading] = useAxios<GameStatisticsProps>(`/api/game?userid=${userid}`);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main>
        <MyPageWrapper>
          <TitleHeaderStyle>
            <Title
              fontSize={"1.28rem"}
              fontBold={true}
            >
              {userid}
            </Title>
          </TitleHeaderStyle>
        </MyPageWrapper>
        <MyPageWrapper>
          <Statistics
            data={response}
          />
        </MyPageWrapper>
        <MyPageWrapper>
          <TitleHeaderStyle>
            {"승률"}
          </TitleHeaderStyle>
          <WinRateRecord
            gameRecord={response}
          />
        </MyPageWrapper>
        <MyPageWrapper>
          <PastGameRecord
            pastGame={response.pastGame}
          />
        </MyPageWrapper>
      </main>
      <Footer />
    </>
  )
}