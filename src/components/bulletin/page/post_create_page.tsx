import React from "react";
import styled from "styled-components";
import Editor from "../molecules/editor";
import DefaultBulletinWrapper from "../atoms/bulletin_wrapper";
import Header from "../../common/organisms/header";
import Input from "../../common/atoms/input";
import Button from "../../common/atoms/button";
import { useStringInput } from "../../custom_hooks/useinput";

const PostCreatePageWrapper = styled(DefaultBulletinWrapper)`
  position:relative;
  top:20px;
  background-color:white;
  border:2px solid red;
`;

const InputWrapper = styled.div`
  border:1px solid #ccc;
  margin: 10px 0px;
  padding: 5px;
`;

const SubmitButton = styled(Button)`
  color:white;
  border-radius:8px;
  font-weight: bold;
  margin:8px 0px;
`;

export default function PostCreatePage() {
  const [value, setValue] = useStringInput("");
  return (
    <>
      <Header />
      <PostCreatePageWrapper>
        <form>
          <InputWrapper>
            <Input
              type={"text"}
              name={"post_title"}
              width={"100%"}
              height={"40px"}
              value={value}
              onChange={setValue}
              placeholder={"제목을 입력하세요."}
            />
          </InputWrapper>
          <Editor />
          <SubmitButton 
            type="submit"
            width={"80px"}
            height={"33px"}
          >
            등록
          </SubmitButton>
        </form>
      </PostCreatePageWrapper>
    </>
  )
}