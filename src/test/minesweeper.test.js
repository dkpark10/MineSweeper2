import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import defaultComponent from "./default";

describe("메인 게임 테스트", () => {
  const levelList = {
    Easy: { row: 9, col: 9, countOfMine: 10, width: "294" },
    Normal: { row: 16, col: 16, countOfMine: 40, width: "444" },
    Hard: { row: 16, col: 30, countOfMine: 99, width: "794" }
  };

  // 첫번째 테스트만 waitFor 함수를 사용해서 테스트 해야 정상
  // 처음 렌더링은 lazy load라서 그런가 ???
  test("쉬움 난이도 테스트", async () => {
    global.localStorage.setItem("difficulty", "Easy");
    let level = global.localStorage.getItem("difficulty");

    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName("cell");
      expect(cells.length).toBe(levelList[level].row * levelList[level].col);
    })
  })

  test("보통 길이 테스트", async () => {
    global.localStorage.setItem("difficulty", "Normal");
    let level = global.localStorage.getItem("difficulty");

    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName("cell");
      expect(cells.length).toBe(levelList[level].row * levelList[level].col);
    })
  })

  test("어려움 길이 테스트", async () => {
    global.localStorage.setItem("difficulty", "Hard");
    let level = global.localStorage.getItem("difficulty");

    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName("cell");
      expect(cells.length).toBe(levelList[level].row * levelList[level].col);
    })
  })

  test("좌클릭 테스트", async () => {
    global.localStorage.setItem("difficulty", "Easy");
    const { container } = render(defaultComponent());

    const cells = container.getElementsByClassName("cell");
    fireEvent.mouseDown(cells.item(5));

    // 첫클릭은 폭탄이 아니다
    expect(cells.item(5).textContent).not.toBe("💣");
  })

  test("우클릭 테스트", async () => {
    global.localStorage.setItem("difficulty", "Easy");
    const level = global.localStorage.getItem("difficulty");
    const { container, getByText } = render(defaultComponent());

    const cells = container.getElementsByClassName("cell");

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
        return "999";
      }
    };

    expect(getCount(4)).toBe("004");
    expect(getCount(53)).toBe("053");
    expect(getCount(834)).toBe("834");
    expect(getCount(43243)).toBe("999");
  })
})