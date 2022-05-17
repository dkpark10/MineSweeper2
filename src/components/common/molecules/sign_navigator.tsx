import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setLogin } from "../../../reducers/login";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import { Response } from "response-type";
import axiosInstance from "../../../utils/default_axios";

const SignNavigatorWrapper = styled.div`
  @media screen and (${({ theme }) => theme.mobile}){
    display:none;
  }

  margin: 0px 1.05rem;
  font-size:0.9rem;
  cursor:pointer;

  a{
    color: #FFF6E3;
    text-decoration:none;
  }

  a:hover{
    color: ${({ theme }) => theme.mainColor};
  }

  a:after{
    content: "|";
    margin:0px 5px;
  }

  a:last-child::after {
    content: "";
  }

  .signout{
    color: #FFF6E3;
    margin: 0px 1.65rem;
  }

  .signout:hover{
    color: ${({ theme }) => theme.mainColor};
  }
`;

interface Props {
  isLogin: boolean;
}

export default function SignNavigator({
  isLogin
}: Props) {

  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const { data }: AxiosResponse<Response> = await axiosInstance.post("/api/logout");
      if (data.result === true) {
        dispatch(setLogin({
          isLogin: false,
          id: ""
        }));
      }
    } catch (e) {
    }
  }

  return (
    <>
      <SignNavigatorWrapper>
        {isLogin === false ?
          <>
            <Link to="/signin">
              로그인
            </Link>
            <Link to="/signup">
              회원가입
            </Link>
          </>
          :
          <div
            className="signout"
            onClick={logout}
          >
            로그아웃
          </div>
        }
      </SignNavigatorWrapper>
    </>
  )
}