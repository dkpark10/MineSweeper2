import React from "react";
import styled from 'styled-components';
import PageNationItem from "../atoms/page_nation_item";
import {
  calculBeginPage,
  calculPrevButtonBeginPage,
  calculNextButtonBeginPage,
  isMobile
} from "../../../utils/common";

const PageNationWrapper = styled.nav`
  display:flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height:46px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  margin-bottom: 14px;
`;

interface Props {
  url: string;
  totalItemCount: number;
  currentPage: number;
  itemCountperPage?: number;
  pageRangeDisplayed?: number;
}

export default function PageNation({
  url,
  totalItemCount,
  currentPage,
  itemCountperPage = 20,
  pageRangeDisplayed = isMobile() ? 7 : 9
}: Props) {

  const [beginPage, lastPage, countPageShow] = calculBeginPage({
    totalItemCount,
    itemCountperPage,
    currentPage,
    pageRangeDisplayed
  });

  return (
    <PageNationWrapper>
      <PageNationItem
        value={"◀"}
        url={`${url}?page=${calculPrevButtonBeginPage({ countPageShow, currentPage })}`}
      />
      {Array.from({ length: countPageShow }, (_, i) => i + beginPage)
        .map((page, idx) =>
          <PageNationItem
            key={idx}
            value={String(page)}
            url={`${url}?page=${page}`}
            currentPage={currentPage === page}
          />
        )}
      <PageNationItem
        value={"▶"}
        url={`${url}?page=${calculNextButtonBeginPage({ countPageShow, currentPage, lastPage })}`}
      />
    </PageNationWrapper>
  )
}