import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import ResetButton from './ResetButton';
import axiosApi, { Response } from '../Module/API';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setLogin } from '../Reducers/Login';
import '../css/Signin.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};


interface InputElement {
  value: string;
  invalid: boolean;
}


interface LoginInfo {
  id: InputElement;
  pwd: InputElement;
};


const msg = {
  id: 'ID is empty Enter your ID.',
  pwd: 'Password is empty Enter your Password'
};


const SignIn = ({ history }: RouteComponentProps) => {

  const dispatch = useDispatch();

  const [failMsg, setFailMsg] = useState<string>('');
  const [inputs, setInputs] = useState<LoginInfo>({
    id: { value: '', invalid: false },
    pwd: { value: '', invalid: false }
  });

  const submintHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();

    // 유효하지 않거나 입력이 없을 때
    const invalid = Object.entries(inputs).filter(([key, val]) => val.invalid || val.value.length <= 0);
    if (invalid.length > 0)
      return;

    axiosApi.post(`http://localhost:8080/api/auth/login`, {
      "id": inputs.id.value,
      "pwd": inputs.pwd.value
    })
      .then((response: Response) => {

        if (response.result === true) {
          const accessToken = response.token;

          // Authorization 헤더에 토큰을 박는다.
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const cookie = new Cookies();

          cookie.set('accessToken', {
            accessToken: accessToken,
            id: inputs.id.value
          }, {
            path: '/',
            httpOnly: process.env.NODE_ENV !== 'development'
          })

          dispatch(setLogin({ isLogin: true, id: inputs.id.value }));
          history.goBack();
        }
        else {
          setFailMsg(prev => response.message);
        }
      });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: {
        value: value,
        invalid: value.length <= 0
      }
    })
  }


  const onReset = (inputName: string) => {
    setInputs({
      ...inputs,
      [inputName]: {
        value: '',
        invalid: true
      }
    })
  }

  const inputList: JSX.Element[] = [
    ['id', 'ID'], ['pwd', 'Password']]
    .map((element, idx) => {

      const [name, placeholder] = element;
      const inputType: string = name === 'pwd' ? 'password' : 'text';

      return (
        <div key={idx} className='input-container'>
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={inputs[name].value}
          />
          <ResetButton
            inputLength={inputs[name].value.length > 0}
            name={name}
            onReset={() => onReset(name)}
          />
          {inputs[name].invalid &&
            <h5 className='invalid-text'>{msg[name]}</h5>}
        </div>
      )
    })


  return (
    <>
      <div className='login-container'>
        <div className='login-wrapper'>
          <Link to="/">
            <h1 style={titleStyle}>Mine Sweeper</h1>
          </Link>
          <form onSubmit={submintHandler}>
            {inputList}
            <div className='login-forgot'>
              <Link to="/">Forgot ID</Link>
              <Link to="/">Forgot Password</Link>
              <Link to="/">Sign Up</Link>
            </div>
            <h5 className='invalid-text' style={{ textAlign: 'center', marginTop: '15px' }}>{failMsg}</h5>
            <p><input type='submit' value='Login'></input></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn;