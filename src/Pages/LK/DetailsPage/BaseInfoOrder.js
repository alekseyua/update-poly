import React from 'react';
import classNames from 'classnames';
import Select from '../../../Views/Select';
import Text from '../../../helpers/Text';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import '../../../Views/MyOrderViews/styles/celender.scss';
import '../../../Views/MyOrderViews/styles/datepicker.scss';
import Input from '../../../Views/Input';
import Icon from '../../../Views/Icon';
import { searchIcon } from '../../../images';

import style from '../../../Views/MyOrderViews/styles/index.module.scss';
import PersonalPageViews from '../../../Views/PersonalPageViews';

const BaseInfoOrder = ({
  total_orders_price_unpaid,
  total_orders_price_paid,
  searchOrderForFio,
  dateFilterData,
  options,
  changeStatusFilter,
  changeValueSearch,
  selectCreateFrom,
  selectCreateTo,
  currency,
}) => {

  return (
    <div className={style['cabinet-content']}>
      <div className={style['cabinet-heading']}>
        <Text text={'my.orders'} />
        <div
          className={style['cabinet-heading__debt']}
        >

        </div>
      </div>
      <div className={style['cabinet-topfilter']}>
        <div className={style['cabinet-topfilter__left']}>
          <Select
            className={'select-order-list'}
            placeholder={options[0].title}
            options={options}
            onClick={changeStatusFilter}
          />
        </div>

        {
          dateFilterData ?
            <div className={style['wrapper_filter-group']}>
              <DatePicker
                clearIcon={null}
                // name = { 'created_at__gte'}
                onChange={selectCreateTo}
                value={dateFilterData.created_at__gte ?? new Date()}
                format={'dd.MM.yyyy'}
                className={classNames({
                  datepicker: true,
                  [style['wrapper_filter-group__datepicker']]: true,
                })}
              />
              <span className={style['wrapper_filter-group__datepicker-hyphen']}>-</span>
              <DatePicker
                clearIcon={null}
                // name = { 'created_at__lte'}
                className={classNames({
                  datepicker: true,
                  [style['wrapper_filter-group__datepicker']]: true,
                })}
                onChange={selectCreateFrom}
                value={dateFilterData.created_at__lte}
                format={'dd.MM.yyyy'}
              />
            </div>
            : null
        }
      </div>
      {
        dateFilterData ?
          <div className={style['cabinet-topfilter__left']}>
            <Input
              className={'cabinet-lk__search'}
              value={searchOrderForFio ? searchOrderForFio : ''}
              name={'search-order'}
              onChange={changeValueSearch}
              placeholder={'Введите имя получателя'}
              helpText={
                <Icon src={searchIcon} className={style['cabinet-topfilter__search-icon']} width={20} height={20} />
              }
            />
          </div>
          : null
      }
      <PersonalPageViews.InfoPayWrapper>
        <PersonalPageViews.InfoPayGreyText>
          Сумма оплаченных заказов {total_orders_price_paid ?? 0} {' '} {currency}
        </PersonalPageViews.InfoPayGreyText>
        <PersonalPageViews.InfoPayGreyText>
          Сумма неоплаченных товаров {total_orders_price_unpaid ?? 0} {' '} {currency}
        </PersonalPageViews.InfoPayGreyText>
      </PersonalPageViews.InfoPayWrapper>
    </div>
  );
};

export default React.memo(BaseInfoOrder);
