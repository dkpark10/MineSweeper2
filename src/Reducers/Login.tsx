// action 정의 
export const ISLOGIN = 'login/ISLOGIN' as const;

export interface LoginStatus {
  isLogin: boolean
};

interface LoginAction {
  type: string,
  payload: boolean
};

const initialState: LoginStatus = {
  isLogin:false
};

export const setLogin = (isLogin: boolean):LoginAction => ({
  type: ISLOGIN,
  payload: isLogin
});

// 리듀서
export default function loginReducer(state: LoginStatus = initialState, action: LoginAction): LoginStatus {
  switch (action.type) {
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.payload
      }
    default:
      return state;
  }
}