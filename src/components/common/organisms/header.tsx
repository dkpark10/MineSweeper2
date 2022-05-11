import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RootState } from '../../../reducers';
import { useSelector } from 'react-redux';
import HeaderTitle from '../molecules/header_title';
import SignNavigator from '../atoms/sign_navigator';

const HeaderWrapper = styled.header`
  position: relative;
  width:100%;
  height:51px;
  font-family: 'Roboto', sans-serif;
  background-color: ${({ theme }) => theme.grayMainColor};
  display:flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigatorWrapper = styled.nav`
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
    width: 100vw;
    border:1px solid red;

    a{
      color: ${({ theme }) => theme.fontColor};
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

    a{
      color: #FFF6E3;
    }

    ul{
      display:flex;
      font-size:0.9rem;

      li{
        margin:0px 12px;
      }
    }
  }
`;

export default function Header() {

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const menu =
    [
      { title: 'game', url: '/' },
      { title: 'ranking', url: '/ranking/easy?page=1' },
      { title: 'community', url: '/community?page=1' },
      { title: 'my page', url: '/mypage' },
      { title: 'options', url: '/option' }
    ] as const;

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle />
        <NavigatorWrapper className='menu'>
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
          </ul>
        </NavigatorWrapper>
        <SignNavigator />
      </HeaderWrapper>
    </>
  )
}