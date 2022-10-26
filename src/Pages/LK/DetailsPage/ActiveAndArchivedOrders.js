import React from 'react';
import ItemsInOrder from './ItemsInOrder';
import OrderDetailsContent from './OrderDetailsContent';

const ActiveAndArchivedOrders = ({
  getDataOrdersFilters,
  dateFilterData,
  tableBodyData,
  statuses,
  currency,
  profile,
  orders,
  btnAddOrderItems,
  sendToArchive,
  btnDelOrder,

}) => {

  return (
    <OrderDetailsContent>
          <ItemsInOrder
            dateFilterData={dateFilterData}
            tableBodyData={tableBodyData}
            statuses={statuses}
            currency={currency}
            profile={profile}
            orders={orders}

            getDataOrdersFilters={getDataOrdersFilters}
            btnAddOrderItems={btnAddOrderItems}
            sendToArchive={sendToArchive}
            btnDelOrder={btnDelOrder}
          />
    </OrderDetailsContent>
  );
};
export default React.memo(ActiveAndArchivedOrders);
