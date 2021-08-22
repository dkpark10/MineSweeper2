import '../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header>
        <div className='title-container'>
          <Link to="/">
            <h2> Mine Sweeper</h2>
          </Link>
        </div>
        <div className='menu-container'>
          <div className='menu-left' />
          <div className='menu-center'>
            <Link to="/">
              <p>
                <h4>Ranking</h4>
              </p>
            </Link>
            <Link to="/">
              <p>
                <h4>Community</h4>
              </p>
            </Link>
            <Link to="/">
              <p>
                <h4>My Page</h4>
              </p>
            </Link>
            <Link to="/">
              <p>
                <h4>
                  statistics
                </h4>
              </p>
            </Link>
            <Link to="/">
              <p>
                <h4>How to Game</h4>
              </p>
            </Link>
          </div>
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
        </div>
      </header>
    </>
  );
}

export default Header;