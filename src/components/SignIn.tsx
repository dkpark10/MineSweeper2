import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Signin.css';

const titleStyle = {
  color: '#1033e3',
  textAlign: 'center' as const,
  marginBottom: '50px'
};

const SignIn = () => {

  return (
    <>
      <div className='login-container'>
        <div className='login-wrapper'>
          <h1 style={titleStyle}>Mine Sweeper</h1>
          <form>
            <p><input type='text' placeholder='ID'></input></p>
            <p><input type='password' placeholder='Password'></input></p>
            <div className='login-forgot'>
              <Link to="/">Forgot ID</Link>
              <Link to="/">Forgot Password</Link>
              <Link to="/">Sign Up</Link>
            </div>
            <p><input type='submit' value='Login'></input></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn;