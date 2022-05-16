import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { RootState } from "../../../reducers";
import { useSelector } from "react-redux";
import HeaderTitle from "../molecules/header_title";
import SignNavigator from "../atoms/sign_navigator";

const HeaderWrapper = styled.header`
  position: relative;
  width:100%;
  height:51px;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${({ theme }) => theme.grayMainColor};
  display:flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuMoveAnimation = (x: number) => keyframes`
  100% {
    left: ${x}vw;
  }
`;

const NavigatorWrapper = styled.nav<{ show: boolean }>`
  a{
    text-decoration: none;
  }

  a:hover{
    color: ${({ theme }) => theme.mainColor};
  }

  ul{
    list-style: none;
  }

  // 모바일
  @media screen and (${({ theme }) => theme.mobile}){
    position: absolute;
    top:51px;
    left:-100vw;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    animation: ${({ show }) =>
    show === true ?
      css`${MenuMoveAnimation(0)} 0.1s linear forwards` : ''};

    .menu_content{
      position:relative;
      display:flex;
      width:65vw;
      height:93vh;
      justify-content: center;
      z-index:1;
      background-color: white;
      align-content: space-around;
      flex-wrap: wrap;
      font-size:1.25rem;
      color: ${({ theme }) => theme.fontColor};
    }

    a{
      color: ${({ theme }) => theme.fontColor};
    }

    li{
      margin:30px 0px;
    }
  }

  // 데탑
  @media screen and (${({ theme }) => theme.minTablet}) {
    position: absolute;
    left:50%;
    transform:translatex(-50%);
    display:inline-block;
    height:100%;
    display:flex;
    align-items:center;

    .sign_navi{
      display:none;
    }

    a{
      color: #FFF6E3;
    }

    ul{
      display:flex;
      font-size:1.0rem;

      li{
        margin:0px 12px;
      }
    }
  }
`;

export default function Header() {

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const menu =
    [
      { title: "게임", url: "/" },
      { title: "랭킹", url: "/ranking/easy?page=1" },
      { title: "게시판", url: "/community?page=1" },
      { title: "나의 페이지", url: "/mypage" },
      { title: "옵션", url: "/option" }
    ] as const;

  const openMenu = () => {
    setShowMenu((prev) => !prev);
  }

  const closeMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShowMenu(false);
    }
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle
          onClick={openMenu}
        />
        <NavigatorWrapper
          className="menu"
          onClick={closeMenu}
          show={showMenu}
        >
          <div className="menu_content">
            <ul>
              {menu.map((ele, idx) =>
                <li key={idx}>
                  <Link
                    to={ele.url}
                  >
                    {ele.title}
                  </Link>
                </li>
              )}
              {showMenu &&
                <>
                  <li>
                    <Link to="signin">
                      로그인
                    </Link>
                  </li>
                  <li>
                    <Link to="signup">
                      회원가입
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </NavigatorWrapper>
        <SignNavigator
          isLogin={isLogin}
        />
      </HeaderWrapper>
    </>
  )
}