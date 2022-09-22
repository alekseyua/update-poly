import React from 'react';
import CheckBox from '../CheckBox';
import Button from '../Button';

import style from './styles/index.module.scss';

const SelectedFilter = (
  { 
    setFullItemCartChecked, 
    fullItemCartChecked, 
    setFullItemCartCheckedState, 
    multipleDeleteFromCart, 
    tooltipOpen, 
    oneClick, 
    setEnab, 
    enab
  }
) => {
  return (
    <div className={style['cart-views__selected-filters']}>
      <CheckBox
        checked={enab?'checked':''}
        onChange={() => {
          setEnab(!enab);
          setFullItemCartCheckedState(true);
          setFullItemCartChecked(!fullItemCartChecked);
        }}
        variant="input"
        label={!enab ? 'Выделить все' : 'Снять выделение'}
      />

      <Tooltip
        trigger={'manual'}
        content="Вы не выбрали ни одного товара"
        placement="top"
        open={tooltipOpen}
      >
        <Button onClick={multipleDeleteFromCart} variant={'delete'} disabled={oneClick}>
          Удалить выбранные
        </Button>
      </Tooltip>
    </div>
  );
};

export default React.memo(SelectedFilter);
