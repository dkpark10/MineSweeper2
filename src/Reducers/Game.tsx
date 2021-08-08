// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 같이 실제 문자열 값으로 추론 되도록 
export const FIRSTCLICK = 'game/FIRST_CLICK' as const;
export const SETFLAGNUMBER = 'game/SETFLAG_NUMBER' as const;
export const SETGAMEOVER = 'game/GAME_OVER' as const;

// action creator
export const setFirstClick = () => ({
  type: FIRSTCLICK
});

export const setFlagNumber = (flagNum: number) => ({
  type: SETFLAGNUMBER,
  payload: flagNum
});

export const setExtraCell = (diff: number) => ({
  type: SETGAMEOVER,
  payload: diff
})

// -------------------------------------------------------------------------------------------------------------

export interface GameState {
  isFirstClick: boolean,
  numberofFlag: number,
  isGameOver: number
};

interface GameAction {
  type: string,
  payload: number
}

const initialState: GameState = {
  isFirstClick: true,
  numberofFlag: -1,
  isGameOver: -1
};

// 리듀서
export default function gameReducer(state: GameState = initialState, action: GameAction): GameState {
  console.log(state,action);
  switch (action.type) {
    case FIRSTCLICK:
      return {
        ...state,
        isFirstClick: false
      };
    case SETFLAGNUMBER:
      return {
        ...state,
        numberofFlag: action.payload
      }
    case SETGAMEOVER:
      return {
        ...state,
        isGameOver: action.payload <= 0 ? 0 : action.payload
      }
    default:
      return state;
  }
}