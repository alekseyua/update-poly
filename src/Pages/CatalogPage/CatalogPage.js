import React from 'react';
import CatalogPageLayoutContainer from './CatalogPageLayout/CatalogPageLayoutContainer';

const CatalogPage = (props) => {

  const { 
    multy_choise_filters,
    youAlredyWatch,
    filters_params, 
    dataProducts, 
    currentPage,
    breadcrumbs, 
    categories, 
    page_info, 
    products = [], 
    currency,
    profile, 
  } = props.context;
  
  const { content } = page_info;
  const { role } = profile;

  return (
    <CatalogPageLayoutContainer
      multy_choise_filters = { multy_choise_filters }
      youAlredyWatch = { youAlredyWatch }
      filters_params = { filters_params }
      dataProducts = { dataProducts }
      breadcrumbs = { breadcrumbs }
      currentPage = { currentPage }
      categories = { categories }
      currency = { currency }
      products = { products }
      content = { content }
      role = { role }
      />
  )
}

export default CatalogPage;