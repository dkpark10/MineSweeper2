import React, { useState, useEffect, useRef } from 'react';
import { Link, RouteProps } from 'react-router-dom';
import ResetButton from './ResetButton';
import axiosApi from '../Module/API';
import { throttle } from 'lodash';
import '../css/Signup.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};


const validTextStyle = {
  color: 'red',
  marginLeft: '16px',
  marginBottom: '0px',
  marginTop: '5px',
  textAlign: 'left' as const,
};


interface InputElement {
  value: string;
  invalid: boolean;
}


interface InputList {
  id: InputElement;
  email: InputElement;
  pwd: InputElement;
  chkpwd: InputElement;
};

// 영문 대문자 또는 소문자 또는 숫자로 시작 길이는 5 ~ 15
// 정규표현식을 멤버변수로 두면 결과값이 매번 달라짐 왜???????????????????? 진짜 이상하네
const regExpList: { [key: string]: RegExp } = {
  id: /^[A-za-z0-9]{5,15}$/g,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  pwd: /^[A-Za-z0-9]{6,12}$/
};

class InputInvalidChecker {

  private readonly invalidText: any = {
    id: ['5~15 characters consisting of English letters(a-zA-Z), numbers, or special characters (_)',
      'id already exists'],
    email: [
      'the email is invalid',
      'email already exists'
    ]
  }

  public inputInvalidCheck(name: string, value: string): boolean {

    let invalid: boolean = false;

    switch (name) {
      case 'id':
        invalid = this.idInvalidCheck(name, value);
        break;
      case 'email':
        break;
      case 'pwd':
        break;
      case 'chkpwd':
        break;
      default:
        break;
    }

    return invalid;
  }

  public idInvalidCheck(name: string, id: string): boolean {

    if (regExpList[name].exec(id) === null) {
      return true;
    }

    return false;
  }
}


const SignUp = (props: RouteProps) => {

  let inputChecker = useRef<InputInvalidChecker>(null);

  useEffect(() => {
    inputChecker.current = new InputInvalidChecker();

    return () => inputChecker.current = null;
  }, []);

  const inputNameList: string[][] = [
    ['id', 'ID'],
    ['email', 'E-mail'],
    ['pwd', 'Password'],
    ['chkpwd', 'Repeat Password']
  ];

  const [inputs, setInputs] = useState<InputList>({
    id: { value: '', invalid: false },
    email: { value: '', invalid: false },
    pwd: { value: '', invalid: false },
    chkpwd: { value: '', invalid: false }
  });

  const submintHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    const invalid: boolean = inputChecker.current.inputInvalidCheck(name, value);

    setInputs({
      ...inputs,
      [name]: {
        value: value,
        invalid: invalid
      }
    });
  }

  
  const onReset = (inputName: string) => {
    setInputs({
      ...inputs, [inputName]: { value: '' }
    })
  }


  const inputList: JSX.Element[] = inputNameList.map((element, idx) => {

    const [name, placeholder] = element;

    return (
      <div key={idx} className='input-container'>
        <input
          type='text'
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
        {inputs[name].invalid && <h5 style={validTextStyle}>invaild id</h5>}
      </div>
    )
  })

  return (
    <>
      <div className='signup-container'>
        <div className='signup-wrapper'>
          <Link to="/">
            <h1 style={titleStyle}>Mine Sweeper</h1>
          </Link>
          <form onSubmit={submintHandler}>
            {inputList}
            <div>
              <input type='submit' value='Sign up'></input>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp