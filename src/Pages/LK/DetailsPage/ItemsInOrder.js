import React from 'react';
import { Link } from 'react-router-dom';
import MyOrderViews from '../../../Views/MyOrderViews';
import BaseInfoOrder from './BaseInfoOrder';
import Pagination from '../../../Views/Pagination';
import Button from '../../../Views/Button';
import Table from '../../../Views/Table';
import Text from '../../../helpers/Text';
import DefaultEmptyOrder from './DefaultEmptyOrder';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import dayjs from '../../../helpers/dayjs';
import api from '../../../api/api';
import Title from '../../../Views/Title';
import Offset from '../../../Views/Offset';

const ItemsInOrder = ({ 
  total_orders_price_unpaid,
  total_orders_price_paid,
  total_debt_orders,
  searchOrderForFio,
  dateFilterData,
  tableBodyData,
  isLoading,
  currency,
  loading,
  profile,
  orders,

  getDataOrdersFilters,
  btnAddOrderItems,
  sendToArchive,
  btnDelOrder,
  options,

  handlerChangePaginations,
  currentPage,
  changeStatusFilter,
  changeValueSearch,
  selectCreateFrom,
  selectCreateTo,

}) => {

  const tableHeaderData = [
    [
      {
        content: <MyOrderViews.ThData>Дата</MyOrderViews.ThData>,
      },
      {
        content: <MyOrderViews.ThData>№ заказа</MyOrderViews.ThData>,
      },
      {
        content: <MyOrderViews.ThData>Получатель</MyOrderViews.ThData>,
      },
      {
        content: <MyOrderViews.ThData>Стоимость</MyOrderViews.ThData>,
      },
      {
        content: <MyOrderViews.ThData>Статус</MyOrderViews.ThData>,
      },
    ],
  ];

  const createName = ({ first_name, last_name, middle_name }) => {
    if (last_name && first_name) return `${last_name} ${String(first_name[0]).toUpperCase()}.`;
    return <Text text={'ivalid.name'} />;
  };

  /**
   * соберет верстку для данных и отправит на пуш в масив с tr
   * @param {[]} data
   * @returns масив с собранными компонентами для таблицы
   */
  const createTdForTable = (data = [], currency) => {
    let results = [];
    data.forEach((el, i) => {
      let tr = [];
      //!date
      tr.push({
        attr: { 'data-label': 'Дата' },
        content: dayjs(api.language, el.created_at).format('DD.MM.YYYY')
      });
      //!№ order
      tr.push({
        attr: { 'data-label': '№ заказа' },
        content: (
          <>
            {el.order_number.length ? (
              <Link to={el.order_number}>{el.order_number}</Link>
            ) : (
              'Товар не выбран'
            )}
          </>
        ),
      });
      //!full name
      tr.push({
        attr: { 'data-label': 'Получатель' },
        content: createName(el.address),
      });
      //!total count
      tr.push({
        attr: { 'data-label': 'Стоимость' },
        content: (
          <strong>
            {el.total ? el.total : 0} {currency}
          </strong>
        ),
      });
      //!status
      tr.push({
        attr: { 'data-label': 'Статус' },
        content: (
          <MyOrderViews.TdStatusData status={el.status.status} statusTitle={el.status.title} />
        ),
      });
      //удалить заказ
      el.status.status === 'payment_waiting' || el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ?
        tr.push({
          attr: {
            'data-label': el.status.status === 'payment_waiting' ?
              'Отменить заказ'
              : el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ? //
                'Убрать в архив'
                : null
          },
          content: (
            <Button
              type="submit"
              disabled={el.status.status === 'payment_waiting' ? !el.can_cancel : false}
              variant='default'
              onClick={(e) => {
                el.status.status === 'payment_waiting' ?
                  (el.can_cancel ? btnDelOrder(el) : null)
                  : el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ?
                    sendToArchive(el)
                    : null
              }}
            >
              {
                el.status.status === 'payment_waiting' ?
                  'Отменить'
                  : el.status.status === "closed" || el.status.status === "canceled" || el.status.status === "return" || el.status.status === "sended" ?
                    'Убрать в архив'
                    : null
              }

              {/* {'Отменить'} */}
            </Button>
          ),

        })
        : null;
      results.push(tr);
    });
    return results;
  };

  const hideReviewBlock = () => {
    tableBodyData.shift();
  };

  return (

    <React.Fragment>
            < BaseInfoOrder
              total_orders_price_unpaid = { total_orders_price_unpaid }
              total_orders_price_paid = { total_orders_price_paid }
              total_debt_orders = { total_debt_orders }
              searchOrderForFio = { searchOrderForFio }
              dateFilterData = { dateFilterData }
              loading = { loading }
              orders = { orders }
              count = { orders?.count }
              options = { options }              
              changeStatusFilter = { changeStatusFilter }
              changeValueSearch = { changeValueSearch }
              selectCreateFrom = { selectCreateFrom }
              selectCreateTo = { selectCreateTo }
              currency = { currency }
            />
      <MyOrderViews.WrapperTable 
        loading = { loading }
      >
        <Table
          statusLoad={'loading'}
          classNameTable="cabinet-table"
          tableHeaderData={tableHeaderData}
          tableBodyData={createTdForTable(tableBodyData, currency)}
        />
        {
          isLoading?
           !!tableBodyData?.length ?
            <Pagination
              location={'center'}
              count={30}
              allCount={tableBodyData?.count}
              currentPage={currentPage ?? 1}
              handlerChangePaginations={handlerChangePaginations}
            />
            : <Title variant={'lk-message'} type={'h1'}>
              <Offset offset={20} />
                { searchOrderForFio? `У Вас нет ни одного заказа который бы соответствовал критериям поиска: ${searchOrderForFio}` : 'У Вас нет ни одного заказа.' }
              </Title> 
          : <BlockSpinner.SpinnerWrapper>
            <BlockSpinner.Spinner sizeWidth={40} sizeHeight={40} />
          </BlockSpinner.SpinnerWrapper>
          // <DefaultEmptyOrder 
            //   textMessage = { searchOrderForFio? `который бы соответствовал критериям поиска ${searchOrderForFio}` : '' }
            // />
        }
      </MyOrderViews.WrapperTable>
    </React.Fragment>
  );
};

export default React.memo(ItemsInOrder);