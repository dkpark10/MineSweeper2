import React, { useState } from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import queryString from 'query-string';
import styled from "styled-components";

import Header from "../../common/organisms/header";
import DefaultBulletinWrapper from "../atoms/bulletin_wrapper";
import PostArticle from "../molecules/post_article";
import useAxios from "../../custom_hooks/useaxios";

interface MatchParams {
  postid: string;
}

interface Props{
  color:string;
  age:number;
  desc:string;
}

export default function Post({
  match,
  history,
  location }: RouteComponentProps<MatchParams>) {
  const postid= match.params.postid;
  console.log(postid);
  // const [response, loading] = useAxios("");
  return (
    <>
      <Header />
      <DefaultBulletinWrapper>
        <PostArticle/>
      </DefaultBulletinWrapper>
    </>
  )
}
