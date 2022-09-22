import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsDetailsComponent from './NewsDetailsComponent';



const NewsDetailsPage = ({...props}) => {
  console.log({NewsDetailsPage: props.context})
  const { site_configuration, breadcrumbs } = props.context;
  const { content, created_at, title, id } = props.context.page_info;

  return (
    <div>
        <NewsDetailsComponent
          title={title}
          breadcrumbs={breadcrumbs}
          created_at={created_at}
          content={content}
          id={id}
        />
    </div>
  );
};

export default NewsDetailsPage;
