import React from 'react';
import styled from 'styled-components';

const HamStyle = styled.span`
  @media screen and (${({ theme }) => theme.mobile}){
    width: 20px;
    height: 20px;
    display:flex;
    align-content: space-around;
    flex-wrap: wrap;
    margin: 0px 5px;

    div{
      display: block;
      width: 100%;
      height: 2px;
      position: relative;
      background: #fff6e3;
      border-radius: 50%;
    }
  }
`;

export default function Hamburger() {
  return (
    <HamStyle>
      <div></div>
      <div></div>
      <div></div>
    </HamStyle>
  )
}