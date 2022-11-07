import React from 'react';
import ItemsInOrder from './ItemsInOrder';
import OrderDetailsContent from './OrderDetailsContent';

const ActiveAndArchivedOrders = ({
  getDataOrdersFilters,
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
