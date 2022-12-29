import React from 'react';
import PaymentLayoutContainer from './PaymentLayout/PaymentLayoutContainer';

const InformationPayments = (props) => {

  const { page_info, profile, breadcrumbs, info_payment } = props.context;
  const { title } = page_info;
  const { role } = profile;

  return (
    <PaymentLayoutContainer
      breadcrumbs={breadcrumbs}
      info_payment={info_payment}
      role={role}
      title={title}
    />
  );
};

export default React.memo(InformationPayments);
