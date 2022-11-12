import React from 'react';
import Title from '../../../Views/Title';
import BlockGrid from '../../../Views/GridContainerBlock';
import LinkToCatalog from '../../CartPage/CartPageLayout/DatasPage/LinkToCatalog';
import TextUnderTitle from '../../../Views/TextUnderTitle';

const DefaultEmptyOrder = ({ textMessage }) => {
  return (
    <BlockGrid.Container>
      <BlockGrid.Row>
        <BlockGrid.Coll className="cart__empty">
          <Title variant={'order'} type={'h1'}>
            У Вас нет ни одного заказа.
          </Title>
          <TextUnderTitle type={'text-under_title'} variant={'text-content__cart-info'} >
           {
              textMessage?
                textMessage
                : 'Добавляйте товары в карзину и оформляйте заказы. Желаем приятного шоппинга в мире моды!'
           }
          </TextUnderTitle>
          <LinkToCatalog to={'/catalog'}>
            СМОТРЕТЬ ТОВАРЫ
          </LinkToCatalog>
        </BlockGrid.Coll>
      </BlockGrid.Row>
    </BlockGrid.Container>
  );
};

export default React.memo(DefaultEmptyOrder);
