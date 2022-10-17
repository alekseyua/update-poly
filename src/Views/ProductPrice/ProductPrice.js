import React from 'react';
import ProductPriceLayout from './ProductPriceLayuot/ProductPriceLayout';

const ProductPrice = ({ price, oldPrice = null, currency }) => {
  const formatedCurrenssies = String(currency).toUpperCase();

  return <ProductPriceLayout price={price} oldPrice={oldPrice} currency={formatedCurrenssies} />;
};

export default React.memo(ProductPrice);
