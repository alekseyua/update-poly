import React from 'react';
import Layout from '../Views';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import WorldStandardSizesChart from '../Views/WorldStandardSizesChart';
import { useStoreon } from 'storeon/react';
import Modal from '../Views/ModalCreator';
import HowToLayoutContainer from './HowToLayout/HowToLayoutContainer';


const InformationHowto = (props) => {

  console.log('information hoto = ', props)

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
