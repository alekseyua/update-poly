import React from 'react';
import MainFilters from '../../../../Views/MainFilters';
import MoreLink from '../../../../Views/MoreLink';
import Text from '../../../../helpers/Text';
import Title from '../../../../Views/Title';

import style from './productsInStock.module.scss';

const ProductsInStockLayout = ({
  children,
  catalog_url = '#',
  filterList,
  activeItemList,

  getProductsInStockForName,
}) => {
  return (
    <div className={style['products-in-stock']}>
      <div className={'products-in-stock__container'}>
        <div className={style['products-in-stock__wrap']}>
          <Title type={'h2'} variant={'product__instock-title'}>
            <Text text={'productInStock'} />
          </Title>
          <MainFilters
            filters = { filterList }
            activeItemList = { activeItemList }
            getProductsInStockForName = { getProductsInStockForName }
          />
          <div className={style['products-in-stock__content']}>
            <div className={style['products-in-stock__list']}>
              {children}
            </div>
            <MoreLink url={'/catalog?is_in_stock=true&page=1'}>
              <Text text={'show_all'} />
            </MoreLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductsInStockLayout);
