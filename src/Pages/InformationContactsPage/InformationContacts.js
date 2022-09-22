import React from 'react';
import InformationContactsContainer from './InformationContactsLayout/InformationContactsLayoutContainer';



const InformationContacts = (props) => {
  console.log('informationContacts = ', props)
  const { breadcrumbs, page_info } = props.context;
  const { components } = page_info;


  //todo: можно пропсом кастрировать футер
  return (
    <InformationContactsContainer
      breadcrumbs={breadcrumbs}
      components={components}
    />
  );
};

export default React.memo(InformationContacts);
