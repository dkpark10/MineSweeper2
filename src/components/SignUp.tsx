import React, { useState, useEffect, useRef } from 'react';
import { Link, RouteProps } from 'react-router-dom';
import ResetButton from './ResetButton';
import axiosApi from '../Module/API';
import { throttle, debounce } from 'lodash';
import '../css/Signup.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};


interface InputElement {
  value: string;
  invalid: boolean;
  msg: string;
}


interface InputList {
  id: InputElement;
  email: InputElement;
  pwd: InputElement;
  chkpwd: InputElement;
};


interface InvalidStatus {
  msg: string;
  status: boolean;
};


class InputInvalidChecker {

  private readonly invalidText: any = {
    id: ['5~15 characters consisting of English letters(a-zA-Z), numbers, or special characters (_)',
      'id already exists'],
    email: [
      'the email is invalid',
      'email already exists'
    ],
    pwd : 'The password must be at least 6 to 15 digits.'
  }

  public async inputInvalidCheck(name: string, value: string): Promise<InvalidStatus> {

    let invalid: InvalidStatus;

    if (name === 'id' || name === 'email') {
      invalid = await this.duplicateCheck({ name, value });
    } else if (name === 'pwd') {
      invalid = await this.invalidPasswordCheck(name, value);
    } else {

    }

    return invalid;
  }

  public duplicateCheck({ name, value }): Promise<InvalidStatus> {

    // 정규표현식을 멤버변수로 두면 결과값이 매번 달라짐 왜???????????????????? 진짜 이상하네
    // 정규식은 스택안에서만 사용해야 하나??? 뭐 어디 이상한데 두면 오류나네........
    const regExpList: { [key: string]: RegExp } = {
      id: /^[A-za-z0-9]{5,15}$/g,  // 영문 대문자 또는 소문자 또는 숫자로 시작 길이는 5 ~ 15
      email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    };

    return new Promise((resolve) => {

      if (regExpList[name].exec(value) === null) {
        return resolve({ msg: this.invalidText[name][0], status: true });
      }

      axiosApi.get(`http://localhost:8080/api/auth/user?${name}=${value}`)
        .then((response: any) => {
          if (response.exists === true) {
            return resolve({ msg: this.invalidText[name][1], status: true });
          }
          else {
            return resolve({ msg: '', status: false });
          }
        })
        .catch((err) => {
          // 웹서버와 통신 중 장애 발생 시 에러처리 아이디 중복체크로 회원가입 방지
          return { msg: '', status: true };
        });
    })
  }

  public invalidPasswordCheck(name: string, value: string): Promise<InvalidStatus> {

    const regPwd: RegExp = /^[A-Za-z0-9]{6,15}$/;

    return new Promise((resolve) => {

      if (regPwd.exec(value) === null) {
        return resolve({ msg: this.invalidText[name], status: true });
      } else {
        return resolve({ msg: '', status: false });
      }
    })
  }
}


const SignUp = (props: RouteProps) => {

  let inputChecker = useRef<InputInvalidChecker>(null);

  useEffect(() => {
    inputChecker.current = new InputInvalidChecker();

    return () => inputChecker.current = null;
  }, []);

  const [inputs, setInputs] = useState<InputList>({
    id: { value: '', invalid: false, msg: '' },
    email: { value: '', invalid: false, msg: '' },
    pwd: { value: '', invalid: false, msg: '' },
    chkpwd: { value: '', invalid: false, msg: '' }
  });

  const submintHandler = (e: React.FormEvent<HTMLFormElement>) => {

    // post 방식으로 보낼 때 이벤트를 막아야 한다.
    // 민감한 정보가 쿼리스트링으로 전달 
    e.preventDefault();
  }


  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    inputChecker.current.inputInvalidCheck(name, value)
      .then((response: InvalidStatus) => {

        setInputs({
          ...inputs,
          [name]: {
            value: value,
            invalid: response.status,
            msg: response.msg
          }
        });
      });
  }


  const onReset = (inputName: string) => {
    setInputs({
      ...inputs, [inputName]: { value: '' }
    })
  }


  const inputList: JSX.Element[] = [
    ['id', 'ID'], ['email', 'E-mail'], ['pwd', 'Password'], ['chkpwd', 'Repeat Password']]
    .map((element, idx) => {

      const [name, placeholder] = element;
      const inputType: string = name === 'pwd' || name === 'chkpwd' ? 'password' : 'text';

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
          {inputs[name].invalid && <h5 className='invalid-text'>{inputs[name].msg}</h5>}
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