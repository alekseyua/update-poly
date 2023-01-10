import React from 'react';
import ItemsInOrder from './ItemsInOrder';
import OrderDetailsContent from './OrderDetailsContent';

const ActiveAndArchivedOrders = ({
  total_orders_price_unpaid,
  total_orders_price_paid,
  getDataOrdersFilters,
  total_debt_orders,
  searchOrderForFio,
  btnAddOrderItems,
  dateFilterData,
  tableBodyData,
  sendToArchive,
  btnDelOrder,
  isLoading,
  currency,
  loading,
  options,
  profile,
  orders,

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
            isLoading={isLoading}
            currency = { currency }
            options = { options }              
            loading = { loading }
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
