import React from 'react';
import Block from '../GridContainerBlock';
import Title from '../Title';
import Text from '../../helpers/Text';
import CartViews from '../CartViews';

import style from './styles/index.module.scss';

const EmptyCatalog = ({}) => {
  return (
    <div className={style['empty-catalog__wrapper']}>
      <Block.Container>
        <Block.Row>
          <Block.Coll className={style['cart__empty']}>
            <Title variant={'cart'} type={'h1'}>
              {
                Text({text: 'dont-search'})
              }
            </Title>
            <CartViews.Text type={'text-under_title'}>
              {/* Попробуйте уточнить в службе поддержки... */}
            </CartViews.Text>
          </Block.Coll>
        </Block.Row>
      </Block.Container>
    </div>
  );
};

export default React.memo(EmptyCatalog);
