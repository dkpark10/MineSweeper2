import Header from '../Header';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axiosApi, { Response } from '../../modules/API';
import { RootState } from '../../reducers';
import React, { useEffect, useState } from 'react';
import MyResponsivePie, { PieData } from '../molecules/NivoPie'
import MyResponsiveBar from '../molecules/NivoBar'
import { HeaderText, InlineText } from '../atoms/Text';
import TextWrapper from '../molecules/TextWrapper';
import PostWrapper from '../atoms/PostWrapper';

const StatisticsWrapper = styled.div`
  margin: 30px 0;
  padding:0 40px;
  left: 50%;
  transform: translate(-50%);
  position: absolute;
  min-width: 794px;
  background-color:white;
  border-radius: 9px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
`;

const ItemContainer = styled.div<{ height: string }>`
  width:100%;
  height: ${({ height }) => height};
  border-radius:8px;
  padding:20px;
  box-shadow: 4px 4px 14px -2px rgb(245,234,232);
  margin-bottom:2.0rem;
`;

interface IPastGame {
  record: number;
  date: string;
  success: number;
  level: string;
}

export default function Statistics() {

  const { userid } = useSelector((state: RootState) => ({
    userid: state.login.id
  }));

  const [gameCountPerLevel, setGameCountPerLevel] = useState<PieData[]>(Array.from({ length: 3 }, (v, i) => ({
    id: `${i}`,
    label: `${i}`,
    value: 0,
    color: ''
  })));

  const [pastGame, setPastGame] = useState<IPastGame[]>(Array.from({ length: 20 }, (v, i) => ({
    record: 0,
    date: '',
    success: 0,
    level: ''
  })));

  const [winRate, setWinRate] = useState<number[]>([0, 1, 2]);
  const [totalGame, setTotalGame] = useState<number>(0);
  const [winCount, setWinCount] = useState<number[]>([]);

  useEffect(() => {
    axiosApi.get(`http://localhost:8080/api/game?userid=${userid}`)
      .then((res: Response) => {

        const { easytotal, normaltotal, hardtotal, easywin, normalwin, hardwin, pastGame } = res.data;
        setPastGame(prev => [...pastGame]);
        setTotalGame(easytotal + normaltotal + hardtotal);
        setGameCountPerLevel(prev => [
          {
            id: 'easy',
            label: 'easy',
            value: easytotal
          },
          {
            id: 'normal',
            label: 'normal',
            value: normaltotal
          },
          {
            id: 'hard',
            label: 'hard',
            value: hardtotal
          }
        ]);

        setWinCount(prev => [
          easywin, normalwin, hardwin
        ]);

        setWinRate(prev => [
          Math.floor(easywin * 100 / easytotal),
          Math.floor(normalwin * 100 / normaltotal),
          Math.floor(hardwin * 100 / hardtotal)
        ]);
      })
      .catch(e => { });

  }, [userid]);

  return (
    <>
      <Header
        selected='Statistics'
      />
      <StatisticsWrapper>
        <TextWrapper
          width={'100%'}
          textAlign={'center'}
        >
          <HeaderText
            size={'2.0rem'}
            value={userid}
            isColor={false}
          />
        </TextWrapper>
        <ItemContainer
          height={'none'}
        >
          <TextWrapper
            width={'100%'}
            textAlign={'left'}
          >
            <HeaderText
              size={'1.15rem'}
              value={`Easy`}
              isColor={false}
              margin={'0 0'}
            />
            <InlineText
              size={'1.0rem'}
              value={`total : ${gameCountPerLevel[0].value} win : ${winCount[0]}`}
              isColor={false}
            />
            <HeaderText
              size={'1.15rem'}
              value={`Normal`}
              isColor={false}
              margin={'0 0'}
            />
            <InlineText
              size={'1rem'}
              value={`total : ${gameCountPerLevel[1].value} win : ${winCount[1]}`}
              isColor={false}
            />
            <HeaderText
              size={'1.15rem'}
              value={`Hard`}
              isColor={false}
              margin={'0 0'}
            />
            <InlineText
              size={'1.0'}
              value={`total : ${gameCountPerLevel[2].value} win : ${winCount[2]}`}
              isColor={false}
            />
          </TextWrapper>
        </ItemContainer>
        <ItemContainer
          height={'450px'}
        >
          <HeaderText
            size={'1.15rem'}
            value={`TotalGame : ${totalGame}`}
            isColor={true}
            margin={'0 0px'}
          />
          <MyResponsivePie data={gameCountPerLevel} />
        </ItemContainer>
        <ItemContainer
          height={'450px'}
        >
          <HeaderText
            size={'1.15rem'}
            value={'WinRate'}
            isColor={true}
            margin={'0 0'}
          />
          <MyResponsiveBar data={[{
            level: 'easy',
            easy: winRate[0]
          }, {
            level: 'normal',
            normal: winRate[1]
          }, {
            level: 'hard',
            hard: winRate[2]
          }]} />
        </ItemContainer>
        <ItemContainer
          height={'none'}
        >
          <HeaderText
            size={'1.15rem'}
            value={'PastGame'}
            isColor={true}
            margin={'20px 0'}
          />
          <PostWrapper
            backgroundColor={'none'}
            grid_Template_Columnn={'repeat(5, 1fr)'}
          >
            <TextWrapper
              textAlign={'left'}
              fontSize={'1.15rem'}
            />
            <TextWrapper
              textAlign={'left'}
              fontSize={'1.15rem'}
              value={'Level'}
            />
            <TextWrapper
              textAlign={'center'}
              fontSize={'1.15rem'}
              value={'Record'}
            />
            <TextWrapper
              textAlign={'center'}
              fontSize={'1.15rem'}
              value={'Success'}
            />
            <TextWrapper
              textAlign={'left'}
              fontSize={'1.15rem'}
              value={'Date'}
            />
          </PostWrapper>
          {pastGame.map((ele, idx) => {
            return (
              <PostWrapper
                key={idx}
                backgroundColor={'none'}
                grid_Template_Columnn={'repeat(5, 1fr)'}
              >
                <TextWrapper
                  textAlign={'left'}
                  fontSize={'1.05rem'}
                  value={String(idx)}
                  isColor={true}
                />
                <TextWrapper
                  textAlign={'left'}
                  fontSize={'1.05rem'}
                  value={ele.level}
                />
                <TextWrapper
                  textAlign={'center'}
                  fontSize={'1.05rem'}
                  value={String(ele.record)}
                />
                <TextWrapper
                  textAlign={'center'}
                  fontSize={'1.05rem'}
                  value={String(ele.success)}
                />
                <TextWrapper
                  textAlign={'left'}
                  fontSize={'1.05rem'}
                  value={ele.date}
                />
              </PostWrapper>
            )
          })}
        </ItemContainer>
      </StatisticsWrapper>
    </>
  )
}