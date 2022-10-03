import React from 'react';
import { ROLE } from '../../../../const';
import Text from '../../../../helpers/Text';

import OrderingViews from '../../../../Views/OrderingViews';

// формирование карточек товара и разбиение их на группы приходят данные из OrderComponent
const OrderingCards = ({
   shriveledCartContent,
   cart_content = {}, 
   currency,
   role, 
  }) => {

  const { cart_items = [], in_stock = []} = cart_content;

    // console.log('cart_content', cart_content, role)
  return (
    <OrderingViews.CardsSection>
      {
      // для ОПТОВЫХ клиентов
      role === ROLE.WHOLESALE? (
        <React.Fragment>
          {shriveledCartContent.cart_items.map((el, i) => {
            const isVisibleLine = cart_items.length - 1 !== i;
            return (
              <OrderingViews.CardWoasale
                isVisibleLine={isVisibleLine}
                key={`${el.id}-WHOLESALE`}
                currency={currency}
                {...el} 
                role = { role }
              />
            );
          })}
          {shriveledCartContent.in_stock.length ? (
            <OrderingViews.DefaulWrapperInStock title={<Text text={'inStock'} />}>
              {in_stock.map((el) => {
                return (
                  <OrderingViews.CardDropAndRetail
                    key={`${el.id}`}
                    currency={currency}
                    el={el}
                    role = { role }
                  />
                );
              })}
            </OrderingViews.DefaulWrapperInStock>
          ) : null}
        </React.Fragment>
      ) : (
        // для остальных клиентов
        <React.Fragment>
          {shriveledCartContent.cart_items.map((el,i) => {
            return (
              <OrderingViews.CardDropAndRetail 
                key={`${el.id}`} 
                currency={currency} 
                el={el}
                count={i}
                role = { role } 
              />
            );
          })}
        </React.Fragment>
      )
      
      } 
    </OrderingViews.CardsSection>
  );
};

export default React.memo(OrderingCards);
