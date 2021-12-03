import React from 'react'
import styled from 'styled-components';

interface IPostWrapper {
  children: any;
  backgroundColor: string;
}

const PostStyle = styled.div<IPostWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({backgroundColor}) => backgroundColor};
  margin : 9px 0;
  height: 2.4rem;
  width: 100%;
  border-radius: 7px;
`;

const PostWrapper = ({ children, backgroundColor }: IPostWrapper) => {

  return (
    <>
      <PostStyle
        backgroundColor={backgroundColor}>
        {children}
      </PostStyle>
    </>
  )
}

export default PostWrapper;