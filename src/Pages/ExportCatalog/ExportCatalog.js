import React from 'react';
import ExportCatalogLayoutContainer from './ExportCatalogLayout/ExportCatalogContainer';

const ExportCatalog = (props) => {
  console.log('Catalog context = ', props.context)
  const { 
    multy_choise_filters,
    filters_params, 
    exportCatalog, 
    breadcrumbs, 
    categories, 
    page_info, 
    products = [], 
    currency,
    profile, 
  } = props.context;

  const { content, title } = page_info;
  const { role } = profile;

  return (
    <ExportCatalogLayoutContainer
    multy_choise_filters = { multy_choise_filters }
    filters_params = { filters_params }
    exportCatalog = { exportCatalog }
    breadcrumbs = { breadcrumbs }
    categories = { categories }
    //   products = { products }
    currency = { currency }
    content = { content }
    title = { title }
    //   role = { role }
    />
  )
}

export default ExportCatalog;