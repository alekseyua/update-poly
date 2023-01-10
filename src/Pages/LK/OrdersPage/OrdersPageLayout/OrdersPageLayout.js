import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import ActiveAndArchivedOrders from '../../DetailsPage/ActiveAndArchivedOrders';

const OrdersPageLayout = ({
    total_orders_price_unpaid,
    total_orders_price_paid,
    getDataOrdersFilters,
    amountNotifications,
    total_debt_orders,
    searchOrderForFio,
    cabinet_site_menu,
    btnAddOrderItems,
    dateFilterData,
    tableBodyData,
    sendToArchive,
    cabinet_menu,
    btnDelOrder,
    breadcrumbs,
    create_shop,
    is_has_shop,
    isLoading,
    profileId,
    username,
    currency,
    loading,
    profile,
    balance,
    options,
    orders,
    shop,
    role,

    changeStatusFilter,
    changeValueSearch,
    selectCreateFrom,
    selectCreateTo,
}) => {

    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <BlockGrid.GridPageLK>

                    <BlockGrid.GridPageLeftLK>
                        <SidebarPersonalPage
                            amountNotifications={amountNotifications}
                            cabinet_site_menu={cabinet_site_menu}
                            cabinet_menu={cabinet_menu}
                            create_shop={create_shop}
                            is_has_shop={is_has_shop}
                            currency={currency}
                            username={username}
                            balance={balance}
                            role={role}
                            shop={shop}
                        />
                    </BlockGrid.GridPageLeftLK>

                    <BlockGrid.GridPageRightLK>
                        <ActiveAndArchivedOrders
                            total_orders_price_unpaid={total_orders_price_unpaid}
                            total_orders_price_paid={total_orders_price_paid}
                            total_debt_orders={total_debt_orders}
                            searchOrderForFio={searchOrderForFio}
                            dateFilterData={dateFilterData}
                            tableBodyData={tableBodyData}
                            isLoading={isLoading}
                            currency={currency}
                            loading={loading}
                            profile={profile}
                            options={options}
                            orders={orders}

                            getDataOrdersFilters={getDataOrdersFilters}
                            changeStatusFilter={changeStatusFilter}
                            changeValueSearch={changeValueSearch}
                            selectCreateFrom={selectCreateFrom}
                            selectCreateTo={selectCreateTo}
                            btnAddOrderItems={btnAddOrderItems}
                            sendToArchive={sendToArchive}
                            btnDelOrder={btnDelOrder}
                        />
                    </BlockGrid.GridPageRightLK>
                </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default OrdersPageLayout;