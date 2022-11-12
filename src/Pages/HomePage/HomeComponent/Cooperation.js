import React from 'react';
import CooperationLayout from './CooperationLayout';

const Cooperation = (props) => {
  const { partner_banners, front_admin } = props;
  return <CooperationLayout partner_banners={partner_banners} front_admin={front_admin} />;
};

export default React.memo(Cooperation);
