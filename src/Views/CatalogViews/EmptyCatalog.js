import React, { useEffect, useState } from 'react';
import Block from '../GridContainerBlock';
import Title from '../Title';
import Text from '../../helpers/Text';
import CartViews from '../CartViews';
import BlockSpinner from '../SpinnerWrapper';

import style from './styles/index.module.scss';

const EmptyCatalog = ({}) => {
const [ textMessage, setTextMessage ] = useState('');
  const dontSearch = () => {
   setTimeout(()=>{
      setTextMessage(Text({text: 'dont-search'}))
   },3000)
  }

  useEffect(()=>{
    dontSearch()
  },[])
  console.log('textMessage = ', textMessage)
  return (
    <div className={style['empty-catalog__wrapper']}>
      <Block.Container>
        <Block.Row>
          <Block.Coll className={style['cart__empty']}>
            <Title variant={'cart'} type={'h1'}>
              {
                !!textMessage?
                  textMessage 
                  : <BlockSpinner.SpinnerWrapper>
                  <BlockSpinner.SpinnerCenter>
                    <BlockSpinner.Spinner />
                  </BlockSpinner.SpinnerCenter>
                  </BlockSpinner.SpinnerWrapper>  
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
