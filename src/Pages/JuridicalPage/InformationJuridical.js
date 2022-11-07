import React from 'react';
import JuridicalLayoutContainer from './JuridicalLayout/JuridicalLayoutContainer';


const InformationJuridical = ({ ...props }) => {
const { breadcrumbs, profile, site_configuration } = props.context;
const { title, components } = props.context.page_info;
const { role } = profile;

  console.log('InformationJuridical', props)

  return (
    <JuridicalLayoutContainer 
      site_configuration = { site_configuration }
      breadcrumbs = { breadcrumbs }
      components = { components }
      title = { title }
      role = { role }
    />
  );
};

export default React.memo(InformationJuridical);
