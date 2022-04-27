import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RootState } from '../../../reducers';
import { useDispatch, useSelector } from 'react-redux';

const HeaderWrapper = styled.header`
  position: relative;
  width:100%;
  height:45px;
  font-family: 'Roboto', sans-serif;
  background-color: ${({ theme }) => theme.grayMainColor};

  .title{
    color: ${({theme}) => theme.mainColor};
    position:absolute;
    left:2%;
    top:46%;
    transform: translate(-2%, -50%);
  }

  .sign{
    border:2px solid red;
    color: ${({theme}) => theme.mainColor};
    position:absolute;
    left:98%;
    top:50%;
    transform: translate(-98%, -50%);
    width:40px;
  }
`;

const NavigatorWrapper = styled.nav`
  position: absolute;
  left:50%;
  transform:translatex(-50%);
  display:inline-block;
  height:100%;
  display:flex;
  align-items:center;

  a{
    text-decoration: none;
    color: #FFF6E3;
  }
`;

const NavigatorContent = styled.ul`
  list-style: none;
  display:flex;
  font-size:0.86rem;

  li{
    margin:0px 13px;
  }
`;

export default function Header() {

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const menu =
    [
      { title: 'Game', url: '/' },
      { title: 'Ranking', url: '/ranking/easy?page=1' },
      { title: 'Community', url: '/community?page=1' },
      { title: 'MyPage', url: '/mypage' },
      { title: 'Option', url: '/option' }
    ];

  return (
    <>
      <HeaderWrapper>
        <h2 className='title'>Mine Sweeper</h2>
        <NavigatorWrapper>
          <NavigatorContent>
            {menu.map((ele, idx) =>
              <li key={idx}>
                <Link
                  to={ele.url}
                >
                  {ele.title}
                </Link>
              </li>
            )}
          </NavigatorContent>
        </NavigatorWrapper>
        <div className='sign'>sign</div>
      </HeaderWrapper>
    </>
  )
}