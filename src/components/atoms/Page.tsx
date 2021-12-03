import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IPageStyle {
  bold: boolean;
  isCurrentPage?: boolean;
};

export interface IPage extends IPageStyle {
  url: string;
  value: string;
};

const PageStyle = styled.span<IPageStyle>`
  a {
    color:${({ theme, isCurrentPage }) => {
    return isCurrentPage === true ? theme.mainColor : theme.fontColor;
  }};

    text-decoration: none;
    &:hover{
      color:${({ theme }) => theme.mainColor}

    font-weight:${({ bold }) => {
    return bold === true ? 'bold' : null;
  }};
  }
`;

const PageLink = ({ url, isCurrentPage, value, bold }: IPage) => {

  return (
    <>
      <PageStyle
        bold={bold}
        isCurrentPage={isCurrentPage}
      >
        <Link to={url}>
          {value}
        </Link>
      </PageStyle>
    </>
  )
}

export default PageLink;