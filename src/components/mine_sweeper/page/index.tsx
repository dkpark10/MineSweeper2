import React from "react";
import useLocalStorage from "../../custom_hook/uselocalstorage";
import Game from "../organisms/game";
import Header from "../../common/organisms/header";
import { isMobile } from "../../../utils/common";

export default function MineSweeper() {

  const [level,] = useLocalStorage({
    key: "difficulty",
    defaultValue: "easy"
  }, (val: string) => ["easy", "normal", "hard"].filter(ele => ele === val).length > 0)

  return (
    <>
      <Header />
      <Game level={level === "hard" && isMobile() ? "mhard" : level} />
    </>
  )
}