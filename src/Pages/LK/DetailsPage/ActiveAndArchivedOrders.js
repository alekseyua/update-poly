import React from 'react';
import ItemsInOrder from './ItemsInOrder';
import OrderDetailsContent from './OrderDetailsContent';

const ActiveAndArchivedOrders = ({
  total_orders_price_unpaid,
  total_orders_price_paid,
  getDataOrdersFilters,
  total_debt_orders,
  searchOrderForFio,
  dateFilterData,
  tableBodyData,
  loading,
  currency,
  options,
  profile,
  orders,
  btnAddOrderItems,
  sendToArchive,
  btnDelOrder,

  changeStatusFilter,
  changeValueSearch,
  selectCreateFrom,
  selectCreateTo,

}) => {

  return (
    <OrderDetailsContent>
          <ItemsInOrder
            total_orders_price_unpaid = { total_orders_price_unpaid }
            total_orders_price_paid = { total_orders_price_paid }
            total_debt_orders = { total_debt_orders }
            searchOrderForFio = { searchOrderForFio }
            dateFilterData = { dateFilterData}
            tableBodyData = { tableBodyData}
            options = { options }              
            loading = { loading }
            currency = { currency }
            profile = { profile }
            orders = { orders }

            getDataOrdersFilters={getDataOrdersFilters}
            changeStatusFilter = { changeStatusFilter }
            changeValueSearch = { changeValueSearch }
            selectCreateFrom = { selectCreateFrom }
            btnAddOrderItems = { btnAddOrderItems }
            selectCreateTo = { selectCreateTo }
            sendToArchive = { sendToArchive }
            btnDelOrder = { btnDelOrder }
          />
    </OrderDetailsContent>
  );
};
export default React.memo(ActiveAndArchivedOrders);
