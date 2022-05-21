import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps, Link } from "react-router-dom";
import { useObjectInput } from "../../custom_hooks/useinput";
import { AxiosResponse } from "axios";
import axiosInstance from '../../../utils/default_axios';
import { useDispatch } from "react-redux";
import { setLogin } from "../../../reducers/login";
import { Response } from "response-type";

import Input from "../atoms/input";
import Title from "../../common/atoms/title";
import Content from "../../common/atoms/content";
import Button from "../../common/atoms/button";
import SignWrapper from "../atoms/wrapper";

const ForgetHelp = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: center;
  margin:7px 0px;
`;

interface InputProps {
  userid: string;
  password: string;
}

export default function SignIn({ history }: RouteComponentProps) {

  const dispatch = useDispatch();
  const [value, changeValue, setChangeValue] = useObjectInput<InputProps>({
    userid: "",
    password: ""
  });
  const [error, setError] = useState<boolean>(false);

  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.userid.length <= 0 || value.password.length <= 0) {
      return;
    }

    try {
      const { data }: AxiosResponse<Response> = await axiosInstance.post("/api/login", {
        "id": value.userid,
        "pwd": value.password
      })

      if (data.result === false) {
        throw new Error("로그인 실패");
      }

      const accessToken = data.loginInfo.accessToken;
      // Authorization 헤더에 토큰을 박는다.
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      dispatch(setLogin({
        isLogin: true,
        id: value.userid
      }));

      history.goBack();
    }
    catch (e) {
      setError(true);
    }
  }

  const setGeustId = () => {
    setChangeValue((prev) => ({
      ...prev,
      userid:"guestid",
      password:"123456"
    }))
  }

  return (
    <>
      <SignWrapper>
        <Link to="/">
          <Title>Mine Sweeper</Title>
        </Link>
        <form onSubmit={submintHandler}>
          <Input
            type="text"
            placeholder="아이디"
            name="userid"
            value={value.userid}
            onChange={changeValue}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={value.password}
            onChange={changeValue}
          />
          <ForgetHelp>
            <Button 
              width={"100%"}
              height={"100%"}
              backgroundColor={"white"}
              type="submit"
              onClick={setGeustId}
            >
              <Content
                fontSize={"0.8rem"}
              >
                게스트 로그인
              </Content>
            </Button>
          </ForgetHelp>
          {error && <span className="failmsg">아이디 또는 비밀번호가 틀립니다.</span>}
          <Input
            type="submit"
            name="login"
            value="로그인"
          />
        </form>
      </SignWrapper>
    </>
  )
}