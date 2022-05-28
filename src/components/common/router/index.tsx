import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  isLogin: boolean;
}

export const PrivateRoute = ({
  isLogin,
  ...rest }: Props) => {
  if (isLogin) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/signin" />;
  }
};