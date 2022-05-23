import React, { useEffect, useState, useMemo } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Response } from "response-type";
import { debounce } from "lodash";

import Input from "../atoms/input";
import Title from "../../common/atoms/title";
import { useObjectInput } from "../../custom_hooks/useinput";
import SignWrapper from "../atoms/wrapper";

import axiosInstance from "../../../utils/default_axios";
import { invalidMessage } from "../../../utils/static_data";

interface InputProps {
  id: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function SignUp({ history }: RouteComponentProps) {

  const duplicateCheck = useMemo(() =>
    debounce(async ({ name, value }) => {

      if (name !== "id" && name !== "email") {
        return;
      }

      const regList: { [key: string]: RegExp } = {
        id: /^[A-za-z0-9]{5,15}$/g,
        email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      };

      if (value && regList[name].exec(value) === null) {
        setValidator(prev => ({
          ...prev,
          [name]: {
            result: false,
            msg: invalidMessage[name][0]
          }
        }))
        return;
      }

      const { data }: AxiosResponse<Response> = await axiosInstance.get(`/api/user?id=${value}`);
      if (value && data.result === true) {
        setValidator(prev => ({
          ...prev,
          id: {
            result: false,
            msg: invalidMessage[name][1]
          }
        }))
        return;
      }

      setValidator(prev => ({
        ...prev,
        [name]: {
          result: true,
          msg: ""
        }
      }))
    }, 350), []
  )

  const [value, changeValue] = useObjectInput<InputProps>({
    id: "",
    email: "",
    password: "",
    repeatPassword: ""
  }, duplicateCheck);

  const [validator, setValidator] = useState({
    id: { result: true, msg: "" },
    email: { result: true, msg: "" },
    password: { result: true },
    repeatPassword: { result: true }
  });

  useEffect(() => {
    const passwordReg = /^[A-Za-z0-9]{6,15}$/;
    if (value.password) {
      setValidator(prev => ({
        ...prev,
        password: {
          result: passwordReg.exec(value.password) === null ? false : true
        }
      }))
    }

    if (value.repeatPassword) {
      setValidator(prev => ({
        ...prev,
        repeatPassword: {
          result: value.password === value.repeatPassword
        }
      }))
    }
  }, [value.password, value.repeatPassword]);


  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkValidValue = Object.entries(validator).filter(([_, value]) => value.result === false).length > 0;
    if (checkValidValue) {
      alert("양식에 맞게 다시 작성해 주세요.");
      return;
    }

    const request = async () => {
      try {
        const { data }: AxiosResponse<Response> = await axiosInstance.post("/api/user", {
          id: value.id,
          email: value.email,
          pwd: value.password
        });

        if (data.result === true) {
          history.goBack();
        } else {
          throw new Error("유저 등록에 실패하였습니다.");
        }
      } catch (e) {
        alert(e.message);
      }
    }
    request();
  }

  return (
    <>
      <SignWrapper>
        <Link to="/">
          <Title
            fontColor={true}
          >
            Mine Sweeper
          </Title>
        </Link>
        <form onSubmit={submintHandler}>
          <div>
            <label htmlFor="id" />
            <Input
              type="text"
              placeholder="아이디"
              name="id"
              id="id"
              value={value.id}
              onChange={changeValue}
            />
            {validator.id.result === false &&
              value.id &&
              <div className="failmsg" id="invalid_id">
                {validator.id.msg}
              </div>
            }
          </div>
          <div>
            <label htmlFor="email" />
            <Input
              type="eamil"
              placeholder="이메일"
              name="email"
              id="email"
              value={value.email}
              onChange={changeValue}
            />
            {validator.email.result === false &&
              value.email &&
              <div className="failmsg" id="invalid_email">
                {validator.email.msg}
              </div>
            }
          </div>
          <div>
            <label htmlFor="password" />
            <Input
              type="password"
              placeholder="비밀번호"
              name="password"
              id="password"
              value={value.password}
              onChange={changeValue}
            />
            {validator.password.result === false &&
              <div className="failmsg" id="invalid_password">
                {invalidMessage.password}
              </div>
            }
          </div>
          <div>
            <label htmlFor="repeat-password" />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              name="repeatPassword"
              id="repeat-password"
              value={value.repeatPassword}
              onChange={changeValue}
            />
            {validator.repeatPassword.result === false &&
              <div className="failmsg" id="invalid_repeat_password">
                {invalidMessage.repeatPassword}
              </div>
            }
          </div>
          <Input
            type="submit"
            name="signup"
            value="회원가입"
          />
        </form>
      </SignWrapper>
    </>
  )
}