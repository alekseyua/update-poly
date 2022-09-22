import React from 'react';
import ProductPriceLayout from './ProductPriceLayuot/ProductPriceLayout';

const ProductPrice = ({ price, oldPrice = null, currenssies }) => {
  const formatedCurrenssies = String(currenssies).toUpperCase();

  return <ProductPriceLayout price={price} oldPrice={oldPrice} currenssies={formatedCurrenssies} />;
};

export default React.memo(ProductPrice);
