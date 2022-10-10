import React from 'react';
import classNames from 'classnames';
import Select from '../../../Views/Select';
import Text from '../../../helpers/Text';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import style from '../../../Views/MyOrderViews/styles/index.module.scss';
import '../../../Views/MyOrderViews/styles/celender.scss';
import '../../../Views/MyOrderViews/styles/datepicker.scss';

const BaseInfoOrder = ({
  dateFilterData,
  statuses = [],
  orders,
  
  getDataOrdersFilters,
}) => {

  const options = statuses.map((el) => {
    return {
      title: `${el.title} (${el.count})`,
      value: el.status,
    };
  });

  options.unshift({
    title: `Все заказы`,
    value: null,
  });

  const changeStatusFilter = (e) => {
    const statusFilter = e.target.getAttribute('value');
    getDataOrdersFilters({
      status: statusFilter,
    })

  };

  const selectCreateTo = (date) => {
    getDataOrdersFilters({
      created_at__gte: date,
    })
  };

  const selectCreateFrom = (date) => {
    getDataOrdersFilters({
      created_at__lte: date
    })
  };

  
 return (
    <div className={style['cabinet-content']}>
      <div className={style['cabinet-heading']}>
        <Text text={'my.orders'} />
      </div>
          <div className={style['cabinet-topfilter']}>
            <div className={style['cabinet-topfilter__left']}>
              <Select
                variant={'select-theme__black'}
                placeholder={options[0].title}
                options={options}
                onClick={changeStatusFilter}
                >
              </Select>
            </div>

            {
              orders?.results.length ?
                <div className={style['wrapper_filter-group']}>
                  <DatePicker
                    clearIcon={null}
                    onChange={selectCreateTo}
                    value={ dateFilterData.created_at__lte }
                    format={'dd.MM.yyyy'}
                    className={classNames({
                      datepicker: true,
                      [style['wrapper_filter-group__datepicker']]: true,
                    })}
                  />
                  <span className={style['wrapper_filter-group__datepicker-hyphen']}>-</span>
                  <DatePicker
                    clearIcon={null}
                    className={classNames({
                      datepicker: true,
                      [style['wrapper_filter-group__datepicker']]: true,
                    })}
                    onChange={selectCreateFrom}
                    value={ dateFilterData.created_at__gte } 
                    format={'dd.MM.yyyy'}
                  />
                </div>
                : null
          }

          </div>
    </div>
  );
};

export default React.memo(BaseInfoOrder);
