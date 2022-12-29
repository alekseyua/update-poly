import React from 'react';
import NewsDetailsComponent from './NewsDetailsComponent';



const NewsDetailsPage = ({
  context,
  ...props
}) => {

  const { breadcrumbs } = context;
  const { content, created_at, title, id } = context.page_info;

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
