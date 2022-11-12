import React from 'react';
import BlockLine from '../../BlockLine';
import BlockText from '../../BlockText';
import SuccesMinOrder from '../../SuccesMinOrder';
import Card from './Card';

import style from '../../styles/cartpage.module.scss';

const ProductWhosaleCard = ({ 
  items = [],
  condition,
  is_performed,
  title,
  currency,
  isVisibleLine = false,

  contextUpdateProductFromCard,
  deleteProductFromCart,
  decCounterProduct,
  incCounterProduct,
}) => {

  return (
    <div className={style['product-card__wrapper-woosale']}>
      <BlockText type={'text-brand'}>{title}</BlockText>
      <SuccesMinOrder messenge={condition} success={is_performed} />
      {
        items.map((el) => {

          return (
            <Card
              key={el.id}
              cartitem_setUrl={el.url}
              hideSales
              {...el}
              currency = { currency }
              condition = { condition }

              contextUpdateProductFromCard = { contextUpdateProductFromCard }
              deleteProductFromCart = { deleteProductFromCart }
              decCounterProduct = { decCounterProduct }
              incCounterProduct = { incCounterProduct }
            />
          );
        })
      }
      {isVisibleLine ? <BlockLine /> : null}
    </div>
  );
};

export default React.memo(ProductWhosaleCard);
