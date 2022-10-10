import React, { useState } from 'react';
import ProductsInStockLayout from './ProductsInStockLayout';
import { useStoreon } from 'storeon/react';

const ProductsInStockLayoutContainer = ({
  children,
  catalog_url = '#',
  filterList,
}) => {
  const { dispatch } = useStoreon();
  const [ activeItemList, setActiveItemList ] = useState(filterList[0].id)
  console.log({filterList}, {activeItemList})
  const getProductsInStockForName = (id) => {
    setActiveItemList(id)
    const params = {
      page: 1,
      categories: id,
      is_in_stock: true,
      page_size: 12,
    }
    dispatch('getCatalog', params)
  }



  return (
    <ProductsInStockLayout
      children = { children }
      filterList = { filterList }
      activeItemList = { activeItemList }

      getProductsInStockForName = { getProductsInStockForName }
    />
  );
};

export default React.memo(ProductsInStockLayoutContainer);
