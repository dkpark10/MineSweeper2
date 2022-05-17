import axiosApi, { Response } from './axiosapi';

export interface InvalidStatus {
  result: boolean;
  msg: string;
};

export default class InputInvalidChecker {

  private readonly invalidText = {
    id: ['5~15 characters consisting of English letters(a-zA-Z), numbers, or special characters (_)',
      'id already exists'],
    email: [
      'the email is invalid',
      'email already exists'
    ]
  }

  public async run(name: string, value: string, pwd: string): Promise<InvalidStatus> {
    return await this.duplicateCheck({ name, value });
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
        return resolve({ result: false, msg: this.invalidText[name][0] });
      }

      axiosApi.get(`/api/user?${name}=${value}`)
        .then((response: Response) => {
          if (response.result === true) {
            return resolve({ result: false, msg: this.invalidText[name][1] });
          }
          return resolve({ result: true, msg: '' });
        })
        .catch(err => {
          // 웹서버와 통신 중 장애 발생 시 에러처리 아이디 중복체크로 회원가입 방지
          return { msg: '', status: true };
        });
    })
  }
}