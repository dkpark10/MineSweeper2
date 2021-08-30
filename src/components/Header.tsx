import '../css/Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface HyperLink {
  title: string;
  url: string;
}

const styles = {
  color:'white',
  textDecoration:'underline'
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

const HeaderMenu = () => {

  return (
    <div className='menu-container'>
      <div className='menu-left' />
      <MenuCenter />
      <MenuSignButton />
    </div>
  )
}

const MenuCenter = () => {

  const [sel, setSel] = useState<number>(-1);
  const menu: HyperLink[] =
    [
      { title: 'Ranking', url: '/ranking' },
      { title: 'Community', url: '/community' },
      { title: 'My Page', url: '/mypage' },
      { title: 'Statistics', url: '/statistics' },
      { title: 'How to Game', url: '/gamemethod' },
      { title: 'Option', url: '/option' }
    ];

  const selectMenuColor = (idx: number) => { setSel(idx); }

  return (
    <div className='menu-center'>
      {menu.map((item: HyperLink, idx: number) => {
        return (
          <Link key={idx} to='/' onClick={() => selectMenuColor(idx)}>
            {sel === idx ?
              <h4 style={styles}>{item.title}</h4> :
              <h4>{item.title}</h4>}
          </Link>
        )
      })};
    </div>
  )
}

const MenuSignButton = () => {

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

const Header = () => {

  return (
    <>
      <header>
        <HeaderTitle />
        <HeaderMenu />
      </header>
    </>
  );
}

export default Header;