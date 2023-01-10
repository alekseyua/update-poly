import React, { useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import OrdersPageLayout from './OrdersPageLayout';

const OrdersPageLayoutContainer = ({
  total_orders_price_unpaid,
  total_orders_price_paid,
  amountNotifications,
  total_debt_orders,
  searchOrderForFio,
  cabinet_site_menu,
  dateFilterData,
  tableBodyData,
  cabinet_menu,
  breadcrumbs,
  create_shop,
  is_has_shop,
  isLoading,
  profileId,
  username,
  currency,
  statuses = [],
  profile,
  balance,
  orders,
  shop,
  role,
}) => {
  const { dispatch } = useStoreon();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false)
    const timerShowSpinner = setTimeout(() => {
      setLoading(false);
      return () => clearTimeout(timerShowSpinner);
    }, 3000)
  }, [tableBodyData]);

  useEffect(() => {
    const timerShowSpinner = setTimeout(() => {
      setLoading(false);
      return () => clearTimeout(timerShowSpinner);
    }, 3000)
  }, []);

  const getDataOrdersFilters = data => {
    setLoading(true)
    dispatch('getOrders', data)
  }

  const btnAddOrderItems = (el) => {
    setLoading(true)
    const params = {
      id: el.id
    }
    dispatch('addNumOrder', params)
  }

  const btnDelOrder = (data) => {
    const params = {
      id: data.id
    }
    dispatch('cancelOrder', params)
  }

  const sendToArchive = (data) => {
    const params = {
      id: data.id
    }
    dispatch('sendToArchive', params)
  }

  // фильтры и поиск
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

  const changeValueSearch = (e) => {
    const value = e.target.value;
    getDataOrdersFilters({
      q: value,
    })

  };


  return (
    <OrdersPageLayout
      total_orders_price_unpaid={total_orders_price_unpaid}
      total_orders_price_paid={total_orders_price_paid}
      amountNotifications={amountNotifications}
      total_debt_orders={total_debt_orders}
      cabinet_site_menu={cabinet_site_menu}
      searchOrderForFio={searchOrderForFio}
      dateFilterData={dateFilterData}
      tableBodyData={tableBodyData}
      cabinet_menu={cabinet_menu}
      breadcrumbs={breadcrumbs}
      create_shop={create_shop}
      is_has_shop={is_has_shop}
      isLoading={isLoading}
      profileId={profileId}
      username={username}
      currency={currency}
      profile={profile}
      balance={balance}
      options={options}
      loading={loading}
      orders={orders}
      shop={shop}
      role={role}

      getDataOrdersFilters={getDataOrdersFilters}
      changeStatusFilter={changeStatusFilter}
      changeValueSearch={changeValueSearch}
      selectCreateFrom={selectCreateFrom}
      selectCreateTo={selectCreateTo}
      btnAddOrderItems={btnAddOrderItems}
      sendToArchive={sendToArchive}
      btnDelOrder={btnDelOrder}
    />
  )
}

export default OrdersPageLayoutContainer;