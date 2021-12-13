import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IMyLink {
  url: string;
  children?: any;
}

// 이 컴포넌트는
// 링크안에 컴포넌트 집어넣고 싶을 때
// 주로 텍스트에서 링크를 클릭할테니
// 텍스트용 !!
const InnerLinkStyle = styled.span`
  display:flex;
  align-items: center;
  font-family: 'Tajawal', sans-serif;
  a{
    text-decoration:none;
  }
`;

const InnerLink = ({ url, children }: IMyLink) => {
  return (
    <>
      <InnerLinkStyle>
        <Link to={url}>
          {children}
        </Link>
      </InnerLinkStyle>
    </>
  )
}

export default InnerLink;