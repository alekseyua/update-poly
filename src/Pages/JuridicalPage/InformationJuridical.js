import React from 'react';
import JuridicalLayoutContainer from './JuridicalLayout/JuridicalLayoutContainer';


const InformationJuridical = ({ ...props }) => {
const { breadcrumbs, profile } = props.context;
const { title, components } = props.context.page_info;
const { role } = profile;

  console.log('InformationJuridical', props)

  return (
    <JuridicalLayoutContainer 
      breadcrumbs={breadcrumbs}
      title={title}
      components={components}
      role={role}
    />
  );
};

export default React.memo(InformationJuridical);
