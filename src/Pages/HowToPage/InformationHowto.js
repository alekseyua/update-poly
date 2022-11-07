import React from 'react';
import HowToLayoutContainer from './HowToLayout/HowToLayoutContainer';


const InformationHowto = (props) => {

  const { breadcrumbs, page_info } = props.context;
  const { slug, components } = page_info;

  return (
    <HowToLayoutContainer
      breadcrumbs={breadcrumbs}
      slug={slug}
      components={components}
    />
  );
};

export default React.memo(InformationHowto);
