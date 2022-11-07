import React from 'react';
import classNames from 'classnames';
import Select from '../../../Views/Select';
import Text from '../../../helpers/Text';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import style from '../../../Views/MyOrderViews/styles/index.module.scss';
import '../../../Views/MyOrderViews/styles/celender.scss';
import '../../../Views/MyOrderViews/styles/datepicker.scss';
import Input from '../../../Views/Input';
import Icon from '../../../Views/Icon';
import { searchIcon } from '../../../images';

const BaseInfoOrder = ({
  searchOrderForFio,
  dateFilterData,
  options,
  changeStatusFilter,
  changeValueSearch,
  selectCreateFrom,
  selectCreateTo,

}) => {

  
 return (
    <div className={style['cabinet-content']}>
      <div className={style['cabinet-heading']}>  
        <Text text={'my.orders'} />
      </div>
          <div className={style['cabinet-topfilter']}>
            <div className={style['cabinet-topfilter__left']}>
              <Select
                className = { 'select-order-list' }
                placeholder = { options[0].title }
                options = { options }
                onClick = { changeStatusFilter }
              />
            </div>

            {
              dateFilterData ?
                <div className={style['wrapper_filter-group']}>
                  <DatePicker
                    clearIcon={null}
                    // name = { 'created_at__gte'}
                    onChange={selectCreateTo}
                    value={ dateFilterData.created_at__gte }
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
                    value={ dateFilterData.created_at__lte } 
                    format={'dd.MM.yyyy'}
                  />
                </div>
                : null
          }
          </div>
            <div className={style['cabinet-topfilter__left']}>
              <Input
                className={'cabinet-lk__search'}
                value = { searchOrderForFio ? searchOrderForFio : '' }
                name = { 'search-order' }
                onChange = { changeValueSearch }
                placeholder = { 'Поиск по ФИО' }
                helpText = {
                  <Icon src = {searchIcon} className = { style['cabinet-topfilter__search-icon'] } width = { 20 } height = { 20 } />
                }
              />
            </div>

    </div>
  );
};

export default React.memo(BaseInfoOrder);
