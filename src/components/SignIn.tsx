import React, { useState } from 'react';
import { Link, RouteProps } from 'react-router-dom';
import axios from 'axios';
import '../css/Signin.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};

interface LoginInfo {
  id: string;
  pwd: string;
}

const SignIn = (props: RouteProps) => {

  const [inputs, setInputs] = useState<LoginInfo>({
    id: '',
    pwd: ''
  });
  const [hi, setHi] = useState<string>('axios');

  const submintHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onReset = (e: any) => {
    const name = e.target.name;
    setInputs({
      ...inputs,
      [name]: ''
    })
  }

  return (
    <>
      <div className='login-container'>
        <div className='login-wrapper'>
          <Link to="/">
            <h1 style={titleStyle}>Mine Sweeper</h1>
          </Link>
          <form onSubmit={submintHandler}>
            <p className='input-container'>
              <input
                type="text"
                name="id"
                placeholder="ID"
                onChange={onChange}
                value={inputs.id}
              />
              {inputs.id.length > 0 && <button
                name='id'
                className='btn-reset'
                onClick={onReset} />}
            </p>
            <p className='input-container'>
              <input
                type="password"
                name="pwd"
                placeholder="Password"
                onChange={onChange}
                value={inputs.pwd}
              />
              {inputs.pwd.length > 0 && <button
                name='pwd'
                className='btn-reset'
                onClick={onReset} />}
            </p>
            <div className='login-forgot'>
              <Link to="/">Forgot ID</Link>
              <Link to="/">Forgot Password</Link>
              <Link to="/">Sign Up</Link>
            </div>
            <p><input type='submit' value='Login'></input></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn;