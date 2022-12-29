import React from 'react';
import CheckBox from '../CheckBox';
import Text from '../../helpers/Text';
import { ROLE } from '../../const';
import Offset from '../Offset';

import style from './styles/index.module.scss';

const CheckBoxFilters = ({
  valueCheckBoxFilters,
  handleChangeFilters,
  role,

}) => {

  return (
    <React.Fragment>
      <div className={style['catfilter-block']}>
        <div className={style['catfilter-block__content']}>

          {/* //?! В наличии 
            */}
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={valueCheckBoxFilters.is_in_stock}
              value={'is_in_stock'}
              name={'is_in_stock'}
              id={'is_in_stock'}
              onChange={handleChangeFilters}
              variant="light"
              label={Text({ text: 'inStock' })}
              data-cy={`inStockCheckBox`}
            ></CheckBox>
          </div>

          {/* //?! новые 
          */}
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={valueCheckBoxFilters.is_new}
              value={'is_new'}
              name={'is_new'}
              id={'is_new'}
              onChange={handleChangeFilters}
              variant="light"
              label={Text({ text: 'newItems' })}
              data-cy={`newItemsCheckBox`}
            ></CheckBox>
          </div>

          {/* //?! Хиты 
          */}
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={valueCheckBoxFilters.is_bestseller}
              id={'is_bestseller'}
              name={'is_bestseller'}
              value={'is_bestseller'}
              onChange={handleChangeFilters}
              variant="light"
              label={Text({ text: 'hits' })}
              data-cy={`hitsCheckBox`}
            ></CheckBox>
          </div>

          {/* //?! Распродажа 
          */}
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={valueCheckBoxFilters.is_closeout}
              id={'is_closeout'}
              name={'is_closeout'}
              value={'is_closeout'}
              onChange={handleChangeFilters}
              variant="light"
              label={Text({ text: 'sell.out' })}
              data-cy={`sellOutCheckBox`}
            ></CheckBox>
          </div>

          <Offset offset={'content'} />

          <div className={style['catfilter-block__heading']}>{Text({ text: 'manufacture' })}</div>

          {/* //?! производитель импорт 
          */}
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={valueCheckBoxFilters.is_import}
              id={'is_import'}
              name={'is_import'}
              value={'is_import'}
              onChange={handleChangeFilters}
              variant="light"
              label={Text({ text: 'is_import' })}
              data-cy={`sellOutCheckBox`}
            ></CheckBox>
          </div>

          {/* //?! производитель польша 
          */}
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={valueCheckBoxFilters.is_polish}
              id={'is_polish'}
              name={'is_polish'}
              value={'is_polish'}
              onChange={handleChangeFilters}
              variant="light"
              label={Text({ text: 'is_polish' })}
              data-cy={`sellOutCheckBox`}
            ></CheckBox>
          </div>
          
        </div>
      </div>

      {/* //?! производитель коллекциями 
      */}
      <div className={style['catfilter-block']}>
        <div className={style['catfilter-block__content']}>
          {role !== ROLE.RETAIL && role !== ROLE.UNREGISTRED ? (
            <React.Fragment>
              {role !== ROLE.WHOLESALE ? (
                <div className={style['catfilter-item']}>
                  <CheckBox
                    checked={valueCheckBoxFilters.is_in_collection}
                    id={'is_in_collection'}
                    name={'is_in_collection'}
                    value={'is_in_collection'}
                    onChange={handleChangeFilters}
                    variant="switch"
                    label={Text({ text: 'assembled' })}
                    data-cy={`assembledCheckBox`}
                  ></CheckBox>
                </div>
              ) : null}

              {/* 
              //?! фильтр не рядами 
              */}
              <div className={style['catfilter-item']}>
                <CheckBox
                  checked={valueCheckBoxFilters.is_not_range}
                  id={'is_not_range'}
                  name={'is_not_range'}
                  value={'is_not_range'}
                  onChange={handleChangeFilters}
                  variant="switch"
                  label={Text({ text: 'not.in.rows' })}
                  data-cy={`notInRowsCheckBox`}
                ></CheckBox>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(CheckBoxFilters);
