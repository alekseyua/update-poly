import React from 'react';
import NewsCard from '../../../../Views/NewsCard';
import MoreLink from '../../../../Views/MoreLink';
import Text from '../../../../helpers/Text';
import Title from '../../../../Views/Title';
// import Settings from '../../#lifehack/Settings/Settings';
import SpinnerWrapper from '../../../../Views/SpinnerWrapper/SpinnerWrapper';
import Spinner from '../../../../Views/SpinnerWrapper/Spinner';

import style from './mainNews.module.scss';

const MainNewsLayout = ({ news = [], news_url, front_admin }) => {


  return (
    <div className={style['main-news']}>
      {/* {front_admin?<Settings nameComponent={'MainNewsLayout'} /> : null } */}
      <div className={'main-news__container'}>
        <div className={style['main-news__wrap']}>
          <Title type={'h2'} variant={'news-title'}>
            <Text text={'news'} />
          </Title>
          <div className={style['main-news__list']}>
            {
              !news.length ?
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
                : news.map((el, i) => {
                  return (
                    <NewsCard
                      key={el.id}
                      id={el.id}
                      img={el.image}
                      title={el.title}
                      date={el.created_at}
                      description={el.description}
                      url={el.url}
                    />
                  );
                })

            }
          </div>
          <MoreLink url={news_url}>
            <Text text={'show_all'} />
          </MoreLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainNewsLayout);
