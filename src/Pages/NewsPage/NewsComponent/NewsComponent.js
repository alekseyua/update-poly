import React, { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import NewsCard from '../../../Views/NewsCard';
import Pagination from '../../../Views/Pagination';
import NewViews from '../../../Views/NewsViews';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import Title from '../../../Views/Title';
import Text from '../../../helpers/Text';
import SpinnerWrapper from '../../../Views/SpinnerWrapper';
import Spinner from '../../../Views/SpinnerWrapper/Spinner';

// const apiContent = api.contentApi;
const NewsComponent = ({ titlePage = 'новости', ...props }) => {
  // console.log('props news component', props)
  const { newsStore, dispatch } = useStoreon('newsStore');
  const { news = [], rubrics = [], breadcrumbs = [] } = props;
  const [ activeRubrics, setActiveRubrics ] = useState(null)

  useEffect(()=>{
    //?! необходимо из массива достать рубрики сконкатинировать их в массив
    //?! coбрать массив с наименованием
    // setTimeout(()=>{
    // },500)
  },[])
  console.log('news === ', news)


  const tempBreadCrumbs = [
    {
      link: '/',
      title: 'Главная',
    },
    {
      link: 'news',
      title: 'Новости',
    },
  ];

  const handleFilter = (id) => {
    console.log('handleFilter id', id);
    dispatch('getNews',{id: id})
    setActiveRubrics(id)
  };

  return (
    <NewViews.Wrapper>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Title variant={'page__news'} type={'h1'}>
        {
          Text({text: 'news'})
        }
      </Title>
      <>
        <NewViews.Tags
          rubrics={rubrics}
          handleFilter={handleFilter}
          activeRubrics={activeRubrics}
        />
        <NewViews.NewsContainer
        >
          {
            !news.length?
                  <Spinner />
            : 
              news.map((el, i) => {
              return (
                <NewsCard
                  key={el.id}
                  id={el.id}
                  img={el.image}
                  title={el.title}
                  date={el.created_at}
                  description={el.description}
                  url={`/${el.url}`}
                />
              );
            })
          }
        </NewViews.NewsContainer>
        <NewViews.PaginationContainer>
          <Pagination allCount={news.length} count={20} location={'center'} />
        </NewViews.PaginationContainer>
      </>
    </NewViews.Wrapper>
  );
};

export default React.memo(NewsComponent);
