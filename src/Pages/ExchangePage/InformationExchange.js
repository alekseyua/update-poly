import React, { useState, useEffect } from 'react';

import ExchangeLayoutContainer from './ExchangeLayout/ExchangeLayout';

const InformationExchange = (props) => {

  const { breadcrumbs, page_info } = props.context;
  const { title, content } = page_info;

  return (
    <ExchangeLayoutContainer
      breadcrumbs={breadcrumbs}
      title={title}
      content={content}
    />
  );
};

export default React.memo(InformationExchange);
