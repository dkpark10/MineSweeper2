import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import ResetButton from './ResetButton';
import axiosApi from '../Module/API';
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

  const [inputs, setInputs] = useState<LoginInfo>({
    id: { value: '', invalid: false },
    pwd: { value: '', invalid: false }
  });

  const submintHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();

    const ret = Object.entries(inputs).filter(([key, value]) => value.invalid === true);
    if (ret.length > 0) {
      return;
    }

    axiosApi.post(`http://localhost:8080/api/auth/login`,
      [
        inputs.id.value,
        inputs.pwd.value
      ])
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
            <p><input type='submit' value='Login'></input></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn;