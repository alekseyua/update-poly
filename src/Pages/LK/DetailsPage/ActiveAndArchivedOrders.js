import React from 'react';
import ItemsInOrder from './ItemsInOrder';
import OrderDetailsContent from './OrderDetailsContent';

const ActiveAndArchivedOrders = ({ 
    dateFilterData,
    tableBodyData,
    statuses, 
    profile,
    orders,

}) => {
 
  return ( 
    <OrderDetailsContent>
      <ItemsInOrder
        dateFilterData = { dateFilterData }
        tableBodyData = { tableBodyData }
        statuses = { statuses }
        profile = { profile }
        orders = { orders }
      />
    </OrderDetailsContent>
  );
};
export default React.memo(ActiveAndArchivedOrders);
