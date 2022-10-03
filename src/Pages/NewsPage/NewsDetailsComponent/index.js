import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import NewsDetailsViews from '../../../Views/NewsDetailsViews';
import Title from '../../../Views/Title';
import Button from '../../../Views/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import dayjs from '../../../helpers/dayjs';

// const apiContent = api.contentApi;

const NewsDetailsComponent = ({title, breadcrumbs, created_at, content, ...props}) => {
  // ?! необходимо перенести получение данных storeon
  const navigate = useNavigate();
  const [imageOrVideoSet, setImageOrVideoSet] = useState([]);
  const buttonBackHandle = () => {
    navigate(-1);
  };
  
  // useEffect(() => {
  //   apiContent.getNewsDetails(props.id).then((res) => {
  //     console.log({res})
  //     setImageOrVideoSet(res.media);
  //   });
  // }, [props.id]);

  return (
    <React.Fragment>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <NewsDetailsViews.Wrapper>
        <NewsDetailsViews.Date date={dayjs(api.language, created_at).format('DD MMMM YYYY')} />
        <Title variant={'news-details-page__title'} type={'h1'}>
          {title}
        </Title>
        <NewsDetailsViews.Line />
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        {imageOrVideoSet.length ? <Slider imageOrVideoSet={imageOrVideoSet} /> : null}
      </NewsDetailsViews.Wrapper>
      <NewsDetailsViews.WrapperBackBtn>
        <Button onClick={buttonBackHandle} variant={'catalog-link-uppercase'}>
          {'<'} назад к разделу
        </Button>
      </NewsDetailsViews.WrapperBackBtn>
    </React.Fragment>
  );
};

export default React.memo(NewsDetailsComponent);
