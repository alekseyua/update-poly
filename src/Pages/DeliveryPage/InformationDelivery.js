import React from 'react';
import DeliveryLayoutContainer from './DeliveryLayout/DeliveryLayoutContainer';

const InformationDelivery = ({ ...props }) => {
  
  const { breadcrumbs, profile, info_delivery, page_info } = props.context;
  const { title, components } = page_info;
  const { role } = profile;


  return (
    <DeliveryLayoutContainer 
      breadcrumbs={breadcrumbs}
      role={role}
      info_delivery={info_delivery}
      title={title}
      components={components}
    />
  )
};

export default React.memo(InformationDelivery);
