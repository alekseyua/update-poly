import React, { useState, useEffect } from 'react';

import PartnershipLayout from './PartbershipLayout/PartnershipLayout';

const PartnershipPage = ({...props}) => {
  // console.log('PartnershipPage = ', props)

  const { site_configuration, breadcrumbs } = props.context;


  const { components } = props.context.page_info;
  const baseComponent = components.filter((el) => el.id === 4)[0];
  const subComponent = components.filter((el) => el.id === 5)[0];

  return (
    <PartnershipLayout 
         title= {baseComponent?.title}
         subTitle= {baseComponent?.content}
         featureCard= {baseComponent?.children}
         subContent= {subComponent?.children}
         registration_slug= {site_configuration?.page_type_reg}
         breadcrumbs={breadcrumbs}
    />
  );
};

export default PartnershipPage;
