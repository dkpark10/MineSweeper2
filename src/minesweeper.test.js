import React from 'react';
import { render, fireEvent, waitFor, wait, getByText } from "@testing-library/react";
import App from './app';
import Game from './components/mine_sweeper/page/game';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

const DefaultComponents = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App>
              {children}
            </App>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </>
  )
}

describe("메인 게임 테스트", () => {

  const levelList = {
    Easy: { row: 9, col: 9, countOfMine: 10, width: '294' },
    Normal: { row: 16, col: 16, countOfMine: 40, width: '444' },
    Hard: { row: 16, col: 30, countOfMine: 99, width: '794' }
  };

  test("셀 길이 테스트", async () => {

    global.localStorage.setItem('difficulty', 'Easy');
    const level = global.localStorage.getItem('difficulty');
    const { container } = render(DefaultComponents(<Game level={level} />));

    const cells = container.getElementsByClassName('cell');
    expect(cells.length).toBe(levelList[level].row * levelList[level].col);
  })

  test("좌클릭 테스트", async () => {

    global.localStorage.setItem('difficulty', 'Easy');
    const level = global.localStorage.getItem('difficulty');
    const { container } = render(DefaultComponents(<Game level={level} />));

    const cells = container.getElementsByClassName('cell');
    fireEvent.mouseDown(cells.item(5));
    // 첫클릭은 폭탄이 아니다
    expect(cells.item(5).textContent).not.toBe("💣");
    // 랜덤한 요소가 있는건 테스트 하기 힘들다...
  })

  test("우클릭 테스트", async () => {

    global.localStorage.setItem('difficulty', 'Easy');
    const level = global.localStorage.getItem('difficulty');
    const { container, getByText } = render(DefaultComponents(<Game level={level} />));

    const cells = container.getElementsByClassName('cell');
    const currentCountOfFlag = getByText(/🚩/);
    const countOfFlag = levelList[level].countOfMine;

    fireEvent.mouseDown(cells.item(20), { button: 2 });
    fireEvent.mouseDown(cells.item(21), { button: 2 });

    expect(currentCountOfFlag.textContent).toBe(` 🚩${countOfFlag - 2} `);

    fireEvent.mouseDown(cells.item(20), { button: 2 });
    fireEvent.mouseDown(cells.item(21), { button: 2 });

    expect(currentCountOfFlag.textContent).toBe(` 🚩${countOfFlag} `);
  })

  test("타이머 테스트", async () => {

    const getCount = count => {
      if (count < 10) {
        return `00${count}`;
      } else if (count >= 10 && count < 100) {
        return `0${count}`;
      } else if (count >= 100 && count <= 999) {
        return `${count}`;
      }else{
        return '999';
      }
    };

    expect(getCount(4)).toBe('004');
    expect(getCount(53)).toBe('053');
    expect(getCount(834)).toBe('834');
    expect(getCount(43243)).toBe('999');
  })
})