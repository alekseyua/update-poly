import React from 'react';
import CatalogPageLayoutContainer from './CatalogPageLayout/CatalogPageLayoutContainer';

const CatalogPage = (props) => {
  console.log('Catalog context = ', props.context)
  const { 
    breadcrumbs, 
    multy_choise_filters,
    categories, 
    profile, 
    filters_params, 
    page_info, 
    dataProducts, 
    products = [], 
    currency 
  } = props.context;
  
  const { content } = page_info;
  const { role } = profile;

  return (
    <CatalogPageLayoutContainer
      multy_choise_filters = { multy_choise_filters }
      filters_params = { filters_params }
      dataProducts = { dataProducts }
      breadcrumbs = { breadcrumbs }
      categories = { categories }
      currency = { currency }
      products = { products }
      content = { content }
      role = { role }
      />
  )
}

export default CatalogPage;