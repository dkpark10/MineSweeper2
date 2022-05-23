import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export default function UseIsLogined(history: RouteComponentProps["history"]) {
  const { userid, isLogin } = useSelector((root: RootState) => ({
    userid: root.login.id,
    isLogin: root.login.isLogin
  }));

  useEffect(() => {
    if (isLogin === false) {
      history.replace("/signin");
    }
  }, [isLogin]);

  return [userid, isLogin];
}