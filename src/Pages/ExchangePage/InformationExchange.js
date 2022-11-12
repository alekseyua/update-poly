import React, { useState, useEffect } from 'react';

import ExchangeLayoutContainer from './ExchangeLayout/ExchangeLayout';

const InformationExchange = (props) => {
  // const {
  //   cabinet_menu,
  //   create_shop,
  //   cabinet_site_menu,
  //   profile,
  //   breadcrumbs = [],
  //   page_info,
  // } = props;

  // const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  // const { is_has_shop, shop_link } = shop;
  // const { username = '' } = user;
  //todo: можно пропсом кастрировать футер
    console.log('props Exchange = ', props)
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
