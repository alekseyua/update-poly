import React, { useState, useEffect } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import Modal from '../Views/ModalCreator';
import InformationLayoutContainer from './InformationLayout/InformationLayoutContainer';


const Information = (props) => {
  const { page_info, breadcrumbs } = props.context;
  const { components } = page_info;

  return (
    <InformationLayoutContainer
      breadcrumbs={breadcrumbs}
      components={components}
    />
  );
};

export default React.memo(Information);
