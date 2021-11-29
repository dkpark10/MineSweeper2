import '../styles/Pagenation.css';
import { Link, match } from 'react-router-dom';
import { MatchParams } from './Ranking';
import { RootState } from '../Reducers';
import { useSelector } from 'react-redux';

interface PageProps {
  totalItemCount: number;
  itemCountperPage: number;
  currentPage: number;
  pageRangeDisplayed: number;
  match: match<MatchParams>;
}

const calculPage = ({
  totalItemCount,
  itemCountperPage,
  currentPage,
  pageRangeDisplayed
}: Partial<PageProps>) => {

  let beginPage = currentPage - Math.floor(pageRangeDisplayed / 2);

  if (currentPage - Math.floor(pageRangeDisplayed / 2) <= 0) {
    beginPage = 1;
  }

  const tmpEndPage = Math.floor(totalItemCount / itemCountperPage);
  const endPage = totalItemCount % itemCountperPage === 0 ? tmpEndPage : tmpEndPage + 1;

  if (currentPage + Math.floor(pageRangeDisplayed / 2) > endPage) {
    beginPage = endPage - pageRangeDisplayed;
    if (beginPage <= 0) {
      beginPage = 1;
    }
  }

  return { beginPage, endPage };
}

const PageNation = ({
  totalItemCount,
  itemCountperPage = 20,
  currentPage,
  pageRangeDisplayed = 9,
  match
}: PageProps) => {

  const { theme, font } = useSelector((state: RootState) => ({
    theme: state.style.mainThemeColor,
    font: state.style.mainFontColor
  }));

  const pageList: JSX.Element[] = Array.from({ length: pageRangeDisplayed }, (v, i) => i)
    .map((ele, idx) => {

      const { beginPage, endPage } = calculPage({ totalItemCount, itemCountperPage, currentPage, pageRangeDisplayed });
      const page = beginPage + ele;
      const fontColor = page === currentPage ? theme : font;

      if(page > endPage){
        return(
          <span key={idx} style={{ display: 'none' }} />
        )
      }

      return (
        <Link to={`${match.url}?page=${page}`} key={idx}>
          <span style={{ color: `${fontColor}` }}>
            {page}
          </span>
        </Link>
      )
    });

  return (
    <>
      <div className='page-container'>
        {pageList}
      </div>
    </>
  )
}

export default PageNation;