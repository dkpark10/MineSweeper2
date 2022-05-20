import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/index";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Input from "../../common/atoms/input";
import Button from "../../common/atoms/button";
import Content from "../../common/atoms/content";
import { useStringInput } from "../../custom_hooks/useinput";

const BulletionNaviWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  height: 44px;
  background-color: white;
  align-items: center;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  margin-bottom:20px;
  padding: 10px;
`;

const SearchInput = styled(Input)`
  background-image : linear-gradient(to bottom, #EEEEEE,#EFEFEF);
`;

interface Props {
  url: string;
}

export default function BulletionNavi({ url }: Props) {
  const [value, setValue] = useStringInput("");
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <BulletionNaviWrapper>
      <div style={{ height: "100%", width:"64%" }}>
        <SearchInput
          type={"text"}
          name={"post_search"}
          width={"80%"}
          height={"100%"}
          value={value}
          onChange={setValue}
        />
        <Button
          width={"10%"}
          height={"100%"}
          backgroundColor={"white"}
        >
          <Content
            fontColor={false}
            fontSize={"0.9rem"}
          >
            검색
          </Content>
        </Button>
      </div>
      {!isLogin &&
        <Link to={`${url}/create`}>
          <Content
            fontColor={false}
            bold={true}
            fontSize={"0.85rem"}
          >
            글쓰기
          </Content>
        </Link>}
    </BulletionNaviWrapper>
  )
}