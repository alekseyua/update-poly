import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsComponent from './NewsComponent';

const NewsPage = (props) => {
  // const location = useLocation();
  // const { pathname } = location;

  // useEffect(()=>{
  //   props.handlerDataPage(pathname);
  // },[])

  return (
      <NewsComponent {...props.context} />
  );
};

export default NewsPage;
