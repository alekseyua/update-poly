import React from 'react';
import Title from '../../../Views/Title';
import AsyncComponent from '../../../helpers/asyncComponent'
import BlockGrid from '../../../Views/GridContainerBlock';
import LinkToCatalog from './DetailsPage/LinkToCatalog';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import TextUnderTitle from '../../../Views/TextUnderTitle';


const AsyncRecomendetProduct = AsyncComponent(() => {
  return import('../../../Views/RecomendetProduct/RecomendentProductContainer');
});
const DefaultCartPreview = ({ 
  recomendetProducts,
  breadcrumbs, 
  currency 
}) => {

  return (
    <BlockGrid.Container>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>

      <BlockGrid.Row>
        <BlockGrid.Coll className="cart__empty">
          <Title variant={'cart'} type={'h1'}>
            В ИЗБРАННОМ НЕТ ТОВАРОВ
          </Title>
          <TextUnderTitle type={'text-under_title'} variant={'text-content__cart-info'} >
            Все товары, отмеченные сердечком, появятся на этой странице. Добавляйте в избранное, чтобы быстро вернуться к самым интересным моделям и не забыть заказать
          </TextUnderTitle>
          <LinkToCatalog to={'/catalog'}>
            СМОТРЕТЬ ТОВАРЫ
          </LinkToCatalog>
        </BlockGrid.Coll>
      </BlockGrid.Row>
      <BlockGrid.Row>
        <BlockGrid.Coll>
          {
             !!recomendetProducts?
          <AsyncRecomendetProduct 
            recommended={recomendetProducts}
            currency={currency} 
          />
          : null
}        </BlockGrid.Coll>
      </BlockGrid.Row>
    </BlockGrid.Container>
  );
};

export default React.memo(DefaultCartPreview);
