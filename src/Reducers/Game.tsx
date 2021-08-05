// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 같이 실제 문자열 값으로 추론 되도록 
export const FIRSTCLICK = 'game/FIRST_CLICK' as const;
export const SETFLAGNUMBER = 'game/SETFLAG_NUMBER' as const;

// action creator
export const setFirstClick = () => ({
  type: FIRSTCLICK
});

export const setFlagNumber = (flagNum: number) => ({
  type:SETFLAGNUMBER,
  payload:flagNum
})

export interface GameState {
  isFirstClick: boolean,
  numberofFlag: number
};

interface GameAction {
  type: string,
  payload: number
}

const initialState: GameState = {
  isFirstClick: false,
  numberofFlag: null
};

// 리듀서
export default function gameReducer(state: GameState = initialState, action: GameAction): GameState {
  console.log(action);
  switch (action.type) {
    case FIRSTCLICK:
      return { 
        ...state,
        isFirstClick: true
      };
    case SETFLAGNUMBER:
      return{
        ...state,
        numberofFlag: action.payload
      }
    default:
      return state;
  }
}