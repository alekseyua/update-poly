import React from 'react';
import CheckBox from '../../../../Views/CheckBox';
import Button from '../../../../Views/Button';

import style from './styles/cartpage.module.scss';

const SelectedFilter = (
  { 
    enableAllSelect, 
    multipleDeleteFromCart, 
    selectAllItemsInCart,

    // tooltipOpen, 
    // oneClick, 
    // setEnab, 
    // enab
  }

) => {

  return (
    <div className={style['cart-page__selected-filters']}>
      <CheckBox
        checked={enableAllSelect}
        onChange={selectAllItemsInCart}
        variant="input"
        label={!enableAllSelect ? 'Выделить все' : 'Снять выделение'}
      />

      {/* <Tooltip
        trigger={'manual'}
        content="Вы не выбрали ни одного товара"
        placement="top"
        open={tooltipOpen}
      > */}
        <Button 
          onClick={multipleDeleteFromCart} 
          variant={'delete'} 
        //disabled={oneClick}
        >
          Удалить выбранные
          </Button>
        {/* </Tooltip> */}
    </div>
  );
};

export default React.memo(SelectedFilter);
