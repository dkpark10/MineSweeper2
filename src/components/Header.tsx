import '../css/Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RootState } from '../Reducers';
import { useSelector } from 'react-redux';

interface HeaderProps{
  selected?: string;
};

interface MenuProps {
  isLogin: boolean;
  selected: string;
}

const styles = {
  color: 'white',
  textDecoration: 'underline'
};

const HeaderTitle = () => {
  return (
    <div className='title-container'>
      <Link to="/">
        <h2> Mine Sweeper</h2>
      </Link>
    </div>
  )
}

const HeaderMenu = ({ isLogin, selected }: MenuProps) => {

  return (
    <div className='menu-container'>
      <div className='menu-left' />
      <MenuCenter selected={selected} />
      {isLogin ? <LogoutMenu /> : <LoginMenu />}
    </div>
  )
}

const MenuCenter = ({ selected }) => {

  const menu =
    [
      { title: 'Ranking', url: '/ranking' },
      { title: 'Community', url: '/community' },
      { title: 'My Page', url: '/mypage' },
      { title: 'Statistics', url: '/statistics' },
      { title: 'How to Game', url: '/gamemethod' },
      { title: 'Option', url: '/option' }
    ];

  return (

    <div className='menu-center'>
      {menu.map((item, idx: number) => {
        return (
          <Link key={idx} to={item.url}>
            {selected as string === item.title ?
              <h4 style={styles}>{item.title}</h4> :
              <h4>{item.title}</h4>}
          </Link>
        )
      })}
    </div>
  )
}

const LoginMenu = () => {

  return (
    <>
      <div className='menu-right'>
        <Link to="/signin">
          <div className='sign-button'>
            <div>
              Sign In
            </div>
          </div>
        </Link>
        <Link to="/signup">
          <div className='sign-button'>
            <div>
              Sign Up
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}


const LogoutMenu = () => {

  return (
    <>
      <div className='menu-right'>
        <div className='sign-button' onClick={()=>console.log('logiut')}>
          <div>
            Sign Out
          </div>
        </div>
      </div>
    </>
  )
}

const Header = ({selected}: HeaderProps) => {

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  return (
    <>
      <header>
        <HeaderTitle />
        <HeaderMenu
          isLogin={isLogin}
          selected={selected}
        />
      </header>
    </>
  );
}

export default Header;