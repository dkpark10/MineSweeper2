import React from "react";
import styled from "styled-components";
import Content from "../../common/atoms/content";
import { ContentOuterWrapper, ContentWrapper, ContentHeader } from "../atoms/wrapper";
import { GameStatisticsProps } from "statistics-type";

interface Props {
  data: GameStatisticsProps;
}

const StatisticsContent = styled(Content)`
  display:inline-block;
  width:54px;
`;

export default function Statistics({
  data
}: Props) {
  const {
    easyGameTotalCount,
    easyGameWinCount,
    easyBestRecord,
    normalGameTotalCount,
    normalGameWinCount,
    normalBestRecord,
    hardGameTotalCount,
    hardGameWinCount,
    hardBestRecord
  } = data;

  return (
    <>
      <ContentOuterWrapper>
        <ContentWrapper>
          {["쉬움", "보통", "어려움"].map((level, idx) =>
            <StatisticsContent
              key={idx}
              fontColor={true}
              fontSize={"1.02rem"}
              bold={true}
            >
              {level}
            </StatisticsContent>
          )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          게임 수:
        </ContentHeader>
        <ContentWrapper>
          {[easyGameTotalCount,
            normalGameTotalCount,
            hardGameTotalCount].map((totalItemCount, idx) =>
              <StatisticsContent
                key={idx}
                fontSize={"1.00rem"}
              >
                {totalItemCount}
              </StatisticsContent>
            )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          승리 수:
        </ContentHeader>
        <ContentWrapper>
          {[easyGameWinCount,
            normalGameWinCount,
            hardGameWinCount].map((winCount, idx) =>
              <StatisticsContent
                key={idx}
                fontSize={"1.00rem"}
              >
                {winCount}
              </StatisticsContent>
            )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          최고기록:
        </ContentHeader>
        <ContentWrapper>
          {[easyBestRecord,
            normalBestRecord,
            hardBestRecord].map((bestRecord, idx) =>
              <StatisticsContent
                key={idx}
                fontSize={"1.00rem"}
              >
                {bestRecord}
              </StatisticsContent>
            )}
        </ContentWrapper>
      </ContentOuterWrapper>
      <ContentOuterWrapper>
        <ContentHeader>
          승률:
        </ContentHeader>
        <ContentWrapper>
          {[
            Math.floor(easyGameWinCount / easyGameTotalCount * 100),
            Math.floor(normalGameWinCount / normalGameTotalCount * 100),
            Math.floor(hardGameWinCount / hardGameTotalCount * 100)
          ].map((winRate, idx) =>
            <StatisticsContent
              key={idx}
              fontSize={"1.00rem"}
            >
              {winRate}%
            </StatisticsContent>
          )}
        </ContentWrapper>
      </ContentOuterWrapper>
    </>
  )
}