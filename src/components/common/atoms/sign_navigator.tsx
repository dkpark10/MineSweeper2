import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignNavigatorWrapper = styled.div`
  margin: 0px 0.75rem;
  font-size:0.9rem;

  a{
    color: #FFF6E3;
    text-decoration:none;
  }

  a:hover{
    color: ${({ theme }) => theme.mainColor};
  }

  a:after{
    content: "|";
    margin:0px 5px;
  }

  a:last-child::after {
    content: "";
  }
`;

export default function SignNavigator() {
  return (
    <>
      <SignNavigatorWrapper>
        <Link to="/signin">
          sign in
        </Link>
        <Link to="/signup">
          sign up
        </Link>
      </SignNavigatorWrapper>
    </>
  )
}