import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsComponent from './NewsComponent';

const NewsPage = (props) => {

  return (
      <NewsComponent {...props.context} />
  );
};

export default NewsPage;
