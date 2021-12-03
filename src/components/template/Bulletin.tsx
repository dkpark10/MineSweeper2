import Header from '../Header';
import Pagenation from '../organisms/Pagenation';
import PostWrapper from '../organisms/PostContainer';
import TextWrapper from '../molecules/TextWrapper';
import SearchInput from '../molecules/SearchInput';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';

interface MatchParams {
  page: string;
}

const BulletinWrapper = styled.div`
  position: relative;
  width: 64%;
  max-width: 624px;
  left:50%;
  transform: translateX(-50%);
`;

const Bulletin = ({ match, location }: RouteComponentProps<MatchParams>) => {

  const { page } = queryString.parse(location.search);
  const fontSize = '1.0' as const;

  return (
    <>
      <Header
        selected='Community'
      />
      <BulletinWrapper>
        <SearchInput
          width={'19.2'}
          height={'1.6'}
          backgroundColor={'white'}
        />
        <hr style={{ width: '624px' }} />
        <PostWrapper
          backgroundColor={'none'}
        >
          <TextWrapper
            width={'76%'}
            fontSize={fontSize}
            value={'Title'}
            isColor={false}
          />
          <TextWrapper
            width={'8%'}
            fontSize={fontSize}
            value={'Author'}
            isColor={false}
          />
          <TextWrapper
            width={'8%'}
            fontSize={fontSize}
            value={'Time'}
            isColor={false}
          />
          <TextWrapper
            width={'8%'}
            fontSize={fontSize}
            value={'Like'}
            isColor={false}
          />
        </PostWrapper>
      </BulletinWrapper>
      <Pagenation
        totalItemCount={1}
        currentPage={Number(page)}
        match={match}
      />
    </>
  )
}

export default Bulletin;