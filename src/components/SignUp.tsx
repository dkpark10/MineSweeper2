import React, { useState } from 'react';
import { Link, RouteProps } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};

interface SignupInfo {
  id: string;
  email: string;
  pwd: string;
  chkpwd: string;
};

const SignUp = (props: RouteProps) => {

  const [inputs, setInputs] = useState<SignupInfo>({
    id: '',
    email: '',
    pwd: '',
    chkpwd: ''
  });

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
      <div className='signup-container'>
        <div className='signup-wrapper'>
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
                type="text"
                name="email"
                placeholder="Password"
                onChange={onChange}
                value={inputs.pwd}
              />
              {inputs.pwd.length > 0 && <button
                name='pwd'
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
            <p className='input-container'>
              <input
                type="password"
                name="chkpwd"
                placeholder="Check Password"
                onChange={onChange}
                value={inputs.pwd}
              />
              {inputs.pwd.length > 0 && <button
                name='pwd'
                className='btn-reset'
                onClick={onReset} />}
            </p>
            <p><input type='submit' value='Register'></input></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;