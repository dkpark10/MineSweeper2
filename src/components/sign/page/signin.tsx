import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps } from 'react-router-dom';
import useInput from '../../custom_hook/useinput';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../../reducers/login';
import { Response } from 'response-type';
import Input from '../atoms/input';
import Title from '../atoms/title';
import CenterWrapper from '../../common/atoms/center_wrapper';

const SignWrapper = styled(CenterWrapper)`
  font-family: 'Roboto', sans-serif;
  background-color: white;
  padding:20px;
  border-radius: 12px;
  width:378px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  text-align: center;

  .failmsg{
    text-align:center;
    color:red;
    font-size:0.9rem;
  }

  & a{
    text-decoration: none;
  }
`;

const ForgetHelp = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: center;
  margin:7px 0px;

  a{
    color:#aaaaaa;
    text-decoration: none;
    font-size: 0.7rem;
  }
`;

interface InputProps {
  userid: string;
  password: string;
}

export default function SignIn({ history }: RouteComponentProps) {

  const dispatch = useDispatch();
  const [value, changeValue] = useInput<InputProps>({
    userid:'',
    password:''
  });
  const [error, setError] = useState<boolean>(false);

  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();
    // 유효하지 않거나 입력이 없을 때
    if (value.userid.length <= 0 || value.password.length <= 0) {
      return;
    }

    try {
      const { data }: AxiosResponse<Response> = await axios.post('/api/login', {
        "id": value.userid,
        "pwd": value.password
      })

      if (data.result === false) {
        throw new Error('로그인 실패');
      }

      const accessToken = data.loginInfo.accessToken;
      // Authorization 헤더에 토큰을 박는다.
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

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

  return (
    <>
      <SignWrapper>
        <Link to="/">
          <Title>Mine Sweeper</Title>
        </Link>
        <form onSubmit={submintHandler}>
          <Input
            type='text'
            placeholder='id'
            name='userid'
            value={value.userid}
            onChange={changeValue}
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
            value={value.password}
            onChange={changeValue}
          />
          <ForgetHelp>
            <Link to="/">Forgot id</Link>
            <Link to="/">Forgot password</Link>
            <Link to="/">Sign Up</Link>
          </ForgetHelp>
          {error && <span className='failmsg'>id or password is wrong</span>}
          <Input
            type='submit'
            name='login'
            value='Login'
          />
        </form>
      </SignWrapper>
    </>
  )
}